const express=  require('express')
const app = express();
const Article =require('./models/article')
const articleRouter = require('./routes/article')
const methodoverride = require('method-override')
app.set('view engine','ejs')
app.use(express.static("public"));
app.use(express.urlencoded({ extended : false}))
app.use(methodoverride('_method'))
app.use('/article',articleRouter)

app.get('/',async(req,res)=>{
    const articles = await Article.find().sort({createdon : 'desc'})
    res.render('articles/index',{articles : articles})
})
// console.log(__dirname + '/public')
app.listen(3000)