import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from "redux-thunk";
import rootReducer from './reducer.js';

export default createStore( rootReducer,composeWithDevTools(applyMiddleware(thunk))) // esta línea es para poder hacer peticiones a un server



// import { createStore, applyMiddleware, compose } from 'redux';
// import rootReducer from './reducer.js';
// import thunkMiddleware from 'redux-thunk';

// const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // esta línea es para conectar con la extensión del navegador => REDUX DEVTOOLS 

// const store = createStore(
//     rootReducer,
//     composeEnhancer(applyMiddleware(thunkMiddleware)) // esta línea es para poder hacer peticiones a un server
// );
// export default store;