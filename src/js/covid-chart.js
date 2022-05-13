import { ChartCanvas } from "./chart-canvas";
import { CovidChartForm } from "./covid-chart-form";
import { DateCompiler } from "./date-compiler";
import { CovidAPI } from "./covid-api";

class CovidChart {
    /**
     * @param {HTMLElement} containerElement        Container to place the chart in it.
     * @param {Object} [opts]                       Options.
     * @param {string} [opts.casesType=Confirmed]   Default cases type.
     * @param {string} [opts.country=Poland]        Default country.
     * @param {string} [opts.dayOne=dayOne]         Default min date.
     * @param {string} [opts.today=today]           Default max date.
     */
    constructor(containerElement, opts) {
        this.#containerElement = containerElement;
        if (!this.#containerElement) {
            this.#containerElement = document.createElement("div");
            document.body.appendChild(this.#containerElement);
        }
        this.#containerElement.classList.add("covid-chart");

        const date = new Date();
        const dateCompiled = new DateCompiler(date);
        const today = dateCompiled.string;
        const dayOne = "2020-01-22";
        const defaultCasesType = "Confirmed";
        const defaultCountry = "Poland";

        const defaultParams = {
            casesTypesArr: ["Confirmed", "Recovered", "Deaths"],
            casesType: defaultCasesType,
            country: defaultCountry,
            countriesArr: [],
            dayOne: dayOne,
            today: today
        }
        this.#opts = { ...defaultParams, ...opts };
        this.#params = {
            casesType: this.#opts.casesType,
            country: this.#opts.country,
            dateFrom: this.#opts.dayOne,
            dateTo: this.#opts.today
        };
    }

    #opts;
    #params
    #containerElement;

    /** @type {CovidChartForm} */
    #form;

    /** @type {ChartCanvas} */
    #chart;

    /** @type {CovidAPI} */
    #api

    async init() {
        this.#api = new CovidAPI();
        await this.#api.init();
        this.#opts.countriesArr = this.#api.countries;
        await this.#createHTML();
        this.#addEventsListeners();
    }

    async #createHTML() {
        this.#containerElement.innerHTML = "";

        const h1 = document.createElement("h1");
        h1.textContent = "Covid-19 incidence chart";
        this.#containerElement.appendChild(h1);

        this.#form = new CovidChartForm(this.#opts);
        this.#containerElement.appendChild(this.#form.html);



        const data = await this.#loadData();
        this.#chart = new ChartCanvas(data);
        this.#containerElement.appendChild(this.#chart.html);
    }

    async #loadData() {
        const data = await this.#api.getData(this.#params);
        return data;
    }

    async #formSubmit(event) {
        event.preventDefault();
        this.#params = this.#form.getInputsData();
        const data = await this.#loadData();
        this.#chart.update(data);
    }

    #addEventsListeners() {
        this.#form.html.addEventListener("submit", this.#formSubmit.bind(this));
    }
}
export { CovidChart };