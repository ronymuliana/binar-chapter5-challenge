
const { v4: uuidv4 } = require('uuid');

const userRoutes = (app, fs) => {

    // variables
    const dataPath = './data/users.json';

    const { readFile, writeFile, bodyCheck } = require('./helpers')

    // READ all users
    app.get('/users', (req, res) => {
        readFile(data => {
            let users = JSON.parse(data);
            // we don't want to show users' passwords
            for (var id in users){
                users[id].password = '**********';
            }
            return res.status(200).send(users);
        });
    });

    // READ a specific user
    app.get('/users/:id', (req, res) => {
        readFile(data => {
            const userId = req.params.id;
            if (data[userId]){
                // delete data[userId].password;
                // we conceal the real passsword
                data[userId].password = '**********';
                return res.send(data[userId]);
            } else {
                return res.status(201).send(`Error: id ${userId} cannot be found!`);
            }
        },
            true);
    });

    // CREATE
    app.post('/users', (req, res) => {
        readFile(data => {
            // check if email already in database
            const email = req.body.email.toLowerCase();
            for (var id in data){
                if (data[id].email.toLowerCase() === email){
                    return res.status(201).send(`Error: email ${email} already exists in database!`);
                    return;
                }
            }                        

            // create a unique id
            const newUserId = uuidv4();
            // change email to lowercase
            req.body.email = req.body.email.toLowerCase();
            // add the new user
            data[newUserId.toString()] = req.body;

            writeFile(JSON.stringify(data, null, 2), () => {
                return res.status(201).send('new user added');
            });
        },
            true);
    });


    // UPDATE
    app.put('/users/:id', bodyCheck, (req, res) => {

        readFile(data => {
            const userId = req.params.id;
            const email = req.body.email.toLowerCase();

            // when changing email, we check for existing email in database
            if (data[userId].email.toLowerCase() != email){
                for (var key in data){
                    if (data[key].email.toLowerCase() === email){
                        return res.status(201).send('Error: email already exists in database!');
                        return;
                    }
                }    
            }
            data[userId] = { ...data[userId], ...req.body};

            writeFile(JSON.stringify(data, null, 2), () => {
                return res.status(200).send(`users id:${userId} updated`);
            });
        },
            true);
    });


    // DELETE
    app.delete('/users/:id', (req, res) => {

        readFile(data => {
            const userId = req.params.id;
            delete data[userId];

            writeFile(JSON.stringify(data, null, 2), () => {
                return res.status(200).send(`users id:${userId} removed`);
            });
        },
            true);
    });
};

module.exports = userRoutes;
