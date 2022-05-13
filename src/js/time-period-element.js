class TimePeriodElement {
    /**
     * @param {string} dayOne - First day of the date input.
     * @param {string} today - Last day of the date input.
     */
    constructor(dayOne, today) {
        this.#attributes = {
            dayOne: dayOne,
            today: today
        }
        this.#createHTML();
        this.#addEventsListeners();
    }

    #attributes

    /** @type {HTMLElement} */
    #html;

    /** @type {HTMLInputElement} */
    dateFromInput;

    /** @type {HTMLInputElement} */
    dateToInput

    get html() {
        return this.#html;
    }


    #createHTML() {
        this.#html = document.createElement("div");
        this.#html.classList.add("time-period-block");

        const dateInputsContainer = document.createElement("div");
        dateInputsContainer.classList.add("inputs-container");
        dateInputsContainer.id = "time-period";
        this.#html.appendChild(dateInputsContainer);

        const mainLabel = document.createElement("label");
        mainLabel.textContent = "Period:";
        this.#html.insertBefore(mainLabel, dateInputsContainer);

        this.dateFromInput = document.createElement("input");
        this.dateFromInput.type = "date";
        this.dateFromInput.id = "dateFromInput";
        this.dateFromInput.setAttribute("value", this.#attributes.dayOne);
        this.dateFromInput.setAttribute("min", this.#attributes.dayOne);
        this.dateFromInput.setAttribute("max", this.#attributes.today);
        this.dateFromInput.required = true;

        mainLabel.setAttribute("for", this.dateFromInput.id);

        this.dateToInput = document.createElement("input");
        this.dateToInput.type = "date";
        this.dateToInput.id = "dateToInput";
        this.dateToInput.setAttribute("value", this.#attributes.today);
        this.dateToInput.setAttribute("min", this.#attributes.dayOne);
        this.dateToInput.setAttribute("max", this.#attributes.today);
        this.dateToInput.required = true;

        dateInputsContainer.appendChild(this.dateFromInput);
        dateInputsContainer.appendChild(this.dateToInput);

        const dateToLabel = document.createElement("label");
        dateToLabel.setAttribute("for", this.dateToInput.id);
        dateToLabel.textContent = "to";
        dateInputsContainer.insertBefore(dateToLabel, this.dateToInput);
    }

    getInputsValues() {
        return {
            dateFrom: this.dateFromInput.value,
            dateTo: this.dateToInput.value
        }
    }

    #datesReconfigure() {
        const minDate = this.dateFromInput.value;
        const maxDate = this.dateToInput.value;
        this.dateFromInput.max = maxDate;
        this.dateToInput.min = minDate;
    }

    #addEventsListeners() {
        this.dateFromInput.addEventListener("change", this.#datesReconfigure.bind(this));
        this.dateToInput.addEventListener("change", this.#datesReconfigure.bind(this));
    }
}

export { TimePeriodElement };