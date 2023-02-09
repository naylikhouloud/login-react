const express = require('express');
const router = express.Router();
const db  = require('./dbConnection');
const { signupValidation, loginValidation } = require('./validation');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
 
 
router.post('/login', loginValidation, (req, res, next) => {
  db.query(
    `SELECT * FROM users WHERE email = ${db.escape(req.body.username)};`,
    (err, result) => {
      // user does not exists
      if (err) {
        throw err;
        return res.status(400).send({
          msg: err
        });
      }
      if (!result.length) {
        return res.status(401).send({
          msg: 'Email or password is incorrect!'
        });
      }
      // check password

      
          // wrong password
        
          if (req.body.password == result[0]['password']) {
            const token = jwt.sign({id:result[0].id},'the-super-strong-secrect',{ expiresIn: '1h' });
            /*db.query(
              `UPDATE users SET last_login = now() WHERE id = '${result[0].id}'`
            );*/
            return res.status(200).send({
              msg: 'Logged in!',
              token,
              user: result[0]
            });
          }
          return res.status(401).send({
            msg: 'Username or password is incorrect!'
          });
       
    }
  );
})
// user registration
router.post('/register', function(req, res, next){    
    
    var user = {
    name: req.body.lastName,
    email: req.body.username,
    password : req.body.password
    
    }
    db.query('INSERT INTO users SET ?', user, function(err, result) {
    //if(err) throw err
    if (err) {
        return res.status(401).send({
            msg: err
          });
    } else {                
        return res.status(401).send({
            msg: 'Register Done !'
          });
    }
    })
  
    })
 
module.exports = router;