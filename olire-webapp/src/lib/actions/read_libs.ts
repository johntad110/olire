import db from "@/db";
import { RowDataPacket } from "mysql2";

export async function getLibs(tags: any[], pls: any[]): Promise<any[]> {
    const tagNames = tags.map((tag) => `'${tag}'`).join(", ");
    const plNames = pls.map((pl) => `'${pl}'`).join(", ")

    const query = `
    SELECT DISTINCT l.id, l.name, l.description, l.url
    FROM Libraries l
    JOIN Library_Tags lt ON l.id = lt.library_id
    JOIN Tags t ON lt.tag_id = t.id
    JOIN Library_Languages ll on l.id = ll.library_id
    JOIN Programming_Languages pl on ll.language_id = pl.id
    WHERE t.name IN (${tagNames})
        AND pl.name IN (${plNames})
    `;

    return new Promise<any[]>((resolve, reject) => {
        const connection = db.getConnection((err, connection) => {
            if (err) {
                console.error("Error conencting to db: ", err)
                reject(err)
            } else {
                connection.query(query, (err, result: RowDataPacket[]) => {
                    if (err) {
                        console.error(err.message)
                        reject(err)
                    } else {
                        if (result.length === 0) {
                            resolve([])
                        } else {
                            resolve(result)
                        }
                    }
                })
            }
        })
    })
}