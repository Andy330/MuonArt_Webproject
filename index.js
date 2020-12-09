const express= require('express')
const path = require('path')
const expressLayouts = require('express-ejs-layouts')

const app = new express()
const ejs = require('ejs')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const User = require('./models/User.js')
const Post = require('./models/Post.js')

const newPostController = require('./controllers/newPost')
const storePostController = require('./controllers/storePost')
const validateMiddleware = require("./middleware/validateMiddleware");

const getUserController = require('./controllers/getUser')
const getPostController = require('./controllers/getPost')
const newUserController = require('./controllers/newUser')
const storeUserController = require('./controllers/storeUser')
const loginController = require('./controllers/login')
const loginUserController = require('./controllers/loginUser')
const expressSession = require('express-session');
const logoutController = require('./controllers/logout')

const searchPosts = require('./controllers/postsSearch')
const searchShow = require('./controllers/showSearch')

const authMiddleware = require('./middleware/authMiddleware');
const redirectIfAuthenticatedMiddleware = require('./middleware/redirectIfAuthenticatedMiddleware')

const flash = require('connect-flash');

const fileUpload = require('express-fileupload')
app.use(fileUpload())

mongoose.connect('mongodb://localhost/myweb', {useUnifiedTopology: true, useNewUrlParser: true});
app.use(bodyParser.json())
mongoose.set('useCreateIndex', true)
app.use(bodyParser.urlencoded({extended:true}))

app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use('/css', express.static(__dirname + 'public/css'));
app.use(expressLayouts)

app.listen(2020, ()=> {
	console.log('App is listenning');
})

app.use(expressSession({
    secret: 'keyboard cat'
}))

global.loggedIn = null;

app.use("*", (req, res, next) => {
    loggedIn = req.session.userId;
    next()
});

app.use(flash());

app.use('/posts/store',validateMiddleware)
app.get('/posts/create',newPostController)
app.get('/post/:id',getPostController)
app.post('/posts/store', storePostController)

app.post('/search', searchPosts)
app.get('/posts/search', searchShow)

app.get('/auth/register', redirectIfAuthenticatedMiddleware, newUserController)
app.post('/users/register', redirectIfAuthenticatedMiddleware, storeUserController)
app.get('/auth/login', redirectIfAuthenticatedMiddleware, loginController);
app.get('/auth/logout', logoutController)
app.post('/users/login', redirectIfAuthenticatedMiddleware,loginUserController)


app.get('/register',(req,res)=>{
	res.render('register');
})

app.get('/posts/search',(req,res)=>{
    res.render('search');
})

app.get('/Allcats',(req,res)=>{
	res.render('Allcats');
})

app.get('/animation',(req,res)=>{
	res.render('animation');
})

app.get('/create',(req,res)=>{
    res.render('create');
})


app.get('/profile', async (req,res)=>{
    var id = loggedIn;
	const posts = await Post.find({userid:id}).populate('userid');
    //console.log(posts)
    res.locals.posts = posts;
    const user = await User.findById(id)
    //console.log(user)
    res.locals.user = user;
    const data = res.locals;

    console.log(res.locals);

    res.render('profile',{
        data
    });
})

app.get('/recent', async (req,res)=>{
	const posts = await Post.find({}).populate('userid');
    console.log(posts);

    res.render('recent',{
        posts
    });
})


app.get('/', async (req,res)=>{
	res.render('muon');
	console.log(req.session);
/*
	var id = loggedIn;
    const posts = await Post.find({userid:id});
    console.log(posts)
    */
})

app.post('/posts/store', (req,res)=>{
    let image = req.files.image;
    image.mv(path.resolve(__dirname,'public/img',image.name),async (error)=>{
        await Post.create({
            ...req.body,
            image: '/img/' + image.name
        })
        res.redirect('/')
    })
})
