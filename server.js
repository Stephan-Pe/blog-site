const express = require('express')
// https://mongoosejs.com/docs/index.html
const mongoose = require('mongoose')
const Article = require('./models/article')
const articleRouter = require('./routes/articles')
const methodOverride = require('method-override')
const app = express()

mongoose.connect('mongodb://localhost/blog',{ useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
// setup view engine

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false}))
app.use(methodOverride('_method'))


app.get('/', async (req, res) => {
const articles = await Article.find().sort({ createdAt:'desc'})

    res.render('articles/index', { articles: articles })
})
app.use('/articles', articleRouter)

app.listen(5000)
