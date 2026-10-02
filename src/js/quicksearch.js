import {loadTemplate, renderWithTemplate} from "./utils.mjs";

const headerTemplate = await loadTemplate("../public/partials/header.html");
const headerElement = document.querySelector("#header");
renderWithTemplate (headerTemplate, headerElement);
