class CovidAPI {
    constructor() {
        this.#isInitialized = false;
        this.#url = "https://api.covid19api.com/";
    }

    #isInitialized
    #url;

    /** @type {Map<string, string>} */
    #countries

    /** Countries names array in alphabetical order. */
    get countries() {
        if (!this.#isInitialized) {
            return console.error("Object must be initialized before it can becomes a functional");
        }
        const namesArr = [];
        this.#countries.forEach((value, key) => {
            namesArr.push(key);
        });
        namesArr.sort((a, b) => { return a.localeCompare(b) })
        return namesArr;
    }

    /**
     * @param {Object} params           Parameters.
     * @param {string} params.casesType Cases type to filter the query results.
     * @param {string} params.country   Country to filter the query results.
     * @param {string} params.dateFrom  Date from which the returned results are to begin ("YYYY-MM-DD").
     * @param {string} params.dateTo    Date on which the returned results should end ("YYYY-MM-DD").
     */
    async getData(params) {
        if (!this.#isInitialized) {
            return console.error("Object must be initialized before it can becomes a functional");
        }

        if (!(params instanceof Object)) {
            return console.error("Incorrect argument. Expected an Object");
        }

        const path = await this.#parseParams(params);
        const query = this.#url + path;
        const data = await this.#apiQuery(query);
        return data;
    }

    /** Initialize a new instance of object. */
    async init() {
        this.#isInitialized = true;
        await this.#getCountries();
    }

    async #getCountries() {
        const queryLink = this.#url + "countries";
        const data = await this.#apiQuery(queryLink);
        const countries = new Map();
        data.forEach(el => {
            countries.set(el.Country, el.Slug);
        }
        );
        this.#countries = countries;
    }

    async #apiQuery(queryLink) {
        const response = await fetch(queryLink);
        if (!response.ok) {
            return console.error(`Http error: ${response.status}`);
        }
        const jsonData = await response.json();
        return jsonData;
    }

    /**
     * @param {Object} params           Parameters.
     * @param {string} params.casesType Cases type to filter the query results.
     * @param {string} params.country   Country to filter the query results.
     * @param {string} params.dateFrom  Date from which the returned results are to begin ("YYYY-MM-DD").
     * @param {string} params.dateTo    Date on which the returned results should end ("YYYY-MM-DD").
     */
    async #parseParams(params) {
        let path = "";
        const slug = this.#countries.get(params.country);
        const casesType = params.casesType.toLowerCase();
        const dateFrom = params.dateFrom;
        const dateTo = params.dateTo;
        path += ("country/" + slug + "/" + "status/" + casesType + "?from=" + dateFrom + "T00:00:00Z&to=" + dateTo + "T00:00:00Z");
        return path;
    }
}

export { CovidAPI };