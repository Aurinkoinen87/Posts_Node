const express = require('express')
const app = express()
const mongoose = require('mongoose')
const path = require('path')



const PORT = 7000

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
    const contacts = [
        {name: 'Google', link: 'http://google.com', id: 1},
        {name: 'Yandex', link: 'http://yandex.ru', id: 2},
        {name: 'Youtube', link: 'http://youtube.com', id: 3},
    ]
    res.render(createPath('contacts'), {contacts, title})
})

app.get('/posts', (req, res)=> {
    const title = 'posts'
    res.render(createPath('posts'), {title})
})

app.get('/posts/:id', (req, res)=> {
    res.render(createPath('post'))
})

app.get('/add-post', (req, res)=> {
    res.render(createPath('add-post'))
})

app.get('/about-us', (req, res)=> {
    res.redirect('/contacts')
})


app.use((req, res)=> {
    const title = 'error'
    res.status(404).render(createPath('error'), {title})
})