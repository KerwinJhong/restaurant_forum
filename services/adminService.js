const db = require('../models')
const User = db.User
const Restaurant = db.Restaurant
const Category = db.Category
const imgur = require('imgur-node-api')
const IMGUR_CLIENT_ID = process.env.IMGUR_CLIENT_ID

const adminService = {
  getRestaurants: (req, res, callback) => {
    return Restaurant.findAll({ include: [Category] }).then(restaurants => {
      callback({ restaurants: restaurants })
    })
  },
  createRestaurant: (req, res, callback) => {
    Category.findAll().then(categories => {
      return callback({ categories: categories })
    })
  },
  getRestaurant: (req, res, callback) => {
    return Restaurant.findByPk(req.params.id, { include: [Category] }).then(restaurant => {
      callback({ restaurant: restaurant })
    })
  },
  editRestaurant: (req, res, callback) => {
    return Restaurant.findByPk(req.params.id).then(restaurant => {
      Category.findAll().then(categories => {
        return callback({ categories, restaurant })
      })
    })
  },
  postRestaurant: (req, res, callback) => {
    if (!req.body.name) {
      return callback({ status: 'error', message: "name didn't exist" })
    }
    const { file } = req
    if (file) {
      imgur.setClientID(IMGUR_CLIENT_ID);
      imgur.upload(file.path, (err, img) => {
        return Restaurant.create({
          name: req.body.name,
          tel: req.body.tel,
          address: req.body.address,
          opening_hours: req.body.opening_hours,
          description: req.body.description,
          image: file ? img.data.link : null,
          CategoryId: req.body.categoryId
        }).then((restaurant) => {
          callback({ status: 'success', message: "restaurant was successfully created" })
        })
      })
    } else {
      return Restaurant.create({
        name: req.body.name,
        tel: req.body.tel,
        address: req.body.address,
        opening_hours: req.body.opening_hours,
        description: req.body.description,
        image: null,
        CategoryId: req.body.categoryId
      }).then((restaurant) => {
        callback({ status: 'success', message: "restaurant was successfully created" })
      })
    }
  },
  putRestaurant: (req, res, callback) => {
    if (!req.body.name) {
      return callback({ status: 'error', message: "name didn't exist" })
    }

    const { file } = req
    if (file) {
      imgur.setClientID(IMGUR_CLIENT_ID);
      imgur.upload(file.path, (err, img) => {
        return Restaurant.findByPk(req.params.id)
          .then((restaurant) => {
            restaurant.update({
                name: req.body.name,
                tel: req.body.tel,
                address: req.body.address,
                opening_hours: req.body.opening_hours,
                description: req.body.description,
                image: file ? img.data.link : restaurant.image,
                CategoryId: req.body.categoryId
              })
              .then((restaurant) => {
                callback({ status: 'success', message: "restaurant was successfully update" })
              })
          })
      })
    } else {
      return Restaurant.findByPk(req.params.id)
        .then((restaurant) => {
          restaurant.update({
              name: req.body.name,
              tel: req.body.tel,
              address: req.body.address,
              opening_hours: req.body.opening_hours,
              description: req.body.description,
              image: restaurant.image,
              CategoryId: req.body.categoryId
            })
            .then((restaurant) => {
              callback({ status: 'success', message: "restaurant was successfully update" })
            })
        })
    }
  },
  deleteRestaurant: (req, res, callback) => {
    return Restaurant.findByPk(req.params.id)
      .then((restaurant) => {
        restaurant.destroy()
          .then((restaurant) => {
            callback({ status: 'success', message: '' })
          })
      })
  },
  editUsers: (req, res, callback) => {
    return User.findAll({
      order: [
        ['id', 'ASC']
      ]
    }).then(users => {
      return callback({ users: users })
    })
  },
  putUsers: (req, res, callback) => {
    return User.findByPk(req.params.id)
      .then((user) => {
        user.update({
          isAdmin: user.isAdmin ? false : true
        })
      })
      .then((user) => {
        callback({ status: 'success', message: "user was successfully to update" })
      })
  },
}

module.exports = adminService