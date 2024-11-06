const mon = require('mongoose');

const pass = 'tkXpsdqpZtQopeee'

const db = `mongodb+srv://admin:${pass}@cluster0.ughyi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`



mon.connect(db).then(()=>{
    console.log('connection sucessful').catch(err=>{
        console.log(err)
    })
})