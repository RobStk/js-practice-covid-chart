class SelectElement {
    /**
     * @param {Object} args                 Parameters fo new instance.
     * @param {string[]} args.options       Otions for html select element.
     * @param {string} [args.id]            Id for html select element.
     * @param {string} [args.labelText]     Label's text for html select element.
     * @param {string} [args.defaultOption] Default option for html select element.
     * @param {boolean} [required]          True or false "required" attribute for html select element.
     */
    constructor(args) {
        if (!(args instanceof Object)) {
            if (args) {
                return console.error("Incorrect argument. Expected an Object");
            }
            args = {};
        }
        this.#attributes = { ...args };

        this.#createHTML();
    }

    #attributes;

    /** @type {HTMLElement} */
    #html;
    /** @type {HTMLLabelElement} */
    #htmlLabel;

    get html() {
        return this.#html;
    }
    get htmlLabel() {
        return this.#htmlLabel;
    }
    get attributes() {
        return this.#attributes;
    }

    #createHTML() {
        this.#html = document.createElement("select");
        this.#html.id = this.#attributes.id;
        this.#html.setAttribute("required", this.#attributes.required);
        this.#attributes.options.forEach(option => {
            const html = document.createElement("option");
            html.value = option;
            html.textContent = option;
            if (option == this.#attributes.defaultOption) {
                html.selected = true;
            }
            this.#html.appendChild(html);
        })
        this.#html.setAttribute("value", this.#attributes.defaultOption);

        this.#htmlLabel = document.createElement("label");
        this.#htmlLabel.setAttribute("for", this.#attributes.id);
        this.#htmlLabel.textContent = this.#attributes.labelText;
    }

    getValue() {
        return this.#html.value;
    }
}

export { SelectElement };