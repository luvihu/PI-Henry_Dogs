import style from './Form.module.css';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { dogAllTemperament } from '../../redux/actions.js';
import { dogPost } from '../../redux/actions.js';
import validate from '../../components/utils/validate.jsx';
import img from "../../components/img/pexels-chevanon-photography.jpg";


const Form = ()=> {
  const dispatch = useDispatch();
  const temp = useSelector((state) => state.temperaments);

  useEffect(() => { 
    dispatch(dogAllTemperament());
  }, [dispatch]);
  
  const [initial, setInitial] = useState({
    image:'',
    name:'',
    minHeight:'',
    maxHeight:'',
    minWeight:'',
    maxWeight:'',
    minLifeSpan:'',
    maxLifeSpan:'',
    Temperaments:[]
  });
  const [errors, setErrors] = useState({
    image:'',
    name:'',
    minHeight:'',
    maxHeight:'',
    minWeight:'',
    maxWeight:'',
    minLifeSpan:'',
    maxLifeSpan:'',
    Temperaments:[]
  
  });

  const [alert, setAlert] = useState(false);
  const [alertTime, setAlertTime] = useState(null);
  
  const handlerInput = (event)=> {
    setInitial({
      ...initial,
      [event.target.name] : event.target.value
    })
    setErrors(validate({
      ...initial,
      [event.target.name] : event.target.value
    }))
  };

   
  const handlerSelecTemp =(event)=> {
    const findTemp = initial.Temperaments.find((tp)=> tp===event.target.value);
    if(!findTemp){
      setInitial({
          ...initial,
          Temperaments: [...initial.Temperaments, event.target.value]
         });
      setErrors(
        validate({
          ...initial,
          Temperaments: [...initial.Temperaments, event.target.value]  
        })
      )   
    }
    
  };
  const handlerDeletTemp = (event)=> {
    const filterDelet = initial.Temperaments.filter((t)=> t !==event.target.value)
     setInitial({
      ...initial,
      Temperaments: filterDelet
     });
     setErrors(validate({
      ...initial,
      Temperaments: filterDelet
     }))
     
  };

  const handlerCreate = (event)=> {
    event.preventDefault();

    if(!Object.values(errors).length){
      dispatch(dogPost(initial));

      setAlert(true);
      setInitial({
        image:'',
        name:'',
        minHeight:'',
        maxHeight:'',
        minWeight:'',
        maxWeight:'',
        minLifeSpan:'',
        maxLifeSpan:'',
        Temperaments:[]
      })
      //  alert('SUCCESSFULLY CREATED!!!!')
    } else {
      setErrors(errors)
    }

  };
  useEffect(() => {
    // Ocultar el alerta después de 3 segundos
    if (alert) {
      setAlertTime(
        setTimeout(() => {
          setAlert(false);
        }, 3000)
      );
    }
    // Limpiar el tiempo de espera del alerta cuando se desmonta el componente
    return () => {
      clearTimeout(alertTime);
    };
  }, [alert, alertTime]);


  return (
<div className={style.create}>
  <div className={style.btnTop}><Link to='/home'><button>Return Home</button></Link></div>
    

      <h1>Create new dog breed</h1>
  <div className={style.imgCarpet}>
    
      
    
    <form action="" onSubmit={handlerCreate}>
     <div className={style.createMm}>

       {alert && (
        <h4>SUCCESSFULLY CREATED!!!!</h4>
       )}   

        <div className={style.name}>
         <label htmlFor="name">Name: </label>
         <input id='name' type="text" name='name' placeholder='Name...' value={initial.name} autoComplete="off" onChange={handlerInput}/>
         {errors.name && <p className={style.errors}>{errors.name}</p>}
        </div>

        <div className={style.contentHeight}>
          <div>
           <label htmlFor="minHeight">Minimun Height: </label>
           <input id="minHeight" type="text" name='minHeight' placeholder='minHeight...' value={initial.minHeight} onChange={handlerInput} />
           {errors.minHeight && <p className={style.errors}>{errors.minHeight}</p>}
          </div>
          <div>
           <label htmlFor="maxHeight">Maximum Height: </label>
           <input id='maxHeight' type="text" name='maxHeight' placeholder='maxHeight...' value={initial.maxHeight} onChange={handlerInput} />
           {errors.maxHeight && <p className={style.errors}>{errors.maxHeight}</p>}
          </div>
        </div>  
       
        <div className={style.contentWeight}>
          <div>
           <label htmlFor="minWeight">Minium Weight: </label>
           <input id='minWeight' type="text" name='minWeight' placeholder='minWeight...' value={initial.minWeight} onChange={handlerInput} />
           {errors.minWeight && <p className={style.errors}>{errors.minWeight}</p>}
          </div>
          <div>
           <label htmlFor="maxWeight">Maximum Weight: </label>
           <input id='maxWeight' type="text" name='maxWeight' placeholder='maxWeight...' value={initial.maxWeight} onChange={handlerInput} />
           {errors.maxWeight && <p className={style.errors}>{errors.maxWeight}</p>}
          </div>
        </div>
                  
        <div className={style.life}>
          <div>
           <label htmlFor="minLifeSpan">Minium Life Span: </label>
           <input id='minLifeSpan' type="text" name='minLifeSpan' placeholder='minLifeSpan...' value={initial.minLifeSpan} onChange={handlerInput}/>
           {errors.minLifeSpan && <p className={style.errors}>{errors.minLifeSpan}</p>}
          </div>
          <div>
           <label htmlFor="maxLifeSpan">Maximum Life Span: </label>
           <input id='maxLifeSpan' type="text" name='maxLifeSpan' placeholder='maxLifeSpan...' value={initial.maxLifeSpan} onChange={handlerInput}/> 
           {errors.maxLifeSpan && <p className={style.errors}>{errors.maxLifeSpan}</p>}
          </div>
        </div>

        <div className={style.image}>
         <label htmlFor="image">Image: </label>
         <input id='image' type="url" name='image' placeholder='url...' value={initial.image} autoComplete="off" onChange={handlerInput}/>
         {errors.image && <p className={style.errors}>{errors.image}</p>}
        </div>

        <div className={style.contentTemp}>
          <label>Select dog temperaments: </label>
           {temp.length > 0 ? (
             <select name="Temperaments" id="Temperaments" defaultValue="default" onChange={handlerSelecTemp}>
              <option disabled value="default">Temperaments</option>
                {temp?.map((t)=> (
                  <option key={t} value={t}>{t}</option>
                 ))}
             </select>
             ) : null
            }
           {errors.Temperaments && <p className={style.errors}>{errors.Temperaments}</p>} 
        </div>

        <div className={style.contentSelecTemp}>
         {initial.Temperaments &&
          (initial.Temperaments.map((t)=>(
                <button key={t} value={t} onClick={handlerDeletTemp}>{t}</button>))
          ) }
         </div>

        <div className={style.button}>
         <button>Create</button>
        </div>

      </div>
    </form>
    
    <img src={img} alt='image-dog' />
    
  </div>
</div>
  )
};

export default Form;