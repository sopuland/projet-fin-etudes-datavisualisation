/*
 * users controller
 */

var User = require('../models/Users');

var newUser = {

    createUser: (req, res) => {
        var userData = req.body.user;
        var createNewUser = new User ({

            enterprise: userData.enterprise,
            contactFirstname: userData.firstname,
            contactLastname: userData.lastname,
            email: userData.email,
            password: userData.password,
            status: userData.status,
            endengagement: userData.endengagement,
            videocam: []
        }
        );
        createNewUser.save((error) => {
            if(error) {
                res.status(500).json({message: "Oups ! Une erreur s'est produite."});
                return;
            }
            res.json({message: "Le client est enregistré."});
        });
    },

}

module.exports = newUser;