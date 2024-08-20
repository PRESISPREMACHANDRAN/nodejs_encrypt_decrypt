const express=require('express')
const cors=require('cors')
const bodyParser=require('body-parser')
const CryptoJS=require('crypto-js')


const app=express()

//middleware
app.use(cors())
app.use(bodyParser.json({limit:'50mb'}))
app.use(bodyParser.urlencoded({limit:'50mb',extended:true}))//bodyparser is using for data from body

//api
app.get('/',(req,res)=>[
    res.send("Hello")
])

function encrypt(data,key){
    const cipherText=CryptoJS.AES.encrypt(data,key).toString()
    return cipherText;
}

app.post('/encrypt',(req,res)=>{
    const {data,key}=req.body;
    const encrypted=encrypt(data,key)
    res.json({encrypted})
})

module.exports=app