const db = require('../models')
const Restaurant = db.Restaurant
const Category = db.Category
const pageLimit = 10
const Comment = db.Comment
const User = db.User
const Favorite = db.Favorite
const restService = require('../services/restService.js')

let restController = {
  getRestaurants: (req, res) => {
    restService.getRestaurants(req, res, (data) => {
      return res.render('restaurants', data)
    })
  },
  getRestaurant: (req, res) => {
    restService.getRestaurant(req, res, (data) => {
      return res.render('restaurant', data)
    })
  },
  getFeeds: (req, res) => {
    restService.getFeeds(req, res, (data) => {
      return res.render('feeds', data)
    })
  },
  getTop: (req, res) => {
    restService.getTop(req, res, (data) => {
      return res.render('topRes', data)
    })
  },
  resDashboard: (req, res) => {
    restService.resDashboard(req, res, (data) => {
      return res.render('resDashboard', data)
    })
  }
}
module.exports = restController