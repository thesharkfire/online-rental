import React, { useState }from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { deleteWorkout } from '../redux/WorkoutsSlice';


function WorkoutDetails({workout}) {
  /////////////
  const dispatch = useDispatch();
  const workouts = useSelector((state) => state.workouts);
  const[error, setError] = useState(null)
  const user = useSelector((state) => state.auth.user)

  const handleClick = async (e) =>{
    e.preventDefault()

    if(!user){
      console.log('You must be logged in to delete')
      setError('You must be logged in')
      return
    }
    
    const response = await fetch(`http://localhost:5000/api/workouts/${workout._id}`,{
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
      
    })

    const json = await response.json()//DElete this later

    if(!response.ok){
      setError(json.error)

    }

    if(response.ok){
      dispatch(deleteWorkout(workout._id))  
      console.log('Workout deleted',response)

    }


  }
  /////////////
  
  return (
    <div>
        <h4>{workout.title} </h4>
          <p><strong> Load: </strong> {workout.load}</p>
          <p><strong> Reps:</strong>{workout.reps} </p>
          <p>{workout.createdAt} </p>
          <button onClick={handleClick}> delete </button>
    </div>
  )
}

export default WorkoutDetails