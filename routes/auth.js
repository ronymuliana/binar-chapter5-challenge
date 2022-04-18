
const authRoutes = (app, fs) => {
    const { readFile } = require('./helpers');

    app.post('/auth', (req, res) => {
        readFile(data => {
            const email = req.body.email.toLowerCase();
            // check if email already in database
            for (var key in data){
                if (data[key].email.toLowerCase() === email){
                    if (data[key].password === req.body.password){
                        res.status(200).send('Authentication successful');
                    } else {
                        res.status(401).send('Error: Wrong password');
                    }
                    return;
                }
            }
            res.status(403).send('Error: email not registered');
            return;                        
        },
            true);
    });
}

module.exports = authRoutes;
