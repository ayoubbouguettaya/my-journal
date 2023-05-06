export const formatDate = (date: Date) => {
    const day = prefix(date.getDate());
    const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"][date.getMonth()];
    return `${day} , ${month}`
}

function prefix(day: number) {
    if (day == 31 || day == 21 || day == 1) return day + "st";
    else if (day == 22 || day == 2) return day + "nd";
    else if (day == 23 || day == 3) return day + "rd";
    else return day + "th";
};