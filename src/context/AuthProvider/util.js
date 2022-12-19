export function getUserLocalStorage(){
  const json = localStorage.getItem("sb-xhcxwwwqeihrvfrvvhbo-auth-token");

  if(!json){
    return null
  }

  const user = JSON.parse(json);

  return user ?? null
}