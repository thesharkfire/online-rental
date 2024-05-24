// src/features/counter/Counter.js
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { increment, decrement } from '../redux/counter';
import WorkoutDetails from '../components/WorkoutDetails';
import WorkoutForm from '../components/WorkoutForm';
import WorkoutList from '../components/WorkoutList'



const Home = () => {
  const dispatch = useDispatch();
  const count = useSelector((state) => state.counter);
  const userId = useSelector((state) => state.auth.userId);



  return (
    <div>
    <div>
      <button onClick={() => dispatch(decrement())}>-</button>
      <span>{count}</span>
      <button onClick={() => dispatch(increment())}>+</button>
    </div>
     {/*New */}
     {userId && <div>User ID: {userId}</div>}
     <WorkoutForm />
     <div>
     <WorkoutList />
     </div>
    </div>
        );
};

export default Home;
