import excuteQuery, { commitInsert } from "../../../store/swr/db";
import { Seats_date } from "../../../utils/newResults";

export default async function insert(req, res) {
    const { movieId, day, time, roomId, seat_arr } = req.body
    const schedule_data = JSON.parse(JSON.stringify(await excuteQuery({ query: `SELECT schedule_id  FROM SCHEDULE WHERE DATE=? AND TIME =? AND movie_id = ? AND room_id = ?`, values: [Seats_date(day), time, parseInt(movieId), parseInt(roomId)] })))
    const ticket_data = JSON.parse(JSON.stringify(await excuteQuery({ query: `SELECT COUNT(*) AS cnt FROM ticket WHERE ticket_id LIKE ?`, values: [`${day}%`] })))

    try {
        if (schedule_data.length > 0 && ticket_data.length > 0) {
            const id = schedule_data[0].schedule_id
            const cnt = ticket_data[0].cnt
            for (var i = 1; i <= seat_arr.length; i++) {
                await commitInsert([`${day}-${cnt + i}`, 9999, id, seat_arr[i - 1]])
            }
        }

    } catch (error) {
        console.log("insertDB에러")
    }

    res.status(200).json({ ticketing: true })
}


// insert 성공
// [
//     OkPacket {
//       fieldCount: 0,
//       affectedRows: 1,
//       insertId: 0,
//       serverStatus: 3,
//       warningCount: 0,
//       message: '',
//       protocol41: true,
//       changedRows: 0
//     }
//   ]

//insert 실패
// Error: ER_DUP_ENTRY: Duplicate entry '23-10' for key 'PRIMARY'
//     at Query.Sequence._packetToError (C:\Users\ungi3\Desktop\coding_Study\project\nextjs_project\node_modules\mysql\lib\protocol\sequences\Sequence.js:47:14)
//     at Query.ErrorPacket (C:\Users\ungi3\Desktop\coding_Study\project\nextjs_project\node_modules\mysql\lib\protocol\sequences\Query.js:79:18)
//     at Protocol._parsePacket (C:\Users\ungi3\Desktop\coding_Study\project\nextjs_project\node_modules\mysql\lib\protocol\Protocol.js:291:23)
//     at Parser._parsePacket (C:\Users\ungi3\Desktop\coding_Study\project\nextjs_project\node_modules\mysql\lib\protocol\Parser.js:433:10)
//     at Parser.write (C:\Users\ungi3\Desktop\coding_Study\project\nextjs_project\node_modules\mysql\lib\protocol\Parser.js:43:10)
//     at Protocol.write (C:\Users\ungi3\Desktop\coding_Study\project\nextjs_project\node_modules\mysql\lib\protocol\Protocol.js:38:16)
//     at Socket.<anonymous> (C:\Users\ungi3\Desktop\coding_Study\project\nextjs_project\node_modules\mysql\lib\Connection.js:88:28)
//     at Socket.<anonymous> (C:\Users\ungi3\Desktop\coding_Study\project\nextjs_project\node_modules\mysql\lib\Connection.js:526:10)
//     at Socket.emit (events.js:375:28)
//     at Socket.emit (domain.js:470:12)
//     --------------------
//     at Protocol._enqueue (C:\Users\ungi3\Desktop\coding_Study\project\nextjs_project\node_modules\mysql\lib\protocol\Protocol.js:144:48)
//     at Connection.query (C:\Users\ungi3\Desktop\coding_Study\project\nextjs_project\node_modules\mysql\lib\Connection.js:198:25)
//     at C:\Users\ungi3\Desktop\coding_Study\project\nextjs_project\node_modules\serverless-mysql\index.js:189:25
//     at new Promise (<anonymous>)
//     at Object.query (C:\Users\ungi3\Desktop\coding_Study\project\nextjs_project\node_modules\serverless-mysql\index.js:185:12)
//     at runMicrotasks (<anonymous>)
//     at processTicksAndRejections (internal/process/task_queues.js:95:5)
//     at async commit (C:\Users\ungi3\Desktop\coding_Study\project\nextjs_project\node_modules\serverless-mysql\index.js:334:20)
//     at async Object.commit (C:\Users\ungi3\Desktop\coding_Study\project\nextjs_project\node_modules\serverless-mysql\index.js:319:41)
//     at async commitInsert (webpack-internal:///./db.js:31:20) {
//   code: 'ER_DUP_ENTRY',
//   errno: 1062,
//   sqlMessage: "Duplicate entry '23-10' for key 'PRIMARY'",
//   sqlState: '23000',
//   index: 0,
//   sql: "INSERT INTO ticket VALUES('23-10',9999,'220123-1',24)"
// }