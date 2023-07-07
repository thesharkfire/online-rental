// src/features/counter/Counter.js
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { increment, decrement } from '../redux/counter';
import WorkoutDetails from '../components/WorkoutDetails';
import WorkoutForm from '../components/WorkoutForm';
import { setWorkouts } from '../redux/WorkoutsSlice';


const Home = () => {
  const dispatch = useDispatch();
  const count = useSelector((state) => state.counter);
  //New
 // const [workouts, setWorkouts] = useState(null);

  const workouts = useSelector((state) => state.workouts);


  useEffect(() => {

    const fetchWorkouts = async() =>{
      const response = await fetch('http://localhost:5000/api/workouts/')
      const json = await response.json()
      if(response.ok){
        dispatch(setWorkouts(json));
      }
    }
    fetchWorkouts()

  }, [dispatch]);

  return (
    <div>
    <div>
      <button onClick={() => dispatch(decrement())}>-</button>
      <span>{count}</span>
      <button onClick={() => dispatch(increment())}>+</button>
    </div>
     {/*New */}
     <WorkoutForm />
    <div className = "workouts">
        {workouts && workouts.map((workout) => (
            <WorkoutDetails key = {workout._id} workout ={workout} />

                      ))}
    </div>
    </div>
        );
};

export default Home;
