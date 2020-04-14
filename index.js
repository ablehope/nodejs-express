const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const Handlebars = require('handlebars')
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')
const exphbs = require('express-handlebars');
const app = express();
const homeRoutes = require('./routes/home');
const cardRoutes = require('./routes/card');
const addRoutes = require('./routes/add');
const coursesRoutes = require('./routes/courses');
const User = require('./models/user');

const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs',
    handlebars: allowInsecurePrototypeAccess(Handlebars)
})

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', 'views');

app.use(async (req, res, next) => {
    try {
        const user = await User.findById('5e949fe2e05d8a095089ae9e');
        req.user = user;
        next();
    } catch(e) {
        console.log(e);
    }
})

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: true}))
app.use('/', homeRoutes);
app.use('/add', addRoutes);
app.use('/courses', coursesRoutes);
app.use('/card', cardRoutes);

const PORT = process.env.PORT || 3000

async function start() {
    try {
        const url = `mongodb+srv://alexander:qeGGecEKFu3FtcPy@cluster0-kmwt5.mongodb.net/shop`;
        await mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
            });

            const candidate = await User.findOne();
            if (!candidate) {
                const user = new User({
                    email: 'sasha@gmail.com',
                    name: 'sasha',
                    cart: {items: []}
                })
                await user.save()
            }
    
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        })
    } catch (e) {
        console.log(e);
    }
}

start();