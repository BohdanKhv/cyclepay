const dateConverter = (date) => {
    const newDate = new Date(date).toLocaleDateString('en-US', {month: 'short', day: 'numeric', year: '2-digit'});
    return newDate;
}

const dateFormat = (date) => {
    const newDate = date.getFullYear() + '-' +  (date.getMonth() + 1) + '-' + date.getDate();
    return newDate;
}

const addComaToNumber = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const padTo2Digits = (num) => {
    return num.toString().padStart(2, '0');
}

function monthDiff(to, from) {
    var months = to.getMonth() - from.getMonth() + (12 * (to.getFullYear() - from.getFullYear()));
    if(to.getDate() < from.getDate()){
        months--;
    }
    return months;
}

const formatDate = (date) => {
    // 2022-01-18 (yyyy-mm-dd)
    return [
        date.getFullYear(),
        padTo2Digits(date.getMonth() + 1),
        padTo2Digits(date.getDate()),
    ].join('-');
}

const countAmountOfCycles = (cycle, firstBill, currDate) => {
    // firstBill (yyyy-mm-dd)
    if(cycle && firstBill){
        const today = new Date(currDate) || new Date();
        const startDate = new Date(firstBill);
        // Count amount of cycles between today and first bill.
        // First date counts as a cycle.
        const months = monthDiff(today, startDate);
        const cycles = Math.floor(months / cycle);
        return cycles + 1;
    }
}

const calcNewBill = (firstBill, cycle, currDate) => {
    // firstBill (yyyy-mm-dd)
    if(cycle && firstBill){
        const today = new Date(currDate) || new Date();
        const startDate = new Date(firstBill);
        // Count amount of cycles between today and first bill.
        // First date counts as a cycle.
        const months = monthDiff(today, startDate);
        const cycles = Math.floor(months / cycle);

        // Get date n months from first bill date.
        const newBill = new Date(firstBill);
        newBill.setMonth(newBill.getMonth() + cycles * cycle + cycle);
        // Add 1 day to the new bill date. The subscription is paid on the first day of the month.
        newBill.setDate(newBill.getDate() + 1);
        return formatDate(newBill);
    }
}

const countTotalPaid = (cycle, firstBill, price) => {
    if(cycle && firstBill){
        const today = new Date();
        const startDate = new Date(firstBill);
        const months = monthDiff(today, startDate);
        const cycles = Math.floor(months / cycle);
        const totalPaid = (cycles + 1) * price; // +1 because we want to include the current cycle
        return totalPaid.toFixed(2) || 0;
    }
}

export default {
    dateConverter,
    dateFormat,
    addComaToNumber,
    countAmountOfCycles,
    countTotalPaid,
    calcNewBill,
}