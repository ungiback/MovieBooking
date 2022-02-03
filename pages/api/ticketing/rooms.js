import excuteQuery from "../../../store/swr/db";

export default async function rooms(req, res) {
    const date_ = new Date()
    const { movieId, day } = req.query
    let sql_res
    const DATE = `${date_.getFullYear()}-0${date_.getMonth() + 1}-${day}`
    const MOVIE_ID = `${movieId}`

    if (movieId && day) {
        sql_res = JSON.parse(JSON.stringify(await excuteQuery({ query: `SELECT room_id,time FROM SCHEDULE WHERE DATE=? AND movie_id = ?`, values: [DATE, parseInt(MOVIE_ID)] })))
    }
    res.status(200).json(sql_res)
}