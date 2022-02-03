
import excuteQuery from "../../../store/swr/db";
import { Seats_date } from "../../../utils/newResults";

export default async function seats(req, res) {
    const { movieId, day, time, roomId } = req.query
    let sql_res
    const arr = []
    if (movieId && day && time && roomId) {
        sql_res = JSON.parse(JSON.stringify(await excuteQuery({ query: `SELECT seat_id FROM SCHEDULE INNER JOIN ticket ON ticket.schedule_id = schedule.schedule_id WHERE DATE=? AND TIME = ? AND movie_id = ? AND room_id=?`, values: [Seats_date(day), time, parseInt(movieId), parseInt(roomId)] })))
        sql_res.map(item => arr.push(item.seat_id))
    }
    res.status(200).json(arr)
}