/*
 * Device controller
 */

var catalog = {

    displayDevice: (req,res) => {

        if(req.user) {
            var id = req.body.id;

            // .filter = .map qui renvoit un tableau des éléments qui répondent true à la requête
            // [0] = précise que je ne veux que le premier élément qui matche

            var device = req.user.videocam.filter((device) => (device.id == id))[0];
            
            if(device) {

                res.json({
                    idVideocam: device.id,
                    videocam: device.name,
                    lat: device.lat,
                    long: device.long
                });
            }
            else {
                res.status(404).end();
                
            }

        }
        else {
            res.status(401).end();
        }

    },

}

module.exports = catalog;