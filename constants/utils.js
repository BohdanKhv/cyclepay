const dateConverter = (date) => {
    const newDate = new Date(date).toLocaleDateString('en-US', {month: 'short', day: 'numeric', year: '2-digit'});
    return newDate;
}

const dateFormat = (date) => {
    const str = date.toISOString();
    return str.substring(0, str.indexOf('T'));
}

const addComaToNumber = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function monthDiff(to, from) {
    var months = to.getMonth() - from.getMonth() + (12 * (to.getFullYear() - from.getFullYear()));
    if(to.getDate() < from.getDate()){
        months--;
    }
    return months;
}

const countAmountOfCycles = (cycle, firstBill, cycleBy, currDate) => {
    // firstBill (yyyy-mm-dd)
    if(cycle && firstBill){
        const date = new Date();
        const today = currDate ? new Date(currDate) : new Date(date.getFullYear(), date.getMonth(), date.getDate());
        const startDate = new Date(firstBill);
        if(cycleBy === 'm'){
            // Count amount of cycles between today and first bill.
            // First date counts as a cycle.
            const months = monthDiff(today, startDate);
            const cycles = Math.floor(months / cycle);
            return cycles + 1;
        } else {
            // Count amount of cycles between today and first bill.
            // First date counts as a cycle.
            const days = amountOfDaysBetweenTwoDates(today, startDate);
            const cycles = Math.floor(days / cycle);
            return cycles;
        }
    }
}

const calcNewBill = (firstBill, cycle, cycleBy, currDate) => {
    // firstBill (yyyy-mm-dd)
    if(cycle && firstBill){
        const date = new Date();
        const today = currDate ? new Date(currDate) : new Date(date.getFullYear(), date.getMonth(), date.getDate());
        const startDate = new Date(firstBill);
        if(cycleBy === 'm'){
            // Count amount of cycles between today and first bill.
            // First date counts as a cycle.
            const months = monthDiff(today, startDate);
            const cycles = Math.floor(months / cycle);

            // Get date n months from first bill date.
            const newBill = new Date(firstBill);
            newBill.setMonth(newBill.getMonth() + cycles * cycle + cycle);
            // Set the same day as the first bill.
            // Regardless of the hours, minutes, seconds, milliseconds.
            newBill.setDate(startDate.getDate());

            return dateFormat(newBill);
        } else {
            // Count amount of cycles between today and first bill.
            // First date counts as a cycle.
            const days = amountOfDaysBetweenTwoDates(today, startDate);
            const cycles = Math.floor(days / cycle);

            // Get date n days from first bill date.
            const newBill = new Date(firstBill);
            newBill.setDate(newBill.getDate() + cycles * cycle + cycle);

            return dateFormat(newBill);
        }
    }
}

const countTotalPaid = (cycle, firstBill, cycleBy, price) => {
    if(cycle && firstBill){
        if(cycleBy === 'm'){
            const today = new Date();
            const startDate = new Date(firstBill);
            const months = monthDiff(today, startDate);
            const cycles = Math.floor(months / cycle);
            const totalPaid = (cycles + 1) * price; // +1 because we want to include the current cycle
            return totalPaid.toFixed(2) || 0;
        } else {
            const today = new Date();
            const startDate = new Date(firstBill);
            const days = amountOfDaysBetweenTwoDates(today, startDate);
            const cycles = Math.floor(days / cycle);
            const totalPaid = cycles * price; // +1 because we want to include the current cycle
            return totalPaid.toFixed(2) || 0;
        }
    }
}

const generateId = () => {
    return Math.random().toString(36).substr(2, 9);
}

const amountOfDaysBetweenTwoDates = (date1, date2) => {
    const d1 = new Date(date1);
    const d2 = new Date(date2);
    d1.setHours(0,0,0,0);
    d2.setHours(0,0,0,0);
    const diff = Math.abs(d1.getTime() - d2.getTime());
    return Math.floor(diff / (1000 * 60 * 60 * 24));
}

const thirtySecondsFromNow = () => {
    const date = new Date();
    date.setSeconds(date.getSeconds() + 30);
    return date;
}

export default {
    dateConverter,
    dateFormat,
    addComaToNumber,
    countAmountOfCycles,
    countTotalPaid,
    calcNewBill,
    generateId,
    amountOfDaysBetweenTwoDates,
    thirtySecondsFromNow
}