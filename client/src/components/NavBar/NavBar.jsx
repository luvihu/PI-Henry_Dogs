
import { NavLink } from 'react-router-dom';
import Search from '../Search/Search.jsx';
import style from './NavBar.module.css';


const NavBar = ()=> {
  return (
  <div className={style.content}>
    <div className={style.navContent}>
      <div className={style.homeLink}>
      <NavLink className={style.homeForm} to= '/'>INICIO</NavLink>
      <NavLink className={style.homeForm} to= '/home'>HOME</NavLink>
      <NavLink className={style.homeForm} to= '/form'>FORM PAGE</NavLink>
      </div>
     <div>
      <Search/>
     </div>
    </div>

  </div>
  )
};

export default NavBar;