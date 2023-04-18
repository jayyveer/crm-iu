export const checkToken = () => {
  if (localStorage.getItem('token')) {
    return true;
  } else {
    return false;
  }
}

export const getToken = () => {
  return localStorage.getItem('token')
}