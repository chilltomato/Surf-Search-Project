import {renderListWithTemplate, getParam, convertToJson} from "./utils.mjs";
const baseUrl = import.meta.env.VITE_SERPSTACK_URL
const api = import.meta.env.VITE_SERPSTACK_API


function resultTemplate(result){
  return `
  <div class="search-result">
    <a href="${result.url}">
      <p>${result.domain}$</p>
      <h2>${result.title}</h2>
      <p>${result.displayed_url}$</p>
      <p>${result.snippet}</p>
    </a>
  </div>`;
}
search()
async function search () {
  const search = getParam("search");
  const searchName = document.querySelector("#searchname");
  const searchType = document.querySelector("#searchtype");
  const results = document.querySelector("#results")
  searchName.innerHTML = search

  const quicksearch = getParam("quicksearch");
  if (quicksearch == "false"){
  searchType.innerHTML = "detailed search"
  const location = getParam("location");
  const device = getParam("device");
  const type = getParam("type");
  const page = getParam("page");
  const response = await fetch(`${baseUrl}?access_key=${api}&query=${search}&engine=google&type=${type}&device=${device}&location=${location}&page=${page}`);
  const data = await response.json();
  const resultdata = (data.organic_results)
  console.log(resultdata)
  renderListWithTemplate(resultTemplate, results, resultdata); 
  const element = document.getElementById("loading");
  element.remove();

  } else {
  searchType.innerHTML = "quick Search"
    const response = await fetch(`${baseUrl}?access_key=${api}&query=${search}&engine=google`);
    const data = await response.json();
    const resultdata = (data.organic_results)
    renderListWithTemplate(resultTemplate, results, resultdata); 
    const element = document.getElementById("loading");
    element.remove();
  }
}