import PropTypes from "prop-types";
import style from './Card.module.css';
import { Link } from 'react-router-dom';


const Card = ({dog})=> {
 
  let temp = '';

  Array.isArray(dog.Temperaments)?
  (temp=dog.Temperaments.map((t)=>{ return t.name}).join(',')):
  temp=dog.Temperaments
  

  return (
    <div className={style.card}>
      <Link to={`/detail/${dog.id}`}>
       <img src={dog.image} alt={dog.name}/>
       <div className={style.hCont}>
        <h4>{dog.name}</h4>
        <h5>{temp}</h5>
        <h6>Weight: {dog.weight} kg</h6>
       </div> 
      </Link>
     </div>
  )
};

Card.propTypes= {
  dog: PropTypes.object.isRequired,
}

export default Card;