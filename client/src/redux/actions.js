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
      const {data} = await axios.get(`http://localhost:3001/dogs/?name=${name}`);
              
        return dispatch({
        type: GET_DOG_NAME, 
        payload: data 
      })
      
    } catch (error) {
      alert (`No existe dog con nombre ${name}`);
    }
  }
};
export const dogById = (id)=> {
  return async function(dispatch) {
    try {
      const dataId = (await axios.get(`http://localhost:3001/dogs/${id}`)).data;

      if(!dataId.length) throw Error('No existe perro con ese ID');
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
export function dogPost(payload) { 
  return async function(dispatch) {
  try {
   const response  = await axios.post('http://localhost:3001/dogs',payload);

   if(response.status === 201){
    dispatch({
      type: POST_DOG, 
      payload: response.data
    })
     alert('Succesfully created')}
  
  } catch (error) {
    if (error.response.status === 400) {
      return alert('Dog breeds name already exists') //// Indica que ha habido un error en la creación
  }
  if (error.response.status === 404) {
      return alert('Internal server error')
  }
  }
  }
}

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




