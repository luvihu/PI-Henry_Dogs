
import { useEffect  } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import style from './Detail.module.css';
import { dogById} from "../../redux/actions.js";


const Detail = ()=> {

  const { id } = useParams();
  const dispatch = useDispatch();
  const dogDet = useSelector((state)=> state.dogId);
  
  useEffect(()=> {
    dispatch(dogById(id));
    
  },[id,dispatch]);

return (
<div className={style.contentDetail}>

    <div className={style.contentBtn}>
     <Link to='/home'>
      <button>Return to Home</button>
     </Link>
    </div>

  <div className={style.detail}>
      
      {dogDet.map((dg)=> (

    <div key={dg.id} className={style.contentMap}>
      
        <img src={dg.image} alt={dg.name}/>
      
      <div className={style.dataMap}>

        <p>ID:{dg.id}</p>
        <h1>Breed:{' '}{dg.name}</h1>

        <h3>Height: {dg.height} cm</h3>

        <h3>Weight: {dg.weight } cm</h3>

        <h3>Life span: {dg.life_span}</h3>
        
        <p>TEMPERAMENTS: {Array.isArray(dg.temperaments)
                ? dg.Temperaments.map((t)=> t.name).join(",")
                : dg.Temperaments }</p>
      </div>
                  
    </div>

      
       ))}  
  </div>

</div>
  )
};

export default Detail;