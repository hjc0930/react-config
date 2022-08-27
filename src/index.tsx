import { createRoot } from 'react-dom/client';
import App from './App';
import store from './stores';
import { fetchPosts } from './stores/posts';
import { Provider } from 'react-redux'

store.dispatch(fetchPosts())

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <App />
  </Provider>
);