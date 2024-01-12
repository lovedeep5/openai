import { store } from "./store/store";
import { Provider } from "react-redux";
import MapWrapper from "./components/MapWrapper/MapWrapper";

function App() {
  return (
    <>
      <Provider store={store}>
        <MapWrapper />
      </Provider>
    </>
  );
}

export default App;
