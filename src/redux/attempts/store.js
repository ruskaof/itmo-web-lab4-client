import { createStore, applyMiddleware } from 'redux';
import {reducer} from "./reducer.js";

const thunkMiddleware = require('redux-thunk').default;

export const store = createStore(reducer, applyMiddleware(thunkMiddleware));

