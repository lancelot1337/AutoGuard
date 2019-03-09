const Car = require('../models/car')
const Flat = require('../models/flat')
// const CarFlat = require('../models/carflat')
const mongoose = require('mongoose');

exports.orders_get_all = (req, res, next) => {
    Car.find()
        .select('carNo flat _id')
        .populate('flat', 'name')    //name of ref prop, name of keys
        .exec()
        .then(docs => {
            res.status(200).json({
                count: docs.length,
                orders: docs.map(doc => {
                    return {
                        _id: doc._id,
                        carNo: doc.carNo,
                        flat: doc.flat,
                        request: {
                            type: 'GET',
                            url: 'http://localhost:3000/orders/' + doc._id
                        }
                    }
                })
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
};

exports.orders_post = (req, res, next) => {
    Flat.findById(req.body.flat)
        .then(flat => {
            if (!flat) {
                return res.status(404).json({
                    message: "Wrong productId"
                });
            }
            const order = new Car({
                _id: new mongoose.Types.ObjectId,
                carNo: req.body.carNo,
                flat: req.body.flat
            });
            return order
                .save()
        })
        .then(result => {
            console.log(result)
            res.status(201).json({
                message: "Car saved",
                createdOrder: {
                    _id: result._id,
                    carNo: result.carNo,
                    flat: result.flat
                },
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/orders/' + result._id
                }
            })
        })
        .catch(err => {
            console.log(`..............`, err);
            res.status(500).json({
                error: err
            });
        });
};

exports.orders_get_single = (req, res, next) => {
    const id = req.params.id;
    Car.findById(id)
        .populate('flat')
        .exec()
        .then(order => {
            if (!order) {
                return res.status(404).json({
                    message: "Car not found"
                });
            }
            res.status(200).json({
                order: order,
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/orders'
                }
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
};

exports.orders_delete_single = (req, res, next) => {
    Car.remove({ _id: req.params.id })
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Car deleted',
                request: {
                    type: 'POST',
                    url: 'http://localhost:3000/orders',
                    body: {
                        productId: 'ID',
                        quantity: 'Number'
                    }
                }
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
};