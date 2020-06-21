/*
 * myAccount controller
 */

var Users = require('../models/Users');

var myAccount = {

    displayMyAccount: (req, res) => {

        if(req.user) {

            res.json({
                enterprise: req.user.enterprise,
                contactFirstname: req.user.firstname,
                contactLastname: req.user.lastname,
                email: req.user.email,
                status: req.user.status,
                endengagement: req.user.endengagement,
                videocam: req.user.videocam
            });
        }
        else {
            res.status(401).end();
            
        }
    }
}

module.exports = myAccount;