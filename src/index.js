import HelloWorldButton from "./components/helloworld-button/hello-world-button.js";
import Heading from "./components/heading/heading.js";
import addImage from "./add-image.js";

const heading = new Heading();
heading.render();
const helloWorldButton = new HelloWorldButton();
helloWorldButton.render();

// addImage();

if (process.env.NODE_ENV === "production") {
  console.log("Production mode");
} else if (process.env.NODE_ENV === "development") {
  console.log("Development mode");
}
