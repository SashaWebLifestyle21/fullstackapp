import express from 'express'
import mongoose from "mongoose";
import config from 'config'
import authRoutes from './routes/auth.routes.js'
import carRoutes from './routes/car.routes.js'
import orderRoutes from './routes/order.routes.js'
import commentRoutes from './routes/comment.routes.js'
import managerRoutes from './routes/manager.routes.js'
import cors from 'cors'
import fileUpload from 'express-fileupload'

const app = express()

app.use(cors())
app.use(fileUpload())
app.use(express.json())
app.use(express.static('public'))
// { extended: true }

app.use('/api/user', authRoutes)
app.use('/api/car', carRoutes)
app.use('/api/order', orderRoutes)
app.use('/api/comment', commentRoutes)
app.use('/api/manager', managerRoutes)


const PORT = config.get('port') || 5000

async function start() {
    try {
        await mongoose.connect(config.get('mongoUri'), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        app.listen(PORT, () => console.log(`App started on port ${PORT}`))
    } catch (e) {
        console.log('Server Error ', e.message)
        process.exit(1)
    }
}

start()

