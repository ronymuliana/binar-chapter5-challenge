
    const fs = require('fs');
    const dataPath = './data/users.json';

   // helper methods
   const readFile = (
       callback,
       returnJson = false,
       filePath = dataPath,
       encoding = 'utf8'
       ) => {
       fs.readFile(filePath, encoding, (err, data) => {
           if (err) {
           throw err;
           }

           callback(returnJson ? JSON.parse(data) : data);
       });
   };
   
   const writeFile = (
       fileData,
       callback,
       filePath = dataPath,
       encoding = 'utf8'
       ) => {
       fs.writeFile(filePath, fileData, encoding, err => {
           if (err) {
           throw err;
           }

           callback();
       });
   };

   const bodyCheck = (req, res, next) => {
        // check the body
        if (req.method=="POST"){
            if (!req.body.first_name || req.body.first_name === ""){
                res.status(400).send("Error: First Name is mandatory");
                return;
            }
            if (!req.body.email || req.body.email === ""){
                res.status(400).send("Error: Please provide email");
                return;
            }
            if (!req.body.password || req.body.password === ""){
                res.status(400).send("Error: Password is required and cannot be blank");
                return;
            }
        }
        if (req.method == "PUT"){
            if (req.body.first_name === ""){
                res.status(400).send("Error: First Name is mandatory");
                return;
            }
            if (req.body.email === ""){
                res.status(400).send("Error: Please provide email");
                return;
            }
            if (req.body.password === ""){
                res.status(400).send("Error: Password is required and cannot be blank");
                return;
            } 
        }
        next();
   };

module.exports = { readFile, writeFile, bodyCheck } 