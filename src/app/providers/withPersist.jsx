import { PersistGate } from "redux-persist/integration/react";
// I don't like that we pass store here but whatever
import { persistor } from "../store";

export const withPersistor = (component) => () =>
  (
    <PersistGate loading={null} persistor={persistor}>
      {component()}
    </PersistGate>
  );
