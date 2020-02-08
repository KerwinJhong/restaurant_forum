const bcrypt = require('bcrypt-nodejs')
const db = require('../models')
const IMGUR_CLIENT_ID = process.env.IMGUR_CLIENT_ID
const fs = require('fs')
const imgur = require('imgur-node-api')
const User = db.User
const Restaurant = db.Restaurant
const Comment = db.Comment
const Favorite = db.Favorite
const Like = db.Like
const Followship = db.Followship

const userController = {
  getUser: (req, res, callback) => {
    const authUser = req.user.id
    return User.findByPk(req.params.id, {
        include: [
          { model: Comment, include: [Restaurant] },
          { model: User, as: "Followers" },
          { model: User, as: "Followings" },
          { model: Restaurant, as: "FavoritedRestaurants" }
        ]
      })
      .then(profile => {
        const data = profile.Comments.map(r => (r.Restaurant.dataValues))
        return callback({
          authUser: authUser,
          restaurants: data,
          profile: profile,
          followers: profile.Followers,
          followings: profile.Followings,
          favoritedRestaurants: profile.FavoritedRestaurants
        })
      })
  },
  editUser: (req, res, callback) => {
    User.findByPk(req.params.id).then(user => {
      if (req.user.id === user.id) {
        return callback({ user: user })
      } else {
        return callback({ status: 'error', message: `You are not authorized to access other user's profile` })
      }
    })
  },
  putUser: (req, res, callback) => {
    const { file } = req
    const authUser = req.user.id
    if (authUser !== Number(req.params.id)) {
      return callback({ status: 'error', message: `You are not authorized to access other user's profile` })
    }
    if (file) {
      imgur.setClientID(IMGUR_CLIENT_ID);
      imgur.upload(file.path, (err, img) => {
        return User.findByPk(req.params.id)
          .then((user) => {
            user.update({
                name: req.body.name,
                image: file ? img.data.link : user.image,
              })
              .then((user) => {
                callback({ status: 'success', message: 'user was successfully to update' })
              })
          })
      })
    } else {
      return User.findByPk(req.params.id)
        .then((user) => {
          user.update({
              name: req.body.name,
              image: user.image,
            })
            .then((user) => {
              callback({ status: 'success', message: 'user was successfully to update' })
            })
        })
    }
  },
  addFavorite: (req, res, callback) => {
    return Favorite.create({
        UserId: req.user.id,
        RestaurantId: req.params.restaurantId
      })
      .then((restaurant) => {
        return callback({ status: 'success', message: '' })
      })
  },

  removeFavorite: (req, res, callback) => {
    return Favorite.findOne({
        where: {
          UserId: req.user.id,
          RestaurantId: req.params.restaurantId
        }
      })
      .then((favorite) => {
        favorite.destroy()
        callback({ status: 'success', message: '' })
      })
  },
  addLike: (req, res, callback) => {
    return Like.create({
        UserId: req.user.id,
        RestaurantId: req.params.restaurantId
      })
      .then((restaurant) => {
        callback({ status: 'success', message: '' })
      })
  },

  removeLike: (req, res, callback) => {
    return Like.findOne({
        where: {
          UserId: req.user.id,
          RestaurantId: req.params.restaurantId
        }
      })
      .then((Like) => {
        Like.destroy()
          .then((restaurant) => {
            callback({ status: 'success', message: '' })
          })
      })
  },
  getTopUser: (req, res, callback) => {
    // 撈出所有 User 與 followers 資料
    return User.findAll({
      include: [
        { model: User, as: 'Followers' }
      ]
    }).then(users => {
      // 整理 users 資料
      users = users.map(user => ({
          ...user.dataValues,
          // 計算追蹤者人數
          FollowerCount: user.Followers.length,
          // 判斷目前登入使用者是否已追蹤該 User 物件
          isFollowed: req.user.Followings.map(d => d.id).includes(user.id)
        }))
        // 依追蹤者人數排序清單
      users = users.sort((a, b) => b.FollowerCount - a.FollowerCount)
      const authUser = req.user.dataValues.id
      console.log(authUser)
      return callback({ users, authUser })
    })
  },
  addFollowing: (req, res, callback) => {
    return Followship.create({
        followerId: req.user.id,
        followingId: req.params.userId
      })
      .then((followship) => {
        return callback({ status: 'success', message: '' })
      })
  },

  removeFollowing: (req, res, callback) => {
    return Followship.findOne({
        where: {
          followerId: req.user.id,
          followingId: req.params.userId
        }
      })
      .then((followship) => {
        followship.destroy()
          .then((followship) => {
            return callback({ status: 'success', message: '' })
          })
      })
  }
}

module.exports = userController