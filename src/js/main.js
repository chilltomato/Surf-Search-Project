
const SearchEngine = document.getElementById("SearchEngine");
SearchEngine.addEventListener("submit", fourmsubmit)

const previoussearch = JSON.parse(localStorage.getItem("lastSearch"));
const searchtype = document.getElementById("type");
const imagefields = document.getElementById("ImageParameters");
const typechangesfx = new Audio("sfx/WebToggleSearchType.wav");
const optionschangesfx = new Audio("sfx/WebChangeOption.wav");
const imageoptionschangesfx = new Audio("sfx/WebChangeImageOption.wav");


const sortby = document.getElementById("sort");
sortby.addEventListener("change", changeoption)
const device = document.getElementById("device");
device.addEventListener("change", changeoption)
const pagenumber = document.getElementById("page");
pagenumber.addEventListener("change", changeoption)

const imagessize = document.getElementById("images_size");
imagessize.addEventListener("change", changeimageoption)
const imagescolor = document.getElementById("images_color");
imagescolor.addEventListener("change", changeimageoption)
const imagestype = document.getElementById("images_type");
imagestype.addEventListener("change", changeimageoption)


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

typechangesfx.play();
});

function fourmsubmit(engine){
const values = Object.fromEntries(new FormData(SearchEngine).entries());
localStorage.setItem('lastSearch', JSON.stringify(values));
}

function changeoption(){
  optionschangesfx.play();
}

function changeimageoption(){
  imageoptionschangesfx.play();
}