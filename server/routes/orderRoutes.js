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

//Updates the specified order in the database and sets its returned attribute to true
router.put('/orders/:orderId/returned', async (req, res) => {
  await Order.updateOne({ _id: req.params.orderId }, { returned: true });
  res.json({ message: 'Order marked as returned' });
});

//that returns a list of all overdue orders for the specified user. This route uses the find method of the Order model to query the database for all orders that belong to the specified user, have an end date that is before the current date, and have not been returned.
router.get('/orders/overdue/:userId', async (req, res) => {
  const overdueOrders = await Order.find({
    userId: req.params.userId,
    endDate: { $lt: new Date() },
    returned: false
  })
  .populate('userId', 'name') // populate the user field with the user's name
  .populate('products'); // populate the products field with product documents

  res.json(overdueOrders);
});



module.exports = router
