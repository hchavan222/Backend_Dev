const ex = require('express')


const cp = require('cookie-parser')
const jwt = require('jsonwebtoken')
const util = require('util')

const promisify = util.promisify ;

const promisedJWTSign = promisify(jwt.sign)
const promisedJWTverify = promisify(jwt.verify)

const SECRET_KEY = 'bashgcajbcj'

const app = ex();
app.use(cp())
app.use(ex.json())

const getdata = async function(req , res){
    const authToken = await promisedJWTSign({"payload":"hdsbvhsdbv"} , SECRET_KEY)

    res.cookie("jwt", authToken ,{
        maxAge : 1000 * 60 * 60 * 24,
        httpOnly : true 

    })

    res.status(200).json({Message : "hello"})

}


const verifyData = async function(req , res){

    console.log(req.cookies)

    if(req.cookies && req.cookies.jwt){
        const authToken1 = req.cookies.jwt
    const authToken = await promisedJWTverify(authToken1 , SECRET_KEY)

    res.status(200).json({Message : authToken})

    }else{
        res.status(400).json({message : 'Error in JWT'})
    }
    

}

app.get('/home', getdata)
app.get('/verify', verifyData)

app.listen(3000 , ()=>{

    console.log('server started');

})