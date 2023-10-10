import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";

const usePage = ()=> {
  const dogsAll = useSelector((state)=> state.dogs);
  const [prev, setPrev]= useState(0);
  const [next, setNext] = useState(8);
  const [count, setCount]= useState(1);
  let paginate =dogsAll.slice(prev,next);
  const totPagine = Math.ceil(dogsAll.length/8);

  useEffect(()=> {
    setPrev(0);
    setNext(8);
    setCount(1);
  },[dogsAll.length]);
  
  const changePrev = ()=> {
    if(count > 1){
      if(prev-8 < 0){
        setPrev(0);
        setNext(8);
      } else if(prev-8 >= 0){
        setPrev(prev-8);
        setNext(next-8);
      }
      setCount(count-1)
    }
  };
  const changeNext = ()=> {
    if(count < totPagine){
      setPrev(prev + 8);
      setNext(next + 8);
      setCount(count + 1);
    }
  }
  return {changeNext, changePrev, paginate, count, totPagine};

};
export default usePage;