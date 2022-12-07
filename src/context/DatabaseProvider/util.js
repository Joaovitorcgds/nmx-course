

export function setKeyLocalStorage(key){
  localStorage.setItem("KF", JSON.stringify(key));
}

export function getKeyLocalStorage(){
  const json = localStorage.getItem("KF");

  if(!json){
    return null
  }

  const key = JSON.parse(json);

  return key ?? null
}
