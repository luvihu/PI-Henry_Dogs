import Card from '../Card/Card.jsx'
import { useEffect } from "react";
import { useDispatch} from 'react-redux';
import { dogsGet } from '../../redux/actions.js';
import PropTypes from "prop-types";
import style from './Cards.module.css'

const Cards = ({dogs})=> {
  const dispatch = useDispatch();

  useEffect(()=> {
    dispatch(dogsGet())
  },[dispatch])
  
    
  return (
    
      <div className={style.cards}>
          {dogs?.map((dg)=> {
            return (
              <Card
              key={dg.id}
              dog={dg}
              />
            )
        })}
      </div>
    
  )

};
Cards.propTypes= {
  dogs: PropTypes.array.isRequired
}

export default Cards;

