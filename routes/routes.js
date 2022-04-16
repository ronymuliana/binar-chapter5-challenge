const userRoutes = require('./users');
const authRoutes = require('./auth');

const appRouter = (app, fs) => {

    app.get('/', (request,response) => {
        response.render('index');
    })

    app.get('/games', (request,response) => {
        response.render('games/index');
    })

    app.get('/login', (request, response) => {
        response.render('login')
    })

    app.get('/signup', (request, response) => {
        response.render('signup')
    })
    userRoutes(app, fs);
    authRoutes(app, fs);
};

module.exports = appRouter;