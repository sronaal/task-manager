import express from "express";
import 'dotenv/config.js'
import routerUser from './routes/user.routes.js'

const app = express()


app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api',routerUser)

export default app