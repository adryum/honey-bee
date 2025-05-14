import { db } from './server.js'

export function testConnection() {
    db.query('Select 1')
        .then(() => console.log('db connected successfuly!'))
        .catch(err => {
            console.error(`db failed to connect!`)
            console.error(err)
        })
}