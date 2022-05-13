import { CovidChart } from "./covid-chart";

async function main() {
    let container = document.querySelector(".container");
    const covidChart = new CovidChart(container);
    await covidChart.init();
}

main();