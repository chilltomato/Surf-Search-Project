const searchtype = document.getElementById("type");

const imagefields = document.getElementById("ImageParameters");

searchtype.addEventListener("change", function (){
const showimage = this.value === "images";

imagefields.classList.toggle ("hidden", !showimage );
});