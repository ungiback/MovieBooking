const td = new Date()

export function getDays() {

    const days = []
    const lastDay = new Date(td.getFullYear(), td.getMonth() + 1, 0).getDate()
    for (var i = 1; i <= lastDay; i++) {
        days.push(parseInt(i))
    }
    return days
}

export function Seats_date(li) {
    const day = li<10 ? `0${li}`: li
    const month = td.getMonth() < 10 ? `0${td.getMonth()+1}` : td.getMonth();
    const DATE = `${td.getFullYear()}-${month}-${day}`

    return DATE
}