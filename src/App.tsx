import Routers from "./routers";
import { RootStore, StoreContext } from "./stores";
import { observer } from "mobx-react-lite";
import styles from "./app.module.css";

const App = () => {
  return (
    <StoreContext.Provider value={{ ...RootStore }}>
      <Routers />
    </StoreContext.Provider>
  );
};

export default observer(App);
