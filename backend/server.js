import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import providersRouter from './routes/providers.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())
app.use('/api/providers', providersRouter)

app.get('/', (req, res) => {
  res.json({ message: 'WithHer backend is running 🌸' })
})

export default app