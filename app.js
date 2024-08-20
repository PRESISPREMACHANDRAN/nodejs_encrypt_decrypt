const express=require('express')
const cors=require('cors')
const bodyParser=require('body-parser')
const CryptoJS=require('crypto-js')


const app=express()

//middleware
app.use(cors())
app.use(bodyParser.json({limit:'50mb'}))
app.use(bodyParser.urlencoded({limit:'50mb',extended:true}))//bodyparser is using for data from body

//api-test
app.get('/',(req,res)=>[
    res.send("Hello")
])

//encryption
function encrypt(data,key){
    const cipherText=CryptoJS.AES.encrypt(data,key).toString()
    return cipherText;
}

app.post('/encrypt',(req,res)=>{
    const {data,key}=req.body;
    const encrypted=encrypt(data,key)
    res.json({encrypted})
})

//decryption
function decrypt(cipherText,key){
    try {
        const bytes = CryptoJS.AES.decrypt(cipherText,key);

        if(bytes.sigBytes > 0){
            const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
            return decryptedData;
        }else{
            throw new Error('Decryption Failed Invalid Key')
        }
    } catch (error) {
        throw new Error('Decryption Failed Invalid Key')
    }

}
app.post('/decrypt',(req,res)=>{
    const { encryptedData, key } = req.body;

    const decryptedData = decrypt(encryptedData, key);
    res.json({decryptedData});
});



module.exports=app