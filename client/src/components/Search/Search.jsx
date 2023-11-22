
import style from './Search.module.css';
import { useState } from 'react';
import { useDispatch } from "react-redux";
import { dogGetName, dogsGet } from '../../redux/actions.js';


const Search = ()=> {
  
const dispatch = useDispatch();

const [input, setInput ] = useState("");
 
 const handleSearch = (event)=> {
  if(event.target.value === "") {
    dispatch(dogsGet());
  }
  setInput(event.target.value);
 }
 
 const handlerSubmit = (event)=> {
  event.preventDefault();

  if(input.length !== 0){
    dispatch(dogGetName(input));
  }
};

 
  return  (

  <div className={style.search} >

    <form action="search" onSubmit={handlerSubmit}>
       <input 
        id="search" 
        name="search"
        type="search"
        value={input} 
        onChange={handleSearch} 
        placeholder='Enter name' />

       <button type="submit">Search</button>
    </form>
    
  </div>
  )
};
 export default Search;