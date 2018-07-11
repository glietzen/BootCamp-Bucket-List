const db = require('../models');

module.exports = {
    findUser: function(req,res) {
        db.Users
            .findById(req.params.id)
            .populate({
                path: 'list',
                populate: {
                    path: 'Items',
                    model: 'Item'
                }
            })
            .then(dbItem => res.json(dbItem))
            .catch(err => res.status(422).json(err))
    },
    findById: function(req, res) {
        db.Lists
            .findById(req.params.id)
            .populate('items')
            .then(dbItem => res.json(dbItem))
            .catch(err => res.status(422).json(err));
    },
    create: function(req, res) {
        db.Items
            .create(req.body)
            .then((listitem) => {
                let listID = req.body.listId;
                return db.Lists.findByIdAndUpdate(listID, {$push: {items: listitem._id}}, {new: true})
            })
            .then(dbItem => res.json(dbItem))
            .catch(err => res.status(422).json(err));
    },
    createList: function(req, res) {
        db.Lists
            .create(req.body)
            .then((userList) => {
                let __id__ = req.body.userId;
                return db.Users.findByIdAndUpdate(__id__, {$push: {list: userList._id}}, {new:true})
            })
            .then(dbItem => res.json(dbItem))
            .catch(err => res.status(422).json(err));
    },
    update: function(req, res) {
        db.Items
            .findOneAndUpdate({_id: req.params.id }, req.body)
            .then(dbItem => res.json(dbItem))
            .catch(err => res.status(422).json(err));
    },
    remove: function(req, res) {
        db.Items
            .findById({ _id: req.params.id })
            .then(dbItem => dbItem.remove())
            .then(dbItem => res.json(dbItem))
            .catch(err => res.status(422).json(err));
    }
};