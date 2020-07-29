const express = require('express')
const router = express.Router();
const Article =require('./../models/article')
const mongoose =require('mongoose')
mongoose.connect('mongodb://localhost/blog', { useNewUrlParser: true , useUnifiedTopology: true })
 
router.get('/new',(req,res)=>{
    res.render('articles/new')
})
router.get('/edit/:id',async(req,res)=>{
    const article = await Article.findById(req.params.id)
    res.render('articles/edit',{article : article})
})
router.get('/:id',async(req,res)=>{
    const savedarticle=  await Article.findById(req.params.id);
    if(savedarticle==null)
    res.redirect('/')
    res.render('articles/show',{article : savedarticle})
})

router.post('/',async(req,res)=>{
    let article = new Article({
        title : req.body.title,
        description : req.body.description,
        markdown : req.body.markdown,

    })
    try{
     article = await article.save()

     res.redirect(`/article/${article.id}`)
    }
    catch(e){
          console.log(e)
    }
})

router.delete('/:id',async(req,res)=>{
    try{
    await Article.findByIdAndDelete(req.params.id)
    }
    catch(e){
        console.log(e);
    }
    res.redirect('/')
})




module.exports = router;