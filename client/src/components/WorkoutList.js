import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import WorkoutDetails from './WorkoutDetails';
import { setWorkouts } from '../redux/WorkoutsSlice';

const WorkoutList = () => {
  const dispatch = useDispatch();

  //Get user
       const user = useSelector((state) => state.auth.user);

    //New
   // co nst [workouts, setWorkouts] = useState(null);
  const workouts = useSelector((state) => state.workouts);


  useEffect(() => {

    const fetchWorkouts = async() =>{
      const response = await fetch('http://localhost:5000/api/workouts/',{
        headers:{
          'Authorization': `Bearer ${user.token}`
        }
      })
      const json = await response.json()
      if(response.ok){
        dispatch(setWorkouts(json));
      }
    }
    if(user){
    fetchWorkouts()//Remove if user to be regular
  }

  }, [dispatch, user]);


  return (
  <>

  <div className = "workouts">
      {workouts && workouts.map((workout) => (
          <WorkoutDetails key = {workout._id} workout ={workout} />

                    ))}
  </div>

  </>
  );
}

export default WorkoutList;
