
import style from './Search.module.css';
import { useState } from 'react';
import { useDispatch } from "react-redux";
import { dogGetName } from '../../redux/actions.js';


const Search = ()=> {
const dispatch = useDispatch();

 const [input, setInput ] = useState({
  name: ''
 });

 const onSearch = (event)=> {
   setInput({
    name: event.target.value
   });
   
 };

 const onSubmit = (event)=> {
  event.preventDefault();

  const name = input.name;
  if(!name) {
    return alert('Por favor ingrese la raza a buscar');
  }else {
    dispatch(dogGetName(name));
  }
  
 };

  return  (

    <div className={style.search} >
      <input 
      id="search" 
      name="search"
      type="search"
      value={input.name} 
      onChange={onSearch} 
      placeholder='search...' />

       <button 
       type="submit"
       onClick={onSubmit}
       >Search</button>
           
    </div>
  )
};
 export default Search;