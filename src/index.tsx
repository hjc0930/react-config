import { createRoot } from "react-dom/client";
import App from "./App";
import store from "./stores";
import { fetchPosts } from "./stores/posts";
import { Provider } from "react-redux";

store.dispatch(fetchPosts());

const root = document.getElementById("root")!;
const app = createRoot(root);

app.render(
  <Provider store={store}>
    <App />
  </Provider>
);
