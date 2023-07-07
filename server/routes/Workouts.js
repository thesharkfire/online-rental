
const  express = require('express');
const {
    createWorkout,
    getWorkouts,
    getWorkout,
    deleteWorkout,updateWorkout, searchWorkout
} = require('../controllers/WorkoutController')

const requireAuth = require('../middleware/requireAuth')

const router = express.Router();

router.use(requireAuth)

router.get('/',getWorkouts);

router.get('/:id',getWorkout);


router.post('/', createWorkout);




router.delete('/:id',deleteWorkout);

router.patch('/:id',updateWorkout);

router.get('/s',searchWorkout);



module.exports = router
