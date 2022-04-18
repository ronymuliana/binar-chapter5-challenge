const userRoutes = require('./users');
const authRoutes = require('./auth');

const appRouter = (app, fs) => {

    app.get('/', (request,res) => {
        return res.render('index');
    })

    app.get('/games', (request,res) => {
        return res.render('games/index');
    })

    app.get('/login', (request, res) => {
        return res.render('login')
    })

    app.get('/signup', (request, res) => {
        return res.render('signup')
    })
    userRoutes(app, fs);
    authRoutes(app, fs);
};

module.exports = appRouter;