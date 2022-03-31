const express = require('express')
const app = express()
// const mysql = require('mysql')
const mongoose = require('mongoose')
const path = require('path')


const Post = require('./models/post')
const Contact = require('./models/contact')

const PORT = 7000


const url = 'mongodb://127.0.0.1:27017/Posts'

mongoose.connect(url, { useNewUrlParser: true })


const db = mongoose.connection


db.once('open', _ => {
  console.log('Database connected:', url)
})

db.on('error', err => {
  console.error('connection error:', err)
})

// const connection = mysql.createConnection({
//     host: 'localhost',
//     port: 3306,
//     database: '123',
//     user: 'root',
//     password: 'root'
// })

// const query = 'SELECT * FROM new_table'


// connection.connect(err=> {
//     if(err){
//         console.error(err)
//         return
//     }
//     console.log('connected to database successfully')
// })


// connection.query(query, (err, res, field)=> {
//     if(err) console.log(err)
//     console.log(res)
//     console.log(field)
// })

// connection.end(err=> {
//     if(err){
//         console.error(err)
//         return
//     }
//     console.log('connection to database successfully ended')
// })



function createPath(page){
   return path.resolve(__dirname, 'views', `${page}.ejs`)
} 


app.set('view engine', 'ejs')

app.use(express.static('static'))

app.use(express.urlencoded({extended: false}))



app.listen(PORT, (error)=> {
    error? console.error(error) : console.log(`Server started on port ${PORT}`)
})

app.get('/', (req, res)=> {
    res.render(createPath('index'))
})





app.get('/contacts', (req, res)=> {
    const title = 'contact page'
    Contact.find()
    .then(contacts=> res.render(createPath('contacts'), {contacts}))
    .catch(()=> res.render(createPath('error')))
    
})


app.get('/posts', (req, res)=> {
    const title = 'posts'
    Post.find()
    .then((posts)=> res.render(createPath('posts'), { posts }))
    .catch(()=> res.render(createPath('error')))
})



app.get('/posts/:id', (req, res)=> {
    Post.findById(req.params.id)
    .then((post)=> res.render(createPath('post'), { post }))
    .catch(()=> res.render(createPath('error')))
})



app.get('/add-post', (req, res)=> {
    res.render(createPath('add-post'))
})


app.post('/add-post', (req, res)=> {
    let { title, text, author } = req.body
    let post = new Post({ title, text, author })
    post.save()
    .then(()=> res.redirect('/posts'))
    .catch(()=> res.render(createPath('error')))
})


app.get('/about-us', (req, res)=> {
    res.redirect('/contacts')
})





app.use((req, res)=> {
    const title = 'error'
    res.status(404).render(createPath('error'), {title})
})