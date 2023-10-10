
import { Link } from 'react-router-dom';
import Search from '../Search/Search.jsx';
import style from './NavBar.module.css';


const NavBar = ()=> {
  return (
    <div className={style.content}>
    <div className={style.navContent}>
      <div className={style.homeForm}>
      <Link to= '/home'>HOME</Link>
      <Link to= '/form'>FORM PAGE</Link>
      </div>
     <div>
      <Search/>
     </div>
    </div>

    </div>
  )
};

export default NavBar;