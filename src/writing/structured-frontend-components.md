---
title: Structured Front-end components
metaDesc: A new look on implementing front-end components with atomic design
date: 2017-02-27
tags:
  - Atomic Design
  - CSS
  - Sass
  - SCSS
  - workflow
  - components
part: writing
---

![Bram Smulders speaking about Atomic Design fot Fronteers at E-sites](/images/talk-fronteers-e-sites.jpg)

_This article is an in depth follow up on the [talk](https://bramsmulders.github.io/slides/atomic-design-met-pattern-lab.html#/) I gave at the [Fronteers meetup at e-sites](https://fronteers.nl/bijeenkomsten/2017/meetup-januari-e-sites)._

In 2013 I wrote an article about [structuring CSS with Smacss & Sass](https://bramsmulders.com/blog/how-i-improved-my-workflow-with-smacss-sass/). Since then I read up on new techniques and changed my workflow here and there to accommodate modern web projects. Many things have changed over the years, but the basics remain the same.

## The problem with Smacss

In that time I found solace in the Smacss methodology, it solved the problems which I had in an easy and structured manner. But when the projects I worked on growed in size I found myself struggling with the `layout` and the `modules` layers. All the components you make live in the `modules` section. In large projects you will still end up with a very big file list in that section. Also defining layouts is really cumbersome in my opinion; the larger the app, the more different layouts you’ll get. Smacss also does not provide a good way to structure HTML templates. This can be done better, no?

## The basics: Atomic Design

In my search for ways to find a solid methodology to build up design systems in large webapps & projects I stumbled upon [Atomic Design](http://bradfrost.com/blog/post/atomic-web-design/) by [Brad Frost](http://bradfrost.com/). Brad was trying to find a solution in what our interfaces are made of and how we can construct design systems in a more methodical way.

He found this structure in chemistry, where atomic elements combine together into molecules and these molecules can form together into complex organisms. This can easily be translated into software development and especially into Webdesign.

In my projects I apply Atomic Design by splitting the code in distinct stages:

### Atoms

Atoms are the basic building blocks of matter. In your interface atoms serve as the foundational blocks that live in our interfaces. These consist of [basic HTML elements](https://developer.mozilla.org/en-US/docs/Web/HTML/Element) like form labels, buttons, inputs and others which cannot be broken down any further without losing function.

### Molecules

Molecules in chemistry are atoms grouped together which take on new distinct properties.
In interfaces, molecules are relatively simple combinations of UI elements who work together as a group. Eg. a form label, some input fields and a button combine together as a contact form.

### Organisms

Organisms are complex and distinct UI components in our interface. They are composed out of groups of molecules and/or atoms and/or other organisms. This could be a header component consisting a logo atom, the primary navigation and a search form. Or it could be a section in your application containing a blog post and a sidebar with related articles.

### Templates

This is the place where the chemistry ends. Templates are page-level objects that place components in a layout which can explain the underlying content structure. All content entries are articulating important properties of components like `Heading 1: Lorem ipsum (XX characters)` or `image: 1920x1080px`. An example of a template could be a blog page with the header, blog, and footer organisms combined into one simple layout. These layouts are an understandable way to describe the content structure to the stakeholders, bosses and colleagues.

### Pages

Pages are instances of templates shat show what the UI looks like with real world content in place. This is the most concrete stage in the methodology. This is what the end-users will see and interact with when they visit your User Interface. This is what the stakeholders will sign off.

Also the page stage is and ideal place to test the effectiveness of the underlying design system. Does everything works good with the actual content applied? No? Back to the drawing board, but you only need to alter the components that needs change. Here we can also test variations of a page, for instance if the user has items in his/her shopping cart.

This was Atomic design in a nutshell, I'm not going to bother you with in-depth information about the methodology. If you want more information you can read [Atomic Design](http://atomicdesign.bradfrost.com/) by Brad Frost.

## Atomic Design applied to HTML with Pattern Lab

The most important part of component-based design and development is a pattern library, which is used as a central hub of all UI components which are used in your interface. There are many benefits to a pattern library:

- Promotes consistency and cohesion
- Speeds up a teams workflow
- Promotes collaboration accross disciplines
- Establish a shared design vocabulary
- Provide essential documentation
- Makes testing easier
- Provides a future friendly foundation to iterate on

Since we are working with Atomic Design the choice for a pattern library was an easy one: [Pattern Lab](http://patternlab.io/)
In the basis Pattern Lab is a static site generator and a pattern documentation and annotation tool.

### Folder structure

Out of the box Pattern Lab will include a limited folder structure. Actually it is entirely up to the designer to create the folder structure. It does not matter if you want to implement Atomic Design or another template methodology in Pattern Lab. It just works.
In our projects we establish the folder structure like this:

![Atomic design folder structure](/images/articles/structured-frontend-components/pattern-lab-file-structure.png)

This resembles the Atomic Design methodology and gives us proper structure to organise our UI components.

Now that the HTML templating structure is in place we can move on to the next important step in our front-end workflow: CSS.

## CSS structure with Atomic&shy;Oocss&shy;Itcss&shy;Bem&shy;(Patent pending)

Since I used the Smacss methodology in my previous article there have emerged a lot more ways to structure and organise your CSS.
To name a few:

- [BEM](http://getbem.com/)
- [ITCSS](http://itcss.io/)
- [SUIT CSS](https://suitcss.github.io/)

A lot of them are derived from [Nicolle Sullivan](http://www.stubbornella.org/)'s OOCSS ideas. They all try to solve one thing: structuring css in an understandable, scalable manner.
In my projects we use a hybrid of Atomic Design, BEM and ITCSS. Sounds weird and complex huh? Why not use one methodology and get it over with? Let me elaborate.

### Atomic Design & CSS

Atomic Design can perfectly be used as a structure for your CSS files, you can structure your Scss partials in the Atoms, Molecules and organisms order and you'll be fine. Actually this is how we iniatially did it when we started implementing Atomic Design at [Colours](http://www.colours.nl).

But when the projects grew in size and length we encountered a big problem with atomic design: Objects.
Objects are reusable, style agnostic patterns which usually define layout structures. Think of grid systems, the classic [media-object](http://www.stubbornella.org/content/2010/06/25/the-media-object-saves-hundreds-of-lines-of-code/), flexembed and other structural objects.
Since objects are style agnostic they have no place in the include based structure of atomic design. Imagine creating a grid-atom(most logical place for a grid in Atomic Design), you cannot include the grid alone in another template.

Instead of being a standalone component objects can be interlocked in other templates. They can be used in the smallest form to provide structure to an atom, but at the same time they can be used in a full blown organism. An example where a `o-layout` object can be used in multiple situations:

_Atom: icon-label_

```html
<div class="icon-label  layout">
  <div class="icon-label__wrap-icon  layout__cell  layout__cell--fit">
    {% raw %}{{> atoms-icon }}{% endraw %}
  </div>
  <div class="icon-label__label  layout__cell  layout__cell--fill">
    <!-- label -->
  </div>
</div>
```

_Molecule: product-overview_

```html
<div class="layout">
  <div class="layout__cell  unit-4-12">
    {% raw %}{{> molecules-product }}{% endraw %}
  </div>
  <div class="layout__cell  unit-4-12">
    {% raw %}{{> molecules-product }}{% endraw %}
  </div>
  <div class="layout__cell  unit-4-12">
    {% raw %}{{> molecules-product }}{% endraw %}
  </div>
</div>
```

In Atomic Design there is no logical place for these kind of objects, that is why I decided to think of a different implementation.

### Scss structure

What I came up with is a hybrid system between BEM, Atomic Design & ITCSS where the best parts of these methodologies are used.
First of all we need to establish the structure:

- **Settings** - This is where all project specific settings are located. Here you will define colors, font sizes, font families, etc.
- **Tools** - Here you define globally used functions & mixins like font-size mixins, rem helper functions, etc.
- **Generic** - Normalize, resets, vertical rhythm & box-sizing definitions would live here.
- **Objects** - Style agnostic objects like the media-object, grid systems, etc. (ideally prefixed with `o-`)
- **Atoms** - Basic unclassed HTML elements and everything that cannot be made smaller.
- **Molecules** - Combinations of atoms, components with disctint functionality.
- **Organisms** - Combinations of atoms & molecules, sections of your interface.
- **Utilities** - Helper classes which override everyting stated before. (ideally prefixed with `u-`)

This will enable us to structure our CSS in a more component based manner and allows us to pull in `.scss` files from their Atomic Design template directories as well. The typical `styles.scss` will look like this:

```css
@charset "UTF-8";
/*----------------------------------------------------------------------------*\
    Styles
\*----------------------------------------------------------------------------*/

/*  Settings
    Global variables, config switches
\*----------------------------------------------------------------------------*/

@import "settings/vars";

/*  Tools
    Global mixins & functions
\*----------------------------------------------------------------------------*/

@import "tools/mixin.font-size";

/*  Generic
    Ground zero styles, normalize.css, resets
\*----------------------------------------------------------------------------*/

@import "generic/normalize";

/*  Objects
    Cosmetic free design patterns
    Prefixed with: o-
\*----------------------------------------------------------------------------*/

@import "objects/media";
@import "objects/layout";

/*  Atoms
    These are basic tags, such as form labels, inputs or buttons. They also
    include more abstract elements like color palettes, fonts, and icons.
\*----------------------------------------------------------------------------*/

@import "_patterns/atoms/typography";
@import "_patterns/atoms/buttons";

/*  Molecules
    Molecules are groups of elements that function together as a unit
\*----------------------------------------------------------------------------*/

@import "_patterns/molecules/product";
@import "_patterns/molecules/list-product";

/*  Organisms
    Organisms are groups of molecules and atoms joined together to form
    distinct sections of an interface.
\*----------------------------------------------------------------------------*/

@import "_patterns/organisms/header";

/*  Utilities
    Helpers & overrides
    Prefixed with: u-
\*----------------------------------------------------------------------------*/

@import "utilities/spacing";
```

As you can see we can properly structure our CSS the same way as our HTML templates while maintaining the layers which cannot be easily put into the Atomic Design methodology. That leaves us with the last layer in out front-end stack: JavaScript

## JS Structure

After these changes to our workflow we started tinkering with applying the same structure into our JavaScript layer. These ideas are getting more concrete but they are not crystallized yet. Also this article would become a pretty long read if I write about that implementation too ;).

## Credits

- [Brad Frost](http://bradfrost.com/) for being awesome and for publishing the awesome book: Atomic Design
- [Harry Roberts](http://csswizardry.com/) for his work on ITCSS and other numerous CSS ideas
- [Brian Muenzenmeyer](http://brianmuenzenmeyer.com/) for is hard work on [Pattern Lab Node](https://github.com/pattern-lab/patternlab-node) and his help & advice
