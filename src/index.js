const addBtn = document.querySelector("#new-toy-btn");
const toyForm = document.querySelector(".container");
const toyCollection = document.querySelector('#toy-collection')
let addToy = false;
document.querySelector("#form")
// YOUR CODE HERE
  document.addEventListener("DOMContentLoaded", ()=>{

    fetch('http://localhost:3000/toys')
    .then(r => r.json())
    .then(toys => {
      
      //take toys array and make into HTML in order to add to the DOM
      let toysHTML = toys.map(function(toy){
        return `
        <div class="card">
          <h2>${toy.name}</h2>
          <img src=${toy.image} class="toy-avatar" />
          <p>${toy.likes} Likes </p>
          <button class="like-btn">Like <3</button>
        </div>

        `
      })
      toyCollection.innerHTML += toysHTML.join('')
    })

    toyForm.addEventListener("submit", event=> {
      
      event.preventDefault();
      console.log('We got past the event prevent default line')
      
      const toyName = event.target.name.value
      const toyImage = event.target.image.value

      fetch("http://localhost:3000/toys", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },

        body: JSON.stringify({
          name: toyName,
          image: toyImage,
          likes: 0
        })
      })
      .then( r => r.json())
      .then ( newToy => {
        //convert new toy from JSON to HTML to add to the DOM
        let newToyHTML = `
      <div class="card">
        <h2>${newToy.name}</h2>
        <img src=${newToy.image} class="toy-avatar" />
        <p>${newToy.likes}</p>
        <button data id=${newToy.id} class="like-btn">Like</button>
    </div>

      `
      toyCollection.innerHTML += newToyHTML
      // toyCollection.innerHTML += newToyHTML.join("")
      }) 
    })
    addBtn.addEventListener("click", () => {
      // hide & seek with the form
      
      addToy = !addToy;
      if (addToy) {
        toyForm.style.display = "block";
      } else {
        toyForm.style.display = "none";
      }
    })
  })


