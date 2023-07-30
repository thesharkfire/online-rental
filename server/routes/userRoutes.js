const express = require('express')

const{loginUser, signupUser, signupAdmin} = require('../controllers/userController')


const router = express.Router()

//login route
router.post('/login', loginUser)

//signup route

router.post('/signup', signupUser)

//admin signup router
router.post('/signup/admin', signupAdmin)

//A PUT route for /:userId/suspend that updates the specified user in the database and sets their suspended attribute to true.
router.put('/:userId/suspend', async (req, res) => {
  await UserTwo.updateOne({ _id: req.params.userId }, { suspended: true });
  res.json({ message: 'User account suspended' });
});


//A PUT route for /:userId/unsuspend that updates the specified user in the database and sets their suspended attribute to false
router.put('/:userId/unsuspend', async (req, res) => {
  await UserTwo.updateOne({ _id: req.params.userId }, { suspended: false });
  res.json({ message: 'User account unsuspended' });
});

//A GET route for /overdue that returns a list of all users with overdue orders. This route uses the find method of the UserTwo model to query the database for all users that have at least one order that has not been returned. The populate method is used to include the order data in the response.
router.get('/overdue', async (req, res) => {
  const usersWithOverdueOrders = await UserTwo.find({ 'orders.returned': false }).populate('orders');
  res.json(usersWithOverdueOrders);
});



module.exports = router
