const getQueryParams = (): string => {
  let path: string = window.location.pathname;
  return path.substring(path.lastIndexOf("/") + 1);
}


export default getQueryParams;