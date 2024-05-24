# paper-checkbox-tree

![Version](https://img.shields.io/npm/v/paper-checkbox-tree)
![License](https://img.shields.io/npm/l/paper-checkbox-tree)

The `paper-checkbox-tree` library transforms a standard HTML `<select>` element 
into an interactive tree of checkboxes. This is particularly useful for forms requiring 
a hierarchical structure of selectable options.

![image](https://github.com/dldevinc/paper-checkbox-tree/assets/6928240/9aef1bd2-8717-4322-abde-2c41e301107b)

[Demo](https://dldevinc.github.io/paper-checkbox-tree/)

## Features

* Converts `<select>` elements with nested `<optgroup>` and `<option>` elements into 
  a tree structure with checkboxes.
* Supports custom CSS class names for flexible styling.
* Allows group selection and individual option selection.
* Provides keyboard navigation and accessibility features.

## Installation

You can include the library directly in your HTML file from the CDN:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/paper-checkbox-tree/dist/style.css">
<script src="https://cdn.jsdelivr.net/npm/paper-checkbox-tree/dist/umd.js" defer></script>
```

Alternatively, you can install the library via npm:

```bash
npm install paper-checkbox-tree
```

## Usage

To initialize the checkbox tree, either add the class `pct-tree` to your select element:

```html
<select class="pct-tree" multiple name="permission">
  <optgroup label="Authentication and Authorization">
    <option value="can_add_user" disabled>user | Can add user</option>
    <option value="can_change_user">user | Can change user</option>
    <option value="can_delete_user" selected>user | Can delete user</option>
    <option value="can_view_user">user | Can view user</option>
  </optgroup>

  <!-- ... -->
</select>
```

Or, you can initialize it programmatically by instantiating a `CheckboxTree` object:

```js
import CheckboxTree from "paper-checkbox-tree";
import "paper-checkbox-tree/dist/style.css";

// Example usage:
const selectElement = document.getElementById("my-select-element");
const checkboxTree = new CheckboxTree(selectElement);
```

## Configuration

You can customize the default CSS class names by passing an options object when 
initializing the `CheckboxTree`. Here is the default configuration:

```js
{
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
        checkboxCheckedClassName: "pct-checkbox--checked",
        checkboxIndeterminateClassName: "pct-checkbox--partial",
        checkboxDisabledClassName: "pct-checkbox--disabled",
}
```

For example:

```js
new CheckboxTree(selectElement, {
    rootClassName: "custom-tree",
    optionClassName: "custom-option",
    // other custom class names
});
```
