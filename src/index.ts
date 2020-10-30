import express, { Request, Response } from 'express'

const app = express()

app.listen(3000 , ()=>{
    console.log("App is listenin......");
})

app.get('/' , (req : Request , res : Response)=>{
    res.json({
        message : 'Success.........'
    })
})

