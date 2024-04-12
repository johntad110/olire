import db from "@/db";
import { RowDataPacket } from "mysql2";

export async function getAllPls(): Promise<any[]> {
    const query = 'SELECT * FROM Programming_Languages'

    return new Promise<any[]>((resolve, reject) => {
        const connection = db.getConnection((err, connection) => {
            if (err) {
                console.error("Error connecting to the database: ", err)
                reject(err);
            } else {
                connection.query(query, (err, results: RowDataPacket[]) => {
                    if (err) {
                        console.error(err.message)
                        reject(err)
                    } else {
                        if (results.length === 0) {
                            resolve([])
                        } else {
                            resolve(results)
                        }
                    }
                })
            }
        })
    })
}