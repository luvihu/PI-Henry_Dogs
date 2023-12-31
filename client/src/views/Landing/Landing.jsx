import { NavLink } from "react-router-dom";
import style from './Landing.module.css';

const Landing = ()=> {
  return (
    <div className={style.landing}>
        <h1>Paw paradise!!!</h1>
      <div className={style.contImgH2}>
              
       <div className={style.contentP}>
         <h2>
            Welcome to a place created with love, where you can immerse yourself
            in the world of dog breeds, from the adorable Pomeranians to the majestic 
            German Shepherds, discover fascinating details about different dog breeds.
            <br /><br />
            Explore, learn, share and fall in love! 
         </h2>
         
        </div>
      </div>
      <div className={style.contentNav}>
        <NavLink to='/home'  >
          <button>Go Home</button>
        </NavLink>
      </div >
    </div>
  )
};

export default Landing;