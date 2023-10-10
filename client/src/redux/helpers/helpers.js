
export function dogTemperament(dogs, temperament) {
  let tempDg = [];
  temperament==='All'
  ? (tempDg = dogs)
  : (tempDg = dogs?.filter((d)=> d.temperament?.some((t)=> temperament.includes(t))))

  return tempDg;
}

export function dogWeight(dogs, order) {
  if (order==="Lower-Higher") {
  return dogs?.filter((d)=> d.minWeight!==null).sort((a,b)=> a.minWeight - b.minWeight)
  }
  if (order==="Higher-Lower") {
  return dogs?.filter((d)=> d.minWeight!==null).sort((a,b)=> b.minWeight - a.minWeight)
  }
  return dogs;
}

export function dogAbc(dogs, order) {
  if(order==="A-Z") {
    return dogs?.sort((a,b)=>a.name.localeCompare(b.name))
  }
  if(order==="Z-A") {
  return dogs?.sort((a,b)=>b.name.localeCompare(a.name))
  }
  return dogs;
}

export function dogDbApi(dogs, filter) {
  if(filter==="created-breeds") {
  return dogs?.filter((dg)=> dg.created===true)
  }

  if(filter==="api-breeds") {
    return dogs?.filter((dg)=> dg.created===false)
    }
    return dogs;
}


export function dogFilterOrder(dogs, selects) {
  let filterSelec = dogs;

  for(const i in selects) {
    const select = selects[i];
    switch (i) {
      case "temperaments":
        if(select.active) {
          filterSelec = dogTemperament(filterSelec, select.value);
        }
        break;

      case "order":
        if(select.active) {
          if(select.type === "orderWgt") {
            filterSelec = dogWeight(filterSelec, select.value);
          } else {
            filterSelec = dogAbc(filterSelec, select.value);
          }
        }
        break;

      case "breeds":
        if(select.active) {
          filterSelec = dogDbApi(filterSelec, select.value)
        }
        break;  
    
      default:
        break;
    }
  }
  return filterSelec;
}

