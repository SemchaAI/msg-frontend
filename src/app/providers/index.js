import { withRouter } from "./withRouter";
import { withStore } from "./withStore";
// import { withQuery } from "./withQuery";
import { compose } from "@reduxjs/toolkit";
import { withPersistor } from "./withPersist";
//import compose from "compose-function";

export const withProviders = compose(withStore, withPersistor, withRouter);
