import mysql from 'serverless-mysql'

const db = mysql({
    config: {
        host: process.env.mysql_host,
        port: process.env.mysql_port,
        database: process.env.mysql_database,
        user: process.env.mysql_user,
        password: process.env.mysql_password
    }
});

export default async function excuteQuery({ query, values }) {
    try {
        const results = await db.query(query, values)
        await db.end();
        return results
    } catch (error) {
        return {
            error
        }
    }
}

export async function commitInsert(value) {
    try {
        const tt = await db.transaction()
        .query('INSERT INTO ticket VALUES(?,?,?,?)',value)
        .commit()
        db.end()
        return tt
    } catch (error) {
        return error
    }
}