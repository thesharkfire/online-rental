const express = require('express')
const UserTwo = require('../models/userModel.js')

const router = express.Router()

router.post('/orders', async (req, res) => {
  const newOrder = new Order(req.body);
  await newOrder.save();

  // Update the user document
  await UserTwo.updateOne({ _id: req.body.userId }, { $push: { orders: newOrder } });

  res.json(newOrder);
});


module.exports = router
