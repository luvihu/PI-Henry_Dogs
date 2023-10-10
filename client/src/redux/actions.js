import {
  GET_DOGS,
  GET_DOG_NAME,
  GET_DOG_ID,
  GET_TEMPERAMENTS,
  POST_DOG,
  FILTER_TEMP,
  ORDER_ABC,
  ORDER_WEIGHT,
  FILTER_DB_API,
  PAGINATED,
  RESET

} from './actions-types.js';
import axios from 'axios';

export const dogsGet = ()=>{ 
    return async function(dispatch) {
    try {
     const dataDg = (await axios.get('http://localhost:3001/dogs')).data;
     return dispatch({
        type: GET_DOGS, 
        payload: dataDg
      })
      
    } catch (error) {
      console.log(error.message)
    }
  }
};
export const dogGetName = (name)=> {
  return async function(dispatch) {
    try {
      const infName = (await axios.get(`http://localhost:3001/dogs/?name=${name}`)).data;
        return dispatch({
        type: GET_DOG_NAME, 
        payload: infName 
      })
      
    } catch (error) {
      console.log(error.message)
    }
  }
};
export const dogById = (id)=> {
  return async function(dispatch) {
    try {
      const dataId = (await axios.get(`http://localhost:3001/dogs/${id}`)).data;
       return dispatch({
        type: GET_DOG_ID,
        payload: dataId
       })

    } catch (error) {
      console.log(error.message)
    }
  }
};
export const dogAllTemperament = ()=> {
  return async function(dispatch) {
    try {
      const temp = (await axios.get('http://localhost:3001/temperaments')).data;
       return dispatch({
        type: GET_TEMPERAMENTS,
        payload: temp
       })
      
    } catch (error) {
      console.log(error.message)
    }
  }
};
export const dogPost = (dog)=>{ 
  return async function(dispatch) {
  try {
   const { data } = await axios.post('http://localhost:3001/dogs',dog);
   return dispatch({
      type: POST_DOG, 
      payload: data
    })
    
  } catch (error) {
    console.log(error.message)
  }
}
};
export const dogTemperament = (temp)=> {
  return {
  type: FILTER_TEMP,
  payload: temp
  }
      
  };
export const dogWeight = (order)=> {
  return {
    type: ORDER_WEIGHT,
    payload: order
  }
};
export const dogAbc = (order)=> {
  return {
    type: ORDER_ABC,
    payload: order
  }
};

export const dogDbApi = (filter)=> {
  return {
    type: FILTER_DB_API,
    payload: filter
  }
};
export const dogPage = (value)=> {
  return {
    type: PAGINATED,
    payload: value
  }
};
export const dogReset = ()=> {
  return {
    type: RESET,
  }
};




