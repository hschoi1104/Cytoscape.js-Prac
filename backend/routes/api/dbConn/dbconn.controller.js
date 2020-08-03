const Cyjson = require('../../../models/Cyjson')

/*
    GET /api/cytoscape/list
*/

exports.getCyjson = (req, res) =>{
    Cyjson.find({})
    .then(
        cyjson=>{
            res.json({cyjson})
        }
    )
}

/*
    POST /api/cytoscape/list
*/

exports.writeCyjson = (req, res) =>{
    Cyjson.writeCyjson(req.cyjson)
}



