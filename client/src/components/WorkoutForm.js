import React, { useState } from 'react';
//Makes use of Signup page css, since they are so similar
import '../pages/Signup.css';
import { createWorkout } from '../redux/WorkoutsSlice';
import { useSelector, useDispatch } from 'react-redux';

const WorkoutForm = () => {
  const [title, setTitle] = useState('');
  const [load, setLoad] = useState('');
  const [reps, setReps] = useState('');
  const[error, setError] = useState(null)

  const dispatch = useDispatch();
  const workouts = useSelector((state) => state.workouts);
  const user = useSelector((state) => state.auth.user)

        const handleSubmit = async (e) =>{
          e.preventDefault()

          if(!user){
            setError('You must be logged in')
            console.log('You must be logged in to add')
            return
          }

          const workout = {title, load, reps}
          const response = await fetch('http://localhost:5000/api/workouts/',{
            method: 'POST',
            body: JSON.stringify(workout),
            headers: {
              'Content-Type':'application/json',
              'Authorization': `Bearer ${user.token}`
            }
          })

          const json = await response.json()

          if(!response.ok){
            setError(json.error)

          }

          if(response.ok){
            dispatch(createWorkout(json))
            setTitle('')
            setLoad('')
            setReps('')
            setError(null)
            console.log('New workout added',json)

          }


        }

  return (
    <form onSubmit={handleSubmit}>

      <h3>Add a New workout</h3>

      <div>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          placeholder = "Title"
          onChange={(event) => setTitle(event.target.value)}
        />
      </div>
      <div>
        <label htmlFor="load">Load:</label>
        <input
          type="number"
          id="load"
          value={load}
          placeholder = "Load"
          onChange={(event) => setLoad(event.target.value)}
        />
      </div>
      <div>
        <label htmlFor="reps">Reps:</label>
        <input
          type="number"
          id="reps"
          value={reps}
          placeholder = "Reps"
          onChange={(event) => setReps(event.target.value)}
        />
      </div>
      <button type="submit">Add Workout</button>
    </form>
  );
};

export default WorkoutForm;
