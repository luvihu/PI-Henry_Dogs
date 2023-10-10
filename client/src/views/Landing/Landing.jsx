import { NavLink } from "react-router-dom";

const Landing = ()=> {
  return (
    <div>
      <h1> TITULO</h1>
      <p>Welcome</p>
      <div>
              <NavLink>
          <button>Home</button>
        </NavLink>
      </div>
      
    </div>
  )
};

export default Landing;