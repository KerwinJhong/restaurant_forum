const restService = require('../../services/restService.js')

let restController = {
  getRestaurants: (req, res) => {
    restService.getRestaurants(req, res, (data) => {
      return res.json(data)
    })
  },
  getRestaurant: (req, res) => {
    restService.getRestaurant(req, res, (data) => {
      return res.json(data)
    })
  },
  getFeeds: (req, res) => {
    restService.getFeeds(req, res, (data) => {
      return res.json(data)
    })
  },
  getTop: (req, res, callback) => {
    restService.getTop(req, res, (data) => {
      return res.json(data)
    })
  },
  resDashboard: (req, res) => {
    restService.resDashboard(req, res, (data) => {
      return res.json(data)
    })
  },
}
module.exports = restController