const addBtn = document.querySelector("#new-toy-btn");
const toyFormContainer = document.querySelector(".container");
const toyForm = document.querySelector(".add-toy-form");
let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const toyCollection = document.querySelector("#toy-collection")
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
      <button data id=${object.id} class="like-btn">Like</button>
    </div>
      `
    })
    toyCollection.innerHTML += toysHTML.join("")
  })

  toyForm.addEventListener("submit", function(event) {
    // debugger;
    event.preventDefault()
    
    
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
        likes: 99
      })
    })
    .then(response => response.json())
    .then(newToy => {debugger;
    //   newToyHTML = `
    //   <div class="card">
    //   <h2>${newToy.name}</h2>
    //   <img src=${newToy.image} class="toy-avatar" />
    //   <p>${newToy.likes}</p>
    //   <button data id=${newToy.id} class="like-btn">Like</button>
    // </div>

    //   `
    //   toyCollection.innerHTML += newToyHTML.join("")
    })
    console.log(newToy)
  })

    toyCollection.addEventListener("click", (e) => {
      
      if (e.target.className === "like-btn") {
        // /traverses the DOM
        let currentLikes = 
        parseInt(e.target.previousElementSibling.innerText);
        let newLikes = currentLikes + 1
        e.target.previousElementSibling.innerText = newLikes + " likes"

        fetch(`http://localhost:3000/toys/${e.target.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
          body: JSON.stringify({
            likes: newLikes 
        })
        
        })
      }
    
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


})
