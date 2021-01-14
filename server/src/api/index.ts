import { Router } from 'express'
import { prisma }  from '../server'
const api = Router()

api.get('/test', (req, res)=>{

    res.send( {
        test: true
    })
})
api.get('/img', async (req, res)=>{
    const imgs = await prisma.image.findMany({include: {
        tags: true
    }})

    res.send({
        imgs,
    })
})
api.post('/img', async (req, res)=>{
    const {name, url, tags}: {name: string, url: string, tags: {id?: number, name: string}[]} = req.body
    if(!name || !url || !tags){
        res.status(404)
        res.send({
            ok: false,
            message: "Must include a name, url and tags"
        })
        return
    }
    const allTags = tags.map(tag=>({create:  {name: tag.name}, where: {id: tag.id || -1}}),)
    const img =  await prisma.image.create({
        data: {
            name,
            url,
            tags: {
                connectOrCreate:allTags,
            }
        }
    })

    res.send({
        ok: true,
        img: img
    })
})

api.get('/tags', async (req, res)=>{

    res.send( {
        tags: await prisma.tag.findMany({include: {images: true}})
    })
})

api.get('/', (req, res)=>{

    res.send( {
        test: true
    })
})

export default api

