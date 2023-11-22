
import Cards from '../../components/Cards/Cards.jsx';
import Sider from '../../components/Sider/Sider.jsx';
import Paginate from '../../components/Paginate/Paginate.jsx';
import style from './Home.module.css'
import usePage from '../../components/utils/usePage.jsx';


const Home = ()=> {
  
  const {changeNext, changePrev, paginate, count, totPagine} = usePage();
 
  return (
    <div className={style.contenHome}>
       <Sider/>  
       <Cards dogs={paginate}/>
       <div className={style.homPage}>
       <Paginate prevChange={changePrev} nextChange={changeNext} pages={count} pageTotal={totPagine}
        />
        </div> 
    </div>
  )
};

export default Home;

