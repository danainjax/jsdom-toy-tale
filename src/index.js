const addBtn = document.querySelector("#new-toy-btn");
const toyFormContainer = document.querySelector(".container");
let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  console.log("%cThe dom is loaded.", "color :blue")
  fetch("http://localhost:3000/toys")
  .then(response => response.json())
  .then(toys => {
    console.log(toys)
    let toysHTML = toys.map(function(object) {
      return `
    <div class="card">
      <h2>${object.name}</h2>
      <img src=${object.image} class="toy-avatar" />
      <p>${object.likes}</p>
      <button class="like-btn">Like</button>
    </div>
      `
    })
    document.querySelector("#toy-collection").innerHTML += toysHTML.join("")
  })

  toyFormContainer.addEventListener("submit", function(event) {
    event.preventDefault()
    
    const toyName = event.target.name.value
    const toyImage = event.target.image.value
    console.log(toyName, toyImage);
    fetch("http://localhost:3000/toys", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        name: toyName,
        image: toyImage,
        likes: 99
      })
    })
    .then(response => response.json())
    .then(newToy => {
      newToyHTML = `
      <div class="card">
      <h2>${newToy.name}</h2>
      <img src=${newToy.image} class="toy-avatar" />
      <p>${newToy.likes}</p>
      <button class="like-btn">Like</button>
    </div>

      `
      document.querySelector("#toy-collection").innerHTML += newToyHTML.join("")
    })
    console.log(newToy)
  })

  addBtn.addEventListener("click", () => {
    console.log("%cYou clicked the button.", "color :red")
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });


});
