import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { BrowserRouter } from "react-router-dom";
import { store, persistor } from "./store";
import SessionBootstrap from "./components/SessionBootstrap/SessionBootsrap";

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <SessionBootstrap />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}
