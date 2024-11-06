const mon = require('mongoose');

const pass = 'tkXpsdqpZtQopeee'

const db = `mongodb+srv://admin:${pass}@cluster0.ughyi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`



mon.connect(db).then((result) => {
    console.log('Server started yayyy')
    
}).catch((err) => {
    console.log(err)
    
});