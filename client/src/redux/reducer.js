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
  

const initialState = {
  dogs:[],
  dogsFiltOrder:[],
  temperaments:[],
  dogId: []
  
 
}  

const rootReducer = (state=initialState, action)=> {

  let copyTemp, tempFilt, order, orderWeig, copyOg;
  switch(action.type) {
    case GET_DOGS:
     return {
      ...state,
      dogs: action.payload, 
      dogsFiltOrder: action.payload
     };
     case GET_DOG_NAME:
     return {
      ...state,
      dogs: action.payload, 
      dogsFiltOrder: action.payload

     };
     case GET_DOG_ID:
     return {
      ...state,
      dogId: action.payload,

     };
     case GET_TEMPERAMENTS:
     return {
     ...state,
      temperaments: action.payload

     };
     case POST_DOG:
      return {
        ...state,
        
      };
     case FILTER_TEMP:
      copyTemp = [...state.dogsFiltOrder];
      if(action.payload==='All'){
        tempFilt=copyTemp;
      } else{
        tempFilt = copyTemp.filter((t)=>t.Temperaments?.includes(action.payload));
      }

      return {
        ...state,
        dogs: tempFilt,
       
      };
      case ORDER_ABC:
        order = [...state.dogsFiltOrder];
        if(action.payload==='All'){
          return {
           ...state,
           dogs: order
          };
         }
         else if(action.payload==='A-Z'){
          let abc=order?.sort((a, b) => a.name.localeCompare(b.name));
          return {
            ...state,
          dogs: abc,
          };
        } else {
          let cba=order?.sort((a, b) => b.name.localeCompare(a.name));
          return {
            ...state,
          dogs: cba,
          };
        }
              
        case ORDER_WEIGHT:
         orderWeig = [...state.dogsFiltOrder];
 
         if(action.payload==='All'){
          return {
           ...state,
           dogs: orderWeig
          };
         }
         else if(action.payload==='Lower-Higher'){
          let lowHig =orderWeig?.sort((a, b) => {
            
            let arrayA = a.weight.split(" - ");
            let arrayB = b.weight.split(" - ");
            let wA = parseInt(arrayA[0]);
            let wB = parseInt(arrayB[0]);
            return wA - wB;
           });
           return {
           ...state,
           dogs: lowHig
           }; 
         } else {
          let higLow =orderWeig?.sort((a, b) => {
              
            let arrayA = a.weight.split(" - ");
            let arrayB = b.weight.split(" - ");
            let wA = parseInt(arrayA[0]);
            let wB = parseInt(arrayB[0]);
            return wB - wA;
           });
           return {
            ...state,
            dogs: higLow
           };
         }
          
      case FILTER_DB_API:
      copyOg = [...state.dogsFiltOrder];
      if(action.payload==='All'){
        return {
          ...state,
          dogs: copyOg
             };
      } 
      if(action.payload==="created-breeds"){
        let dogOrigin=copyOg.filter((dg) => dg.created === true);
        return {
          ...state,
          dogs: dogOrigin,
             };
      } else {
        let dogOrig=copyOg.filter((dg) => dg.created === false);
        return {
          ...state,
          dogs: dogOrig
             };
      }
         
     case PAGINATED:
      return {
       ...state,
       
      };
      case RESET:
      return {
       ...state,
       dogs: state.dogsFiltOrder
      };
    default:
     return {...state} 
  }

};
 export default rootReducer;