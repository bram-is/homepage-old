const rssPlugin = require("@11ty/eleventy-plugin-rss");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const fs = require("fs");
const fg = require("fast-glob");

// Import filters
const dateFilter = require("./src/filters/date-filter.js");
const markdownFilter = require("./src/filters/markdown-filter.js");
const w3DateFilter = require("./src/filters/w3-date-filter.js");

// Import transforms
const htmlMinTransform = require("./src/transforms/html-min-transform.js");
const parseTransform = require("./src/transforms/parse-transform.js");

// Import data files
const site = require("./src/_data/site.json");

// Import Gallery files
const galleryMarriedImages = fg.sync(["**/married/images/*", "!**/dist"]);

const Image = require("@11ty/eleventy-img");

function imagesShortcode(src, alt, widths, className = "") {
  let options = {
    widths,
    formats: ["avif", "jpeg"],
    urlPath: "/media/generated/",
    outputDir: "./src/media/generated/",
  };

  // generate images, while this is async we don’t wait
  Image(src, options);

  let imageAttributes = {
    class: className,
    alt,
    loading: "lazy",
    decoding: "async",
  };
  // get metadata even the images are not fully generated
  metadata = Image.statsSync(src, options);
  return Image.generateHTML(metadata, imageAttributes);
}

module.exports = function (config) {
  const cachebuster = Math.round(new Date().getTime() / 1000);

  config.addNunjucksShortcode("ogImageSource", function ({ url, inputPath }) {
    let domain = "https://bram.is";

    // special title og images, only for _posts
    if (inputPath.startsWith("./src/writing/")) {
      return `https://screenshot.bram.is/${encodeURIComponent(
        `${domain}/opengraph${url}`
      )}/opengraph/_${cachebuster}`;
    }

    // raw screenshot
    return `https://screenshot.bram.is/${encodeURIComponent(
      `${domain}${url}`
    )}/opengraph/_${cachebuster}`;
  });

  config.addNunjucksShortcode("image", imagesShortcode);

  // Filters
  config.addFilter("dateFilter", dateFilter);
  config.addFilter("markdownFilter", markdownFilter);
  config.addFilter("w3DateFilter", w3DateFilter);

  // Layout aliases
  config.addLayoutAlias("home", "layouts/home.njk");

  // Transforms
  config.addTransform("htmlmin", htmlMinTransform);
  config.addTransform("parse", parseTransform);

  // Passthrough copy
  config.addPassthroughCopy("src/fonts");
  config.addPassthroughCopy("src/images");
  config.addPassthroughCopy("src/media/generated");
  config.addPassthroughCopy("src/media/married");
  config.addPassthroughCopy("src/js");
  config.addPassthroughCopy("src/admin/config.yml");
  config.addPassthroughCopy("src/admin/previews.js");
  config.addPassthroughCopy({ "src/_includes/assets/svg": "svg" });
  config.addPassthroughCopy("node_modules/nunjucks/browser/nunjucks-slim.js");
  config.addPassthroughCopy("src/robots.txt");

  const now = new Date();

  // Custom collections
  const livePosts = (post) => post.date <= now && !post.data.draft;
  config.addCollection("posts", (collection) => {
    return [
      ...collection.getFilteredByGlob("./src/writing/*.md").filter(livePosts),
    ].reverse();
  });

  config.addCollection("postFeed", (collection) => {
    return [
      ...collection.getFilteredByGlob("./src/writing/*.md").filter(livePosts),
    ]
      .reverse()
      .slice(0, site.maxPostsPerPage);
  });

  //Create collection of gallery images
  console.log("galleryMarriedImages", galleryMarriedImages);
  config.addCollection("marriedGallery", (collection) =>
    galleryMarriedImages.map((image) => ({
      full: image.replace("src", "./src"),
      relative: image.replace("src", ""),
    }))
  );

  // Plugins
  config.addPlugin(rssPlugin);
  config.addPlugin(syntaxHighlight);

  // 404
  config.setBrowserSyncConfig({
    callbacks: {
      ready: function (err, browserSync) {
        const content_404 = fs.readFileSync("dist/404.html");

        browserSync.addMiddleware("*", (req, res) => {
          // Provides the 404 content without redirect.
          res.write(content_404);
          res.end();
        });
      },
    },
  });

  return {
    dir: {
      input: "src",
      output: "dist",
    },
    passthroughFileCopy: true,
  };
};
