import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";

import siteReducer from './store/reducers/siteReducer'
import userReducer from "./store/reducers/userReducer";
import authReducer from './store/reducers/authReducer'

import App from "./App";
import reportWebVitals from "./reportWebVitals";

const reducers = combineReducers({
  user: userReducer,
  site: siteReducer,
  auth: authReducer
});

const store = createStore(reducers, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
