const mon = require('mongoose');

const pass = 'tkXpsdqpZtQopeee'

const db = `mongodb+srv://admin:${pass}@cluster0.ughyi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
const ex = require('express')

const app = ex()

app.use(ex.json())


mon.connect(db).then((result) => {
    console.log('Server started yayyyyyy')
    
}).catch((err) => {
    console.log(err)
    
});


const userSchema = {
    name : {
        type : String,
        required : true,
    },
    email:{
        type: String,
        required : true,
        unique : true
    },
    password:{
        type: String,
        required: true,
        minLength : 10,
    },
    confirmpassword:{
        type: String,
        required: true,
        minLength : 10,
    },
    createdAt : {
        type : Date,
        default: Date.now()
    },
    isPremium:{
        type : Boolean,
        default: false
    },
    role:{
        type : String,
        enum : ["user" , "admin", "curator"]
    }
}

const fschema = new mon.Schema(userSchema)

fschema.pre("save" , function(next){
    console.log('Pre cummed')
    this.confirmpassword = undefined
    next()
})

fschema.post('save' , function(){
    console.log('NNN')
    this.confirmpassword = undefined
 

})
const uModel = mon.model('User' , fschema)

app.post('/user' ,async function ( req , res){
    try {
        const data = req.body
        console.log(data)

        if(data.password != data.confirmpassword){
            res.status(500).json({
                message: 'Password and confirm password is not same'
            })
        }
        const user = await uModel.create(data)

        res.status(200).json({
            user: user
        })
        
    } catch (error) {
        res.status(500).json({
            message : 'internal Server Error',
            error : error
        })
    }
})


app.listen(3000 , ()=>{
    console.log('server started')
})