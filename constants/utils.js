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

const countAmountOfCycles = (cycle, firstBill) => {
    if(cycle && firstBill){
        const today = new Date();
        const startDate = new Date(firstBill);
        const diff = today.getTime() - startDate.getTime();
        const months = Math.floor(diff / (1000 * 60 * 60 * 24 * 30));
        const cycles = Math.floor((months / cycle) + 1); // +1 because we want to include the current cycle
        return cycles || 0;
    }
}

const countTotalPaid = (cycle, firstBill, price) => {
    if(cycle && firstBill){
        const today = new Date();
        const startDate = new Date(firstBill);
        const diff = +today - +startDate;
        const months = Math.floor(diff / (1000 * 60 * 60 * 24 * 30));
        const cycles = Math.floor(months / cycle);
        const totalPaid = (cycles + 1) * price; // +1 because we want to include the current cycle
        return totalPaid.toFixed(2) || 0;
    }
}

const calcNewBill = (firstBill, cycle) => {
    const cycles = countAmountOfCycles(cycle, firstBill);
    const newDate = new Date(firstBill);
    newDate.setMonth(newDate.getMonth() + (cycles * cycle));
    return newDate;
}

export default {
    dateConverter,
    dateFormat,
    addComaToNumber,
    countAmountOfCycles,
    countTotalPaid,
    calcNewBill,
}