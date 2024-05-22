export default class CheckboxTree {
    /**
     * Default configuration for the CheckboxTree component.
     * @returns {Object} The default CSS class names for various elements.
     */
    get Defaults() {
        return {
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
        }
    }

    /**
     * Constructor for the CheckboxTree class.
     * @param {HTMLSelectElement} select - The select element to transform into a checkbox tree.
     * @param {Object} [options] - Custom options to override default settings.
     */
    constructor(select, options) {
        this.$select = select;
        this.options = Object.assign({}, this.Defaults, options);

        this.hideSelect();
        this.buildDOM();
        this.addEventListeners();
    }

    /**
     * Hides the original select element.
     */
    hideSelect() {
        this.$select.classList.remove(this.options.rootClassName);
        this.$select.hidden = true;
        this.$select.disabled = true;
        this.$select.style.display = "none";
    }

    /**
     * Builds the DOM structure for the checkbox tree.
     */
    buildDOM() {
        this.$root = this._createRoot();
        this.$select.after(this.$root);

        this.$inner = this._createInner();
        this.$root.appendChild(this.$inner);

        this._fillInner();
        this._setTabIndex();
    }

    /**
     * Creates the root element of the checkbox tree.
     * @returns {HTMLDivElement} The root element.
     * @private
     */
    _createRoot() {
        const root = document.createElement("div");
        root.classList.add(this.options.rootClassName);
        return root;
    }

    /**
     * Creates the inner container of the checkbox tree.
     * @returns {HTMLDivElement} The inner container.
     * @private
     */
    _createInner() {
        const inner = document.createElement("div");
        inner.classList.add(this.options.innerClassName);
        return inner;
    }

    /**
     * Fills the inner container with groups and options
     * based on the original select element.
     * @private
     */
    _fillInner() {
        const fragment = document.createDocumentFragment();

        Array.from(this.$select.children).forEach(node => {
            if (node.tagName === "OPTGROUP") {
                fragment.appendChild(this._createGroup(node));
            } else {
                fragment.appendChild(this._createOption(node));
            }
        });

        this.$inner.appendChild(fragment);
    }

    /**
     * Creates a group element based on an OPTGROUP element.
     * @param {HTMLOptGroupElement} source - The source OPTGROUP element.
     * @returns {HTMLDivElement} The group element.
     * @private
     */
    _createGroup(source) {
        const group = document.createElement("div");
        group.classList.add(this.options.groupClassName);

        const header = this._createGroupHeader(source);
        group.appendChild(header);

        const fragment = document.createDocumentFragment();
        Array.from(source.children).forEach(node => {
            fragment.appendChild(this._createOption(node));
        });
        group.appendChild(fragment);

        this._updateGroup(group);
        return group;
    }

    /**
     * Creates the header for a group element.
     * @param {HTMLOptGroupElement} source - The source OPTGROUP element.
     * @returns {HTMLDivElement} The group header element.
     * @private
     */
    _createGroupHeader(source) {
        const header = document.createElement("div");
        header.classList.add(this.options.groupHeaderClassName);

        const label = document.createElement("div");
        label.classList.add(this.options.groupLabelClassName);
        header.appendChild(label);

        label.insertAdjacentHTML("beforeend", this.buildIcon());

        const headerText = document.createElement("span");
        headerText.classList.add(this.options.groupTextClassName);
        headerText.textContent = source.label;
        label.appendChild(headerText);

        return header;
    }

    /**
     * Retrieves the checked states of options within a group.
     * @param {HTMLElement} group - The group element.
     * @returns {number[]} Array of states where 1 represents checked
     *   and 0 represents unchecked.
     * @private
     */
    _getGroupStates(group) {
        const optionStates = [];
        const options = group.querySelectorAll(`.${this.options.optionClassName}`);

        options.forEach(option => {
            const input = option.querySelector(`.${this.options.optionInputClassName}`);
            if (input && !input.disabled) {
                optionStates.push(input.checked ? 1 : 0);
            }
        });
        return optionStates;
    }

    /**
     * Updates the visual state of a group based on its options.
     * @param {HTMLElement} group - The group element.
     * @private
     */
    _updateGroup(group) {
        const header = group.querySelector(`.${this.options.groupHeaderClassName}`);
        const icon = header.querySelector("svg");
        const groupStates = this._getGroupStates(group);

        if (groupStates.every(s => s === 1)) {
            this.setIconState(icon, "checked");
        } else if (groupStates.some(s => s === 1)) {
            this.setIconState(icon, "partial");
        } else {
            this.setIconState(icon, "none");
        }
    }

    /**
     * Creates an option element based on an OPTION element.
     * @param {HTMLOptionElement} source - The source OPTION element.
     * @returns {HTMLDivElement} The option element.
     * @private
     */
    _createOption(source) {
        const option = document.createElement("div");
        option.classList.add(this.options.optionClassName);

        const label = document.createElement("label");
        label.classList.add(this.options.optionLabelClassName);
        option.appendChild(label);

        const checkbox = document.createElement("input");
        checkbox.classList.add(this.options.optionInputClassName);
        checkbox.type = "checkbox";
        checkbox.name = this.$select.name;
        checkbox.value = source.value;
        checkbox.tabIndex = -1;
        if (source.selected) {
            checkbox.toggleAttribute("checked", true);
        }
        if (source.disabled) {
            checkbox.toggleAttribute("disabled", true);
        }
        label.appendChild(checkbox);

        label.insertAdjacentHTML("beforeend", this.buildIcon());

        const labelText = document.createElement("span");
        labelText.classList.add(this.options.optionTextClassName);
        labelText.textContent = source.textContent;
        label.appendChild(labelText);

        this._updateOption(option);
        return option;
    }

    /**
     * Updates the visual state of an option element.
     * @param {HTMLElement} option - The option element.
     * @private
     */
    _updateOption(option) {
        const checkbox = option.querySelector(`.${this.options.optionInputClassName}`);
        const icon = option.querySelector("svg");
        icon.classList.toggle("pct-checkbox--checked", checkbox.checked);
        icon.classList.toggle("pct-checkbox--disabled", checkbox.disabled);
    }

    /**
     * Builds the SVG icon for checkboxes.
     * @returns {string} The SVG markup.
     */
    buildIcon() {
        return `
            <svg class="pct-checkbox" width="22" height="22" stroke-width="2">
              <rect class="pct-checkbox__box" x="1" y="1" width="20" height="20" rx="4"></rect>
              <path class="pct-checkbox__marker" d="M4,13 8,17 18,6" fill="none"></path>
              <path class="pct-checkbox__line" d="M5,11 17,11" fill="none"></path>
            </svg>
        `;
    }

    /**
     * Sets the visual state of an icon.
     * @param {SVGElement} icon - The icon element.
     * @param {"none"|"checked"|"partial"} state - The state to set.
     * @private
     */
    setIconState(icon, state) {
        icon.classList.toggle("pct-checkbox--checked", state === "checked");
        icon.classList.toggle("pct-checkbox--partial", state === "partial");
    }

    /**
     * Sets the state of an option element.
     * @param {HTMLElement} option - The option element.
     * @param {"none"|"checked"|"partial"} state - The state to set.
     */
    setOptionState(option, state) {
        const input = option.querySelector(`.${this.options.optionInputClassName}`);
        if (input && !input.disabled) {
            input.checked = state === "checked";
            this._updateOption(option);
        }
    }

    /**
     * Sets the tab index for focusable elements.
     * @private
     */
    _setTabIndex() {
        const focusableElements = this._getFocusableElements();
        if (!focusableElements.length) {
            return
        }

        focusableElements[0].tabIndex = 0;
        focusableElements.slice(1).forEach(element => {
            element.tabIndex = -1;
        });
    }

    /**
     * Retrieves the focusable elements within the checkbox tree.
     * @returns {HTMLElement[]} Array of focusable elements.
     * @private
     */
    _getFocusableElements() {
        const labels = this.$inner.querySelectorAll(
            `.${this.options.optionLabelClassName}, .${this.options.groupLabelClassName}`
        );

        return Array.from(labels).filter(label => {
            const input = label.querySelector(`.${this.options.optionInputClassName}`);
            return !input || !input.disabled;
        });
    }

    /**
     * Adds event listeners to the checkbox tree.
     * @private
     */
    addEventListeners() {
        // Add input event listener for checkbox state changes
        this.$root.addEventListener("input", event => {
            const optionLabel = event.target.closest(`.${this.options.optionLabelClassName}`);
            if (optionLabel) {
                const option = optionLabel.closest(`.${this.options.optionClassName}`);
                if (option) {
                    this.onClickOption(option);
                }
            }
        });

        // Add click event listener for group clicks
        this.$root.addEventListener("click", event => {
            const groupLabel = event.target.closest(`.${this.options.groupLabelClassName}`);
            if (groupLabel) {
                const group = groupLabel.closest(`.${this.options.groupClassName}`);
                if (group) {
                    this.onClickGroup(group);
                }
            }
        });

        // Add keypress event listener for Enter and Space keypresses
        this.$root.addEventListener("keypress", event => {
            if ([13, 32].includes(event.keyCode)) {
                const option = event.target.closest(`.${this.options.optionClassName}`);
                if (option) {
                    event.preventDefault();

                    const input = option.querySelector(`.${this.options.optionInputClassName}`);
                    if (input && !input.disabled) {
                        input.checked = !input.checked;
                    }

                    this.onClickOption(option);
                    return;
                }

                const group = event.target.closest(`.${this.options.groupClassName}`);
                if (group) {
                    event.preventDefault();

                    this.onClickGroup(group);
                }
            }
        });

        // Add pointerup event listener for tabindex handling
        this.$root.addEventListener("pointerup", event => {
            const label = event.target.closest(
                `.${this.options.optionLabelClassName}, .${this.options.groupLabelClassName}`
            );

            if (label) {
                const focusableElements = this._getFocusableElements();
                focusableElements.forEach(element => {
                    element.tabIndex = -1;
                });

                label.tabIndex = 0;
                setTimeout(() => {
                    label.focus();
                });
            }
        });

        // Add keydown event listener for arrow key navigation
        this.$root.addEventListener("keydown", event => {
            if ([37, 38, 39, 40].includes(event.keyCode)) {
                event.preventDefault();

                const focusableElements = this._getFocusableElements();
                const currentElementIndex = focusableElements.indexOf(event.target);

                if ([37, 38].includes(event.keyCode)) {
                    const previousElement = focusableElements[currentElementIndex - 1];
                    if (previousElement) {
                        focusableElements[currentElementIndex].tabIndex = -1;
                        previousElement.tabIndex = 0;
                        previousElement.focus();
                    }
                } else {
                    const nextElement = focusableElements[currentElementIndex + 1];
                    if (nextElement) {
                        focusableElements[currentElementIndex].tabIndex = -1;
                        nextElement.tabIndex = 0;
                        nextElement.focus();
                    }
                }
            }
        });
    }

    /**
     * Handles click events on option elements.
     * @param {HTMLElement} option - The clicked option element.
     */
    onClickOption(option) {
        this._updateOption(option);

        const group = option.closest(`.${this.options.groupClassName}`);
        if (group) {
            this._updateGroup(group);
        }
    }

    /**
     * Handles click events on group elements.
     * @param {HTMLElement} group - The clicked group element.
     */
    onClickGroup(group) {
        const header = group.querySelector(`.${this.options.groupHeaderClassName}`);
        const groupIcon = header.querySelector("svg");
        const options = group.querySelectorAll(`.${this.options.optionClassName}`);
        const groupStates = this._getGroupStates(group);

        if (groupStates.every(s => s === 1)) {
            options.forEach(option => {
                this.setOptionState(option, "none");
            });
            this.setIconState(groupIcon, "none");
        } else {
            options.forEach(option => {
                this.setOptionState(option, "checked");
            });
            this.setIconState(groupIcon, "checked");
        }
    }
}


document.addEventListener("DOMContentLoaded", function() {
    const selects = document.querySelectorAll("select.pct-tree");
    selects.forEach(select => new CheckboxTree(select));
});
