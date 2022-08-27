import Posts from './pages/Posts';
import { useDispatch, useSelector } from 'react-redux'
import { fetchPosts } from '@/stores/posts'
import Home from './pages/Home';
import { useEffect, useState } from 'react';

function App() {
  const [loading, setLoading] = useState(false);

  return <>
    <button onClick={() => setLoading(val => !val)}>Switch</button>
    {
      loading ? <Posts /> : <Home />
    }
  </>
}

export default App;