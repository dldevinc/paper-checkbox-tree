# paper-checkbox-tree

![Version](https://img.shields.io/npm/v/paper-checkbox-tree)
![License](https://img.shields.io/npm/l/paper-checkbox-tree)

The `paper-checkbox-tree` library transforms a standard HTML `<select multiple>` element 
into an interactive tree of checkboxes. This is particularly useful for forms requiring 
a hierarchical structure of selectable options.

![image](https://github.com/dldevinc/paper-checkbox-tree/assets/6928240/16ccaa19-9081-4c28-a010-f5d56fbfebb1)

[Demo](https://dldevinc.github.io/paper-checkbox-tree/)

## Features

* Converts `<select multiple>` elements with nested `<optgroup>` and `<option>` elements into 
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

You can customize the default CSS class names and behavior by passing an options object 
when initializing the `CheckboxTree`. Here is the default configuration:

```js
{
    groupAllOptions: false,
    groupAllLabel: "All",
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

### Customizing Class Names

You can customize the CSS class names to match your styling preferences:

```js
new CheckboxTree(selectElement, {
    rootClassName: "custom-tree",
    optionClassName: "custom-option",
    // other custom class names
});
```

### Grouping All Options

If there are no `<optgroup>` elements present in the `<select>`, enabling the 
`groupAllOptions` option will group all options under a single group. You can specify 
the label for this group using the `groupAllLabel` option:

```js
new CheckboxTree(selectElement, {
    groupAllOptions: true,
    groupAllLabel: "All Options",
});
```

This will create a group named "All Options" containing all the options in the `<select>`
element. If `<optgroup>` elements are present, the "All Options" group will **not** be created.

### Using Data Attributes

You can also specify the `groupAllOptions` and `groupAllLabel` options using data 
attribute `data-pct-group-all-options`:

<select class="pct-tree" multiple data-pct-group-all-options="All options">
  <!-- Options and optgroups -->
</select>

This will set `groupAllOptions` to `true` and use "All options" as the label for the group.
If you don't provide a value for `data-pct-group-all-options`, it will default to `true`, 
and the default label "All" will be used:

```html
<select class="pct-tree" multiple data-pct-group-all-options>
  <!-- Options and optgroups -->
</select>
```
