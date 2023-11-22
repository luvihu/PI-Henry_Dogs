import { useEffect, useState } from "react";
import { useSelector } from "react-redux";


const usePage = ()=> {
  const dogsAll = useSelector((state)=> state.dogs);
 
  const [prev, setPrev]= useState(0);  // Este estado mantiene el índice del primer elemento en la página actual.
  const [next, setNext] = useState(8); // Este estado mantiene el índice del último elemento en la página actual.
  const [count, setCount]= useState(1);  // Este estado mantiene el número de la página actual.
  let paginate =dogsAll.slice(prev,next); // Utiliza slice() para obtener los perros que se mostrarán en la página actual, según los índices prev y next.
  const totPagine = Math.ceil(dogsAll.length/8);

  useEffect(()=> {
    setPrev(0);
    setNext(8);
    setCount(1);
  },[dogsAll.length]); // Este efecto se dispara cada vez que cambia la longitud de la lista de perros. Restablece los valores de prev, next y count 
  // cuando la lista de perros cambia para asegurarse de que los datos se paginen correctamente.
  
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
  // Esta función disminuye el índice prev y next para mostrar la página anterior de perros. Se asegura de que prev nunca sea menor que 0.
  const changeNext = ()=> {
    if(count < totPagine){
      setPrev(prev + 8);
      setNext(next + 8);
      setCount(count + 1);
    }
  }
  // Esta función aumenta el índice prev y next para mostrar la siguiente página de perros. Se asegura de que next nunca supere el número total de perros.
  return {changeNext, changePrev, paginate, count, totPagine};

};
export default usePage;