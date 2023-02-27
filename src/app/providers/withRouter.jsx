import { Suspense } from "react";
import { RouterProvider } from "react-router-dom";
import { Routing } from "../../pages";

import "../styles/index.css";

export const withRouter = (component) => () =>
  (
    <div className="App">
      <div className="container">
        <Suspense fallback={<h1>Loading...</h1>}>
          <RouterProvider
            router={Routing()}
            fallbackElement={<div>Loading...</div>}
          >
            {component()}
          </RouterProvider>
        </Suspense>
      </div>
    </div>
  );
