const  express = require('express');

/* Routes */
const workoutRoutes = require('./routes/Workouts.js')
const userRoutes = require('./routes/userRoutes.js')

/* Imports*/
const mongoose = require('mongoose')
const cors = require('cors');
require('dotenv').config()


/*Express app setup*/
const app = express();

app.use(cors({
    origin: ['http://localhost:3000'],
    credentials: true,
    sameSite: 'none'
   }));
app.use(express.json())
  


/*Route setup */
app.use('/api/workouts', workoutRoutes)
app.use('/api/user', userRoutes)







/*Connection to Mongodb database*/
mongoose.connect(process.env.CONNECTION_URL)
.then(()=>{
    app.listen(process.env.PORT, () =>{console.log('Listening on port', process.env.PORT)})
})
 .catch((error)=>console.log(error))

