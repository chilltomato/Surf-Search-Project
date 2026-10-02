export async function loadTemplate(path) {
  const res = await fetch(path);
  const template = await res.text();
  return template
}

export function renderWithTemplate(template, parentElement, data, callback) {
  parentElement.innerHTML = template;
  if(callback){
    callback(data)
  }
}

export function getParam(param){
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const product = urlParams.get(param);
  return product
}

export function renderListWithTemplate(template, parentElement, list, position = "afterbegin", clear = false) {
  const htmlStrings = list.map(template);

  if (clear) {
    parentElement.innerHTML = "";
  }
  parentElement.insertAdjacentHTML(position, htmlStrings.join(""));
}

export async function convertToJson(res) {
  const jsonRes =  await res.json();
  if (res.ok) {
    return jsonRes;
  } 
  throw {
    name: "servicesError",
    message: jsonRes,
  };
}
