function removeParam(
  keys: string[],
  pathname: string,
  searchParamsToString: string
) {
  const fullPath = pathname + "?" + searchParamsToString;

  let output = fullPath.split("?")[0],
    param,
    params_arr = [],
    queryString = fullPath.indexOf("?") !== -1 ? fullPath.split("?")[1] : "";
  if (queryString !== "") {
    params_arr = queryString.split("&");
    for (var i = params_arr.length - 1; i >= 0; i -= 1) {
      param = params_arr[i].split("=")[0];
      if (keys.includes(param)) {
        params_arr.splice(i, 1);
      }
    }
    if (params_arr.length) output = output + "?" + params_arr.join("&");
  }
  return output;
}

export default removeParam;
