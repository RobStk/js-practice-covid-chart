import { Chart, registerables } from "chart.js";

class ChartCanvas {
    /**
     * @param {Object[]} data 
     */
    constructor(data) {
        console.log("Covid data provided by https://covid19api.com/");
        this.#createHTML();
        this.#create(data);
    }

    /** @type {HTMLElement} */
    #html

    /** @type {Chart} */
    #chart

    get html() {
        return this.#html;
    }

    /**
     * Chart updating method.
     * @param {Object[]} data New data for chart.
     */
    update(data) {
        const labels = [];
        const dataset = [];
        data.forEach(element => {
            labels.push(element.Date.substr(0, 10));
            dataset.push(element.Cases);
        });
        this.#chart.data.labels = labels;
        this.#chart.data.datasets = [{
            label: "cases",
            data: dataset,
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
        }];
        this.#chart.update();
    }

    #createHTML() {
        this.#html = document.createElement("canvas");
        this.#html.classList.add("chart");
        this.#html.setAttribute("id", "chart");
        this.#html.setAttribute("role", "img");
        this.#html.setAttribute("alt", "covid-chart");
    }

    #create(data) {
        const labels = [];
        const dataset = [];
        data.forEach(element => {
            labels.push(element.Date.substr(0, 10));
            dataset.push(element.Cases);
        });

        const chartData = {
            labels: labels,
            datasets: [{
                label: "cases",
                data: dataset,
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
            }]
        }

        const config = {
            type: 'line',
            data: chartData
        }

        Chart.register(...registerables);
        this.#chart = new Chart(this.#html, config)
    }
}

export { ChartCanvas };