const compareTime = (departure, arrival) => {
    let departureTime = new Date(departure);
    let arrivalTime = new Date(arrival);

    return arrivalTime > departureTime;
}

module.exports = {
    compareTime
}