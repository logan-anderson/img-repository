import { Router } from 'express'
import { prisma }  from '../server'
const api = Router()

api.get('/test', (req, res)=>{

    res.send( {
        test: true
    })
})
api.get('/img', async (req, res)=>{
    console.log('running')
    const imgs = await prisma.image.findMany()

    res.send({
        imgs,
    })
})
api.post('/img', async (req, res)=>{
    const img =  prisma.image.create({
        data: {
            name: "Test",
            url: "www.google.com"
        }
    })

    res.send({
        ok: true
    })
})

api.get('/', (req, res)=>{

    res.send( {
        test: true
    })
})

export default api

