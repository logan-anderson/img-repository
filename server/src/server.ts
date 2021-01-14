import { PrismaClient } from '@prisma/client'
import * as bodyParser from 'body-parser'
import express from 'express'
import cors from 'cors'
import api from './api'
export const prisma = new PrismaClient()

export const VERSION = 'v1'

const app = express()
app.use(cors({
    // this would change for prod
    origin: "*"
}))
app.use(bodyParser.json())
app.use('/', api)



export { app }
