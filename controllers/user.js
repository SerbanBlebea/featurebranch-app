const express = require('express')
const { User } = require('./../database/models')
const { auth } = require('./../middleware/auth')

const router  = express.Router()


router.post('/signup', (request, response)=> {
    User.create({
        first_name: request.body.first_name,
        last_name:  request.body.last_name,
        phone:      request.body.phone,
        email:      request.body.email,
        password:   request.body.password
    }).then((user)=> {
        response.json({
            response: 'User was saved',
            model: user
        })
    }).catch((error)=> {
        console.log(error)
    })
})

router.post('/login', (request, response)=> {
    var email = request.body.email
    var password = request.body.password
    User.findByCredentials(email, password).then((user)=> {
        user.generateJWT().then((token)=> {
            response.header('x-auth', token).json(user)
        })
    }).catch((error)=> {
        response.status(400).send()
    })
})

router.get('/', (request, response)=> {
    if(request.query.email !== null)
    {
        User.findOne({ email: request.query.email }).then((user)=> {
            response.json({ model: user })
        }).catch((error)=> {
            console.log(error)
        })
    }
})


module.exports = router
