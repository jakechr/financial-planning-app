const MONTH: number = 0;

function verifyMonthYearFormat(date: string): boolean {
    if (!date)
        return false;

    const YEAR: number = 1;

    const dateParts = date.split('/').map((part) => parseInt(part));
    if (dateParts.length !== 2) {
        return false;
    }
    if (dateParts[MONTH] > 12 || dateParts[MONTH] < 1) {
        return false;
    }

    return dateParts[YEAR] >= 0;
}

function verifyMonthDayYearFormat(date: string): boolean {
    if (!date)
        return false;

    const DAY: number = 1;
    const YEAR: number = 2;

    const dateParts = date.split('/').map((part) => parseInt(part));
    if (dateParts.length !== 3)
        return false;
    if (dateParts[MONTH] > 12 || dateParts[MONTH] < 1)
        return false;
    if (dateParts[DAY] > 31 || dateParts[DAY] < 1) // TODO: Bad check
        return false;
    if (dateParts[YEAR] < 0)
        return false;

    return true;
}

const dateService = {
    verifyMonthYearFormat,
    verifyMonthDayYearFormat
};

export default dateService;