import style from './Sider.module.css';
import { useSelector, useDispatch } from 'react-redux';
import {useEffect, useState} from 'react';
import { dogAllTemperament, dogReset, dogWeight,dogAbc, dogDbApi, dogTemperament, dogsGet } from '../../redux/actions.js';


const Sider = ()=>{
  const allTemp = useSelector((state)=> state.temperaments);
  
  const dispatch = useDispatch();
         
  useEffect(()=> {
    dispatch(dogAllTemperament());
    dispatch(dogsGet());
        
  },[dispatch]);
 
  const [init, setInit] = useState({
   temp: 'All',
   order: 'All',
   dbApi: 'All'
  });

  const handlerFiltTemp = (event)=> {
    dispatch(dogTemperament(event.target.value));
    setInit({
      ...init,
      temp: event.target.value
    })
    
  };
  

  const handlerBreed = (event)=> {
    dispatch(dogDbApi(event.target.value));
    setInit({
      ...init,
      dbApi: event.target.value
    })
  }

  
  const handlerOrder = (event)=> {
    if(event.target.value==="Lower-Higher"||event.target.value==="Higher-Lower"){
      dispatch(dogWeight(event.target.value));
      setInit({
        ...init,
        order: event.target.value
      })
    } else {
      dispatch(dogAbc(event.target.value));
      setInit({
        ...init,
        order: event.target.value
      })
    }
  };
   
       
  const resetFilt = ()=> {
    dispatch(dogReset());
     setInit({
      temp: 'All',
      order: 'All',
      dbApi: 'All'
    })
  };

  return (
    
    <div className={style.form}>
      <div>
       <label htmlFor="temp">Temperaments</label>
       
       <select id="temp"onChange={handlerFiltTemp} value={init.temp}>
        <option value="All">All</option>
        {allTemp?.map((temp)=> {
          return <option 
          key={temp}
          value={temp}
          >{temp}
          </option>
        })}
       </select>
      </div>

      <div>
        <label htmlFor="order">Order</label>
        <select id="order" onChange={handlerOrder} value={init.order}>
          <option name='All' value="All">All</option>
          <option  value="A-Z">A-Z</option>
          <option  value="Z-A">Z-A</option>
          <option  value="Lower-Higher">Lower-Higher</option>
          <option  value="Higher-Lower">Higher-Lower</option>
        </select>
      </div>

      <div>
        <label htmlFor="dbApi">Breeds</label>
        <select id="dbApi" onChange={handlerBreed} value={init.dbApi}>
        <option name='All' value="All">All</option>
        <option value="created-breeds">Created breeds</option>
        <option value="api-breeds">Api breeds</option>
        </select>
      </div>

      <button onClick={resetFilt}>Reset</button>

    </div>
  )
}


export default Sider;