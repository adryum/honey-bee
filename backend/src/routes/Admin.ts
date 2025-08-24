import { Router, type Request, type Response } from "express";
import { db } from "../server";

const router = Router()

interface IUserResponse {
    identification: string
}

router.post('/users', async (req: Request<{},{}, IUserResponse>, res: Response) => {
    const { identification } = req.body 

    console.log(identification);

    if (!identification) {
        res.status(401).send("incorrect credentials!");
        return;
    }

    const query = `
        SELECT u.*, COUNT(DISTINCT h.id) AS hive_count
        FROM users AS u
        LEFT JOIN hives AS h ON h.user_id = u.id
        GROUP BY u.id
    `

    const [users] = await db.query(query)

    console.log(users)
    
    res.status(201).json({
        message: 'all good!',
        users: users
    })
})

router.post('/user/delete', async (req: Request, res: Response) => {
    const { identification, userId } = req.body
    console.log(identification, userId);
    
    // missing credentials
    if (!identification || (!userId && userId != 0)) {
        res.status(401).send('incorrect credentials!') 
        return
    }
 
    const deleteQuery = `
        DELETE FROM users WHERE id = ?
    `
    const delRes = await db.query(deleteQuery, [userId])
    
    res.status(201).json({
        message: 'all good!',
    })
})


router.post('/user', async (req, res) => {
    const { identification, username, name, surname, image, email, password } = req.body

    // console.log(identification, username, name, surname, image, email, password );
    
    // const promises = []
    // let userId
    // await db.query('SELECT id FROM users WHERE account_code = ?', [identification.code]).then((result) => {
    //     [[{ id: userId }]] = result
    // })
    // console.log('userId : ' + userId);
    
    // const wherePart = 'WHERE id = ' + userId

    // if (username) 
    //     promises.push(db.query('UPDATE users SET username = ? ' + wherePart, [username]))
    // if (name) 
    //     promises.push(db.query('UPDATE users SET name = ? ' + wherePart, [name]))
    // if (surname) 
    //     promises.push(db.query('UPDATE users SET surname = ? ' + wherePart, [surname]))
    // if (image) 
    //     promises.push(db.query('UPDATE users SET image = ? ' + wherePart, [image]))
    // if (email) 
    //     promises.push(db.query('UPDATE users SET e_mail = ? ' + wherePart, [email]))
    // if (password) 
    //     promises.push(db.query('UPDATE users SET password = ? ' + wherePart, [password]))

    // await Promise.all(promises)

    // // const [[user]] = await db.query('SELECT * FROM users ' + wherePart)

    // console.log(user);
    

    // res.status(201).json({
    //     message: 'all good!',
    //     user: user
    // })
})

export default router