
const SearchEngine = document.getElementById("SearchEngine");
SearchEngine.addEventListener("submit", fourmsubmit)

const previoussearch = JSON.parse(localStorage.getItem("lastSearch"));
const searchtype = document.getElementById("type");

const imagefields = document.getElementById("ImageParameters");





if (previoussearch !== null){
  for (const [key, value] of Object.entries(previoussearch)){
    const field = SearchEngine.elements.namedItem(key)

        if (field){
        field.value = value;
         }
    }
}

if (searchtype.value !== "images"){
  imagefields.classList.add("hidden");
}


searchtype.addEventListener("change", function (){
const showimage = this.value === "images";

imagefields.classList.toggle ("hidden", !showimage );
});

function fourmsubmit(){
event.preventDefault();
const values = Object.fromEntries(new FormData(SearchEngine).entries());
localStorage.setItem('lastSearch', JSON.stringify(values));

}
