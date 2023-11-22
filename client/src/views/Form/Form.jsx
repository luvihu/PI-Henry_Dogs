import style from './Form.module.css';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { dogAllTemperament } from '../../redux/actions.js';
import { dogPost } from '../../redux/actions.js';
import validate from './validator.js';

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
  const [errors, setErrors] = useState({});
  
  
  // Manejador para los cambios en los campos del formulario.
  const handlerInput = (event)=> {
    const { name, value } = event.target;
    const validateErr = validate({...initial, [name]: value});
    setErrors(validateErr);
    setInitial((prevInitial)=> ({...prevInitial, [name]: value}));
          
  };
// Manejador para agregar o quitar temperamentos seleccionados en el dropdown.
  const handlerSelecTemp =(event)=> {
    const selectedId = event.target.value;
    if (!initial.Temperaments.includes(selectedId)) {
        setInitial((prevInitial) => ({ ...prevInitial, Temperaments: [...prevInitial.Temperaments, selectedId] }));
    }
  };
// Manejador para identificar temperamentos selecionados
const handleDropdownToggle = () => {
  // eslint-disable-next-line
  const dropdown = document.getElementById('tempId');
}; 
 
  // Manejador para remover temperamentos de la lista del seleccionado
  const handlerDeletTemp = (id)=> {
    setInitial((prevInitial) => ({
      ...prevInitial,
      Temperaments: prevInitial.Temperaments.filter((temperamentId) => temperamentId !== id)
  }));
     
  };

  // Manejador para enviar los datos del formulario al servidor
   const handlerCreate = (event)=> {
    event.preventDefault();

    let aux = Object.keys(errors);
    if (aux.length === 0) {   // Si no hay errores de validación, se reinicia el formulario y se envían los datos al servidor.
      
         dispatch(dogPost(initial));
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
         });
         setErrors(validate(initial));
                 
   } else {
    
    alert('Please fix validation errors before submitting');
   }
  }
  const resetForm = ()=> {
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
  }
     
  return (

<div className={style.create}>
  <div className={style.btnTop}>
    <h1>¡Add your furry companion!</h1>
      <button onClick={resetForm}>Reset Form</button>
    </div>
          
  <div className={style.imgCarpet}>
         
   <form onSubmit={handlerCreate}>
     <div className={style.createMm}>
    
        <div className={style.name}>
         <label htmlFor="name">Name: </label>
         <input id='name' type="text" name='name' placeholder='Name...' autoComplete='off' value={initial.name} onChange={handlerInput}/>
         <h6 className={style.errors}>{errors.name && errors.name}</h6>
        </div>

        <div className={style.contentHeight}>
          <div>
           <label htmlFor="minHeight">Minimum Height (cm): </label>
           <input id="minHeight" type="text" name='minHeight' placeholder='minHeight...' value={initial.minHeight} onChange={handlerInput} />
            <h6 className={style.errors}>{errors.minHeight && errors.minHeight}</h6>
          </div>
          <div>
           <label htmlFor="maxHeight">Maximum Height (cm): </label>
           <input id='maxHeight' type="text" name='maxHeight' placeholder='maxHeight...' value={initial.maxHeight} onChange={handlerInput} />
            <h6 className={style.errors}>{errors.maxHeight && errors.maxHeight}</h6>
          </div>
        </div>  
       
        <div className={style.contentWeight}>
          <div>
           <label htmlFor="minWeight">Minimum Weight (kg): </label>
           <input id='minWeight' type="text" name='minWeight' placeholder='minWeight...' value={initial.minWeight} onChange={handlerInput} />
            <h6 className={style.errors}>{errors.minWeight && errors.minWeight}</h6>
          </div>
          <div>
           <label htmlFor="maxWeight">Maximum Weight (kg): </label>
           <input id='maxWeight' type="text" name='maxWeight' placeholder='maxWeight...' value={initial.maxWeight} onChange={handlerInput} />
            <h6 className={style.errors}>{errors.maxWeight && errors.maxWeight}</h6>
          </div>
        </div>
                  
        <div className={style.life}>
          <div>
           <label htmlFor="minLifeSpan">Minimum Life span (years): </label>
           <input id='minLifeSpan' type="text" name='minLifeSpan' placeholder='minLifeSpan...' value={initial.minLifeSpan} onChange={handlerInput}/>
            <h6 className={style.errors}>{errors.minLifeSpan && errors.minLifeSpan}</h6>
          </div>
          <div>
           <label htmlFor="maxLifeSpan">Maximum Life span (years): </label>
           <input id='maxLifeSpan' type="text" name='maxLifeSpan' placeholder='maxLifeSpan...' value={initial.maxLifeSpan} onChange={handlerInput}/> 
            <h6 className={style.errors}>{errors.maxLifeSpan && errors.maxLifeSpan}</h6>
          </div >
         </div>
         <div className={style.image}>
           <label htmlFor="image">Image (url): </label>
           <input id='image' type="text" value={initial.image} name="image" placeholder='Image...' onChange={handlerInput} onBlur={handlerInput}/>
           <h6 className={style.errors}>{errors?.image && errors.image}</h6>
         </div>
        
        
          <div className={style.contentTemp}>
             <label htmlFor="tempId">Select dog temperaments: </label>
            <div  onClick={handleDropdownToggle}>
              <select className={style.contentOption} id="tempId" defaultValue='default' onChange={handlerSelecTemp}>
               <option disabled value="default">Temperaments</option>
                 {temp?.map((t)=> (
                   <option key={t} value={t}>{t}</option>
                  ))}
              </select>
                              
              <div className={style.contentSelecTemp}>
                 {initial.Temperaments.map((selectedId)=>{
                   const selectedTemperament = initial.Temperaments.find((temperament) => temperament === selectedId);
                   return (
                       <div key={selectedId} className={style.selectedTemp}>
                           {selectedTemperament}
                           <button type="button" onClick={() => handlerDeletTemp(selectedId)}>
                               ✖
                           </button>
                       </div>)
                       })}
              </div>          
                     
            </div>
             <h6 className={style.errors}>{errors.Temperaments && errors.Temperaments}</h6>

            <div className={style.button}>
              <button >Create</button>
            </div>
       
          </div>
      </div>
    </form>
    
  </div>
</div>
  )
}

export default Form;

 