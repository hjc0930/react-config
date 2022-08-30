import React from 'react';
import { useAppDispatch, useAppSelector } from '@/stores/hooks';
import { increment, decrement, incrementByAmount } from '@/stores/counter';

const Home = () => {
  const count = useAppSelector(state => state.counter.value);
  const dispatch = useAppDispatch();

  return (
    <div>
      Home
      <p>{count}</p>
      <button onClick={() => {
        dispatch(increment())
      }}>Add</button>
      <button onClick={() => {
        dispatch(decrement())
      }}>Sub</button>
      <button onClick={() => {
        dispatch(incrementByAmount(10))
      }}>Increment</button>
    </div>
  );
};
export default Home