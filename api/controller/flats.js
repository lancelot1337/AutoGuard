const mongoose = require('mongoose');
const Flat = require('../models/flat')

exports.products_get_all = (req, res, next) => {
    Flat.find()
        .select('_id name phNo hNo vNo')
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                flats: docs.map(doc => {
                    return {
                        _id: doc._id,
                        name: doc.name,
                        phNo: doc.phNo,
                        hNo: doc.hNo,
                        vNo: doc.vNo,
                        request: {
                            type: 'GET',
                            url: 'http://localhost:3000/api/flat/' + doc._id
                        }
                    }
                })
            }
            // if(docs.length >= 0){
            res.status(200).json(response);
            // } else{
            // 	res.status(404).json({message: "No entires found"})
            // }		
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
};


exports.products_post = (req, res, next) => {
    // console.log(req.file);
    const flat = new Flat({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        phNo: req.body.phNo,
        hNo: req.body.hNo,
        vNo: req.body.vNo
    });
    flat.save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: "Created flat successfully",
                createdProduct: {
                    _id: result._id,
                    name: result.name,
                    phNo: result.phNo,
                    hNo: result.hNo,
                    vNo: result.vNo,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/api/flat/' + result._id
                    }
                }

            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
};

exports.products_get_single = (req, res, next) => {
    const id = req.params.id;
    Flat.findById(id)
        .select('_id name phNo hNo vNo')
        .exec()
        .then(doc => {
            console.log(`From DB: ${doc}`);
            if (doc) {
                res.status(200).json({
                    flat: doc,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/api/flat'
                    }
                });
            } else {
                res.status(404).json({ message: "Requested data not found" });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
};

exports.flats_patch = (req, res, next) => {
    const id = req.params.id;
    const updateOps = {};
    for (const key in req.body) {		//or const key of Object.keys(req.body)
        updateOps[key] = req.body[key];
    }

    Flat.update({ _id: id }, {
        $set: updateOps
    })
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json({
                message: "Flat updated",
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/api/flat' + id
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
};

exports.products_delete = (req, res, next) => {
    const id = req.params.id;
    Flat.remove({ _id: id })
        .exec()
        .then(result => {
            res.status(200).json({
                message: "Flat deleted!",
                request: {
                    type: 'POST',
                    url: 'http://localhost:3000/api/flat',
                    // body: {
                    //     name: 'String',
                    //     price: 'Number'
                    // }
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.send(500).json({ error: err });
        });
};