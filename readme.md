# @paper/checkbox-tree

![Version](https://img.shields.io/npm/v/@paper/checkbox-tree)
![License](https://img.shields.io/npm/l/@paper/checkbox-tree)

## Description

`@paper/checkbox-tree` is a JavaScript component that transforms a select element into a checkbox tree.

## Installation

You can include the library directly in your HTML file from the CDN:

```html
<script src="https://cdn.jsdelivr.net/npm/@paper/checkbox-tree"></script>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@paper/checkbox-tree/dist/index.css">
```

Alternatively, you can install the library via npm:

```bash
npm install @paper/checkbox-tree
```

## Usage

```js
import CheckboxTree from "@paper/checkbox-tree";
import "@paper/checkbox-tree/dist/index.css";

// Example usage:
const selectElement = document.getElementById("your-select-element");
const checkboxTree = new CheckboxTree(selectElement);
```

## Configuration

```js
// By default, the configuration looks like this:
const defaultConfig = {
    rootClassName: "pct-tree",
    innerClassName: "pct-tree__inner",
    groupClassName: "pct-group",
    groupHeaderClassName: "pct-group__header",
    groupLabelClassName: "pct-group__label",
    groupTextClassName: "pct-group__text",
    optionClassName: "pct-option",
    optionLabelClassName: "pct-option__label",
    optionInputClassName: "pct-option__input",
    optionTextClassName: "pct-option__text",
};

// You can pass your own settings when creating an instance:
const checkboxTree = new CheckboxTree(selectElement, {
    // your setting 1,
    // your setting 2,
    // ...
});
```
