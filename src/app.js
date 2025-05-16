import express from "express";
import morgan from "morgan";
import 'dotenv/config.js'
import routerUser from './routes/user.routes.js'
import routerTask from './routes/task.routes.js'
const app = express()


app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api',routerUser)
app.use('/api', routerTask)
export default app