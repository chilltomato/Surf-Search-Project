import {renderListWithTemplate, getParam} from "./utils.mjs";
const baseUrl = import.meta.env.VITE_SERPSTACK_URL
const api = import.meta.env.VITE_SERPSTACK_API


function resultTemplate(result){
  return `
  <div class="search-result">
    <a href="${result.url}">
      <p>${result.domain}</p>
      <h2>${result.title}</h2>
      <p>${result.displayed_url}$</p>
      <p>${result.snippet}</p>
    </a>
  </div>`;
}

function imageresultsTemplate(result){
  return `
  <div class="search-result">
    <a href="${result.url}">
      <h2>${result.title}</h2>
      <img src="${result.image_url}" width="474" height="474">
      <p>${result.source_name}</p>
      <p>${result.type}</p>
    </a>
  </div>`;
}

function videoresultsTemplate(result){
  return `
  <div class="search-result">
    <a href="${result.url}">
      <h2>${result.title}</h2>
      <p>${result.displayed_url}</p>
      <p>${result.length}</p>
      <p>${result.snippet}</p>
    </a>
  </div>`;
}

function ShoppingresultTemplate(result){
  return `
  <div class="search-result">
    <a href="${result.url}">
      <h2>${result.title}</h2>
      <p>${result.price}</p>
      <p>${result.seller}$</p>
    </a>
  </div>`;
}

function newsresultTemplate(result){
  return `
  <div class="search-result">
    <a href="${result.url}">
      <h2>${result.title}</h2>
      <p>${result.uploaded}</p>
      <p>${result.source_name}$</p>
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
    const sort = getParam("sort");
    const device = getParam("device");
    const type = getParam("type");
    const page = getParam("page");

    if (type == "images") {
      const images_type = getParam("images_type");
      const images_size = getParam("images_size");
      const images_color = getParam("images_color");
      const response = await fetch(`${baseUrl}?access_key=${api}&query=${search}&engine=google&type=${type}&device=${device}&sort=${sort}&page=${page}&images_type=${images_type}&images_size=${images_size}&images_color=${images_color}`);
      const data = await response.json();
      const resultdata = (data.image_results)
      console.log(resultdata)
      renderListWithTemplate(imageresultsTemplate, results, resultdata); 
      const element = document.getElementById("loading");
      element.remove();

    } else {
      const response = await fetch(`${baseUrl}?access_key=${api}&query=${search}&engine=google&type=${type}&device=${device}&location=${location}&page=${page}`);
      const data = await response.json();
      if (type == "videos") {
        const resultdata = (data.video_results)
        renderListWithTemplate(videoresultsTemplate, results, resultdata);
      } else if (type == "news") {
        const resultdata = (data.news_results)
        renderListWithTemplate(newsresultTemplate, results, resultdata);
      } else if (type == "shopping") {
        const resultdata = (data.shopping_results)
        renderListWithTemplate(ShoppingresultTemplate, results, resultdata); 
      } else {
      const resultdata = (data.organic_results)
      renderListWithTemplate(resultTemplate, results, resultdata); 
      }

      const element = document.getElementById("loading");
      element.remove();
    }

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