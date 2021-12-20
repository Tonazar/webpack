import art from "./art.jpg";

function addImage() {
  const img = document.createElement("img");
  img.alt = "art";
  img.width = 500;
  img.src = art;

  const body = document.querySelector("body");
  body.appendChild(img);
}

export default addImage;
