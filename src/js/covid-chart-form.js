import { SelectElement } from "./select-element";
import { TimePeriodElement } from "./time-period-element";

class CovidChartForm {
    /**
     * @param {Object} params                   Parameters for new instance.
     * @param {string[]} params.casesTypesArr   An array of cases types.
     * @param {string[]} params.countriesArr    An array of countries.
     * @param {string} params.casesType         Default cases type.
     * @param {string} params.country           Default country.
     * @param {string} params.dayOne            The earliest date that can be set ("YYYY-MM-DD").
     * @param {string} params.today             The latest date that can be set ("YYYY-MM-DD").
     */
    constructor(params) {
        if (params) {
            if (!(params instanceof Object)) {
                if (params) {
                    return console.error("Incorrect argument. Expected an Object");
                }
                params = {};
            }
            this.#params = { ...params };
        }
        this.#createHTML(this.#params);
    }

    #params;
    #html;
    #casesTypesSelect
    #countriesSelect
    #timePeriodObj

    get html() {
        return this.#html;
    }

    #createHTML() {
        this.#html = document.createElement("form");
        this.#html.classList.add("covid-chart-form");

        const inputsContainer = document.createElement("div");
        inputsContainer.classList.add("inputs-container");
        this.#html.appendChild(inputsContainer);

        this.#casesTypesSelect = new SelectElement({
            options: this.#params.casesTypesArr,
            id: "casesTypes",
            labelText: "Cases:",
            required: true,
            defaultOption: this.#params.casesType
        });
        const casesTypesContainer = document.createElement("div");
        casesTypesContainer.classList.add("select-container");
        casesTypesContainer.appendChild(this.#casesTypesSelect.htmlLabel);
        casesTypesContainer.appendChild(this.#casesTypesSelect.html);
        inputsContainer.appendChild(casesTypesContainer);

        this.#countriesSelect = new SelectElement({
            options: this.#params.countriesArr,
            id: "countries",
            labelText: "Country:",
            required: true,
            defaultOption: this.#params.country
        });
        const countriesContainer = document.createElement("div");
        countriesContainer.classList.add("select-container");
        countriesContainer.appendChild(this.#countriesSelect.htmlLabel);
        countriesContainer.appendChild(this.#countriesSelect.html);
        inputsContainer.appendChild(countriesContainer);

        this.#timePeriodObj = new TimePeriodElement(this.#params.dayOne, this.#params.today);
        const timePeriodElement = this.#timePeriodObj.html;
        inputsContainer.appendChild(timePeriodElement);

        const submitContainer = document.createElement("div");
        submitContainer.classList.add("submit-container");
        this.#html.appendChild(submitContainer);

        const submitButton = document.createElement("input");
        submitButton.type = "submit";
        submitButton.value = "Show data";
        submitContainer.appendChild(submitButton);
    }

    getInputsData() {
        const formData = {
            casesType: this.#casesTypesSelect.getValue(),
            country: this.#countriesSelect.getValue(),
            dateFrom: this.#timePeriodObj.getInputsValues().dateFrom,
            dateTo: this.#timePeriodObj.getInputsValues().dateTo
        }

        if (!formData.casesType) {
            formData.casesType = this.#params.casesType;
            this.#casesTypesSelect.html.value = this.#params.casesType;
        }

        if (!formData.country) {
            formData.country = this.#params.country;
            this.#countriesSelect.html.value = this.#params.country;
        }

        if (!formData.dateFrom) {
            formData.dateFrom = this.#params.dayOne;
            this.#timePeriodObj.dateFromInput.value = this.#params.dayOne;
        }

        if (formData.dateFrom < this.#params.dayOne) {
            formData.dateFrom = this.#params.dayOne;
            this.#timePeriodObj.dateFromInput.value = this.#params.dayOne;
        }

        if (!formData.dateTo) {
            formData.dateTo = this.#params.today;
            this.#timePeriodObj.dateToInput.value = this.#params.today;
        }

        if (formData.dateTo < formData.dateFrom) {
            formData.dateTo = formData.dateFrom;
            this.#timePeriodObj.dateToInput.value = formData.dateFrom;
        }

        return formData;
    }
}

export { CovidChartForm };