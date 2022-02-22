---
title: How I improved my workflow with SMACSS & Sass
metaDesc: How I improved my workflow with SMACSS & Sass
date: "2013-02-17"
tags:
  - workflow
  - CSS
  - Sass
  - SCSS
  - smacss
  - bem
part: "writing"
---

_Update: 27-02-2017_
_I wrote an extensive new article about [Structuring Front-end Components](/blog/structured-frontend-components)._

A couple of months ago I passed by Jonathan Snook's [SMACSS](http://smacss.com) website while browsing the web. After reading the SMACSS core articles I felt a bit awkward about how I organised and crafted my CSS. My CSS was quite unorganised and the only pattern used was the waterfall pattern; Work your way from the header all the way to the footer. The CSS also contained fixed withs, overuse of ID selectors & many specificity workarounds. It was not organised, not modular & most of all: Not reusable.

## Meet SMACSS

SMACSS stands for Scalable and Modular Architecture for CSS, and is more a style guide than a CSS framework. On a high level SMACSS aims at changing the way we are turning designs into code. Instead of working in a page mentality where you try to turn a single page design into code, SMACSS aims to identify repeating visual patterns. Those patterns are then supposed to be coded into flexible/re-usable modules, wich should be independent as possible from the individual page context. This is not a revolutionary point-of-view for a programmer, but in the web design world this is indeed a newer way of thinking.

### Categorization

The basic concept of SMACSS is to devide styles into 5 categories: base, layout, modules, states and theme\*. Each category comes with a set of usage rules and naming conventions. The main reason of this categorization is that rulesets should only ever inherit and add to previous ones, never undo.

Any declarations like these

```css
border-bottom: none;
padding: 0;
float: none;
margin: 0;
```

...are typically bad news. If you have to remove borders, you probably applied them to early.

#### Base

This is where all the base styles live; resets, element defaults, default font sizes, etc. This category is mainly dominated by element selectors. You should always ask yourself if a ruleset must live in base in order to not lose flexibility down the road.

#### Layout

In this section you specify all types of layout containers, such as header, footer, content, sidebar, etc. The layout elements haven't got any styles applied to them, they only divide the website into sections. This is the layer where grid systems etc, would be living.

#### Modules

The bulk of your css is made up of independent modules and submodules. Every module should be completely independent of its context and should work within any layout container or other module.

If a specific context requires changes to a module you rather create a submodule that describes the context instead changing styles based on the parent.

#### State

Modules can be in different types of states: class-based-states(.is-active), pseudo-classes(:hover, :focus), attribute states(data-state="rotating"), or @mediaquery states.
These states belong directly to the modules but have a different categorybecause the have their own naming convention and usage rules.

#### \*Theme

SMACSS points to an optional fifth category, theme, but this is only applicable to pages that require theming. Theme styles override or extend the modules, and only apply colors and backgrounds.

## Syntactically Awesome StyleSheets(Sass)

SMACSS works especially well with [Sass](http://sass-lang.com), and I'll try to explain why and how I implemented Sass into my workflow:

### File structure

In Sass you can easily chop your stylesheet into partials by using the @import rule. This allows us to easily organize and maintain our files similar like this:

```bash
-theme.scss
  - theme/_base.scss
    - theme/base/_reset.scss
    - theme/base/_headings.scss
  - theme/_layout.scss
    - theme/layout/_masthead.scss
    - theme/layout/_main.scss
    - theme/layout/_footer.scss
  - theme/_modules.scss
    - theme/modules/_search.scss
    - theme/modules/_gallery.scss
  - theme/_state.scss
    - theme/state/_mediaqueries.scss
```

### Partial setup

Every partial stands for a standalone module wich has its own sectioning:

- module, the base module rulesets
- state, the different states the module can be in
- theme, optional but recommended to separate style from structure

Since the module has its own module, state, theme sections it can be easily copied to another project while the characteristics stay the same.

### Namespacing

I'm using a namespacing that is based off the [BEM](http://bem.info/) front-end naming methodology wich stands for: Block, Element, Modifier. The naming convention follows the following pattern:

```css
.block {
}
.block__element {
}
.block--modifier {
}
```

- `.block` represents the high level element of the module
- `.block__element` represents a descendent of .block
- `.block--modifier` represents a different version of .block

The point of BEM is to tell other developers more about what a piece of markup is doing from its name alone.

Within the SMACSS guidelines we prefix the classes with a section based prefix.
A module should always be prefixed with .m-: e.g. .m-search, .m-contentbox. Elements that live inside a module have classnames like this: .m-search\_\_heading. A brief example of a module:

```css
.m-search {
  border: 1px solid #ccc;
}
.m-search__heading {
  font-size: 20px;
  color: #f00;
}
.m-search__body {
  padding: 10px;
}
```

A submodule is specified like this:

```css
.m-search--attention {
}
.m-search--attention__header {
  border-bottom: 1px solid #f00;
}
```

A module that lives in the layout section gets the prefix of: .l-.

When you are using BEM, though, it is important to remember that you don’t need to use it for everything. Take for example:

```css
.text-right {
  text-align: right;
}
```

This CSS would never fall into any BEM category, it’s merely a standalone rule.

### Using Sass @extend

Sass @extend is a very powerful tool to DRY out you stylesheets, but must not be overused. Since we want modules to be portable you must only extend within a modules scope, a module must not be tied to other modules to work.

## Conclusion

SMACSS is a very user-friendly approach to modular CSS. It asks for nothing less than a complete shift from a "page mentality" towards web design, to a search and codification of visual patterns. For that it offers a sensible categorization and naming scheme. It goes along very well with SASS, especially using the @extend feature and when it comes to themeing. It's kind of an open question how SASS's nesting capabilities fit with SMACSS, but in general I think it can bring lots of very valuable and badly needed modularity and conventions to the web design community.
