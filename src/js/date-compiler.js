class DateCompiler {
    /**
     * @param {Date|string} date Date object or string in "YYYY-MM-DD" format to compile.
     */
    constructor(date) {
        if ((typeof date === "string")) {
            this.#dateInParts = this.#splitDateIntoNumbers(date);
        } else if (date instanceof Date) {
            this.#dateInParts = {};
            this.#dateInParts.year = date.getFullYear();
            this.#dateInParts.month = date.getMonth() + 1;
            this.#dateInParts.day = date.getDate();
        } else {
            return console.error("Incorrect argument. Expected String or Date object");
        }
        this.#dateString = this.#compilePartedToString(this.#dateInParts);
    }

    #dateInParts;
    #dateString;

    get dateInParts() {
        return this.#dateInParts;
    }

    get string() {
        return this.#dateString;
    }

    #splitDateIntoNumbers(stringDateWithDashes) {
        const dateInParts = {};
        dateInParts.year = parseInt(stringDateWithDashes.split("-")[0]);
        dateInParts.month = parseInt(stringDateWithDashes.split("-")[1]);
        dateInParts.day = parseInt(stringDateWithDashes.split("-")[2]);
        return dateInParts;
    }

    #compilePartedToString(dateObj) {
        const year = dateObj.year;
        let month = dateObj.month;
        let day = dateObj.day;
        if (month < 10) {
            month = "0" + month;
        }
        if (day < 10) {
            day = "0" + day;
        }
        const dateStr = year + "-" + month + "-" + day;
        return dateStr;
    }
}

export { DateCompiler };