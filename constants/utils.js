const dateConverter = (date) => {
    const newDate = new Date(date).toLocaleDateString('en-US', {month: 'short', day: 'numeric', year: 'numeric'});
    return newDate;
}

export default {
    dateConverter,
}