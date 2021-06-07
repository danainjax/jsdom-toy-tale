const addBtn = document.querySelector("#new-toy-btn");
const toyForm = document.querySelector(".container");
const toyCollection = document.querySelector('#toy-collection')
let addToy = false;
// document.querySelector("#form")
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
          <button data-id="${toy.id}" class="like-btn">Like <3</button>
        </div>

        `
        console.log(toy)
      })
      toyCollection.innerHTML += toysHTML.join('')
      console.log(toyCollection)
    })

    
    function newToy(toy) {
      const toyName = toy.name.value
      const toyImage = toy.image.value

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
        <button data-id="${newToy.id}" class="like-btn">Like</button>
    </div>

      `
      toyCollection.innerHTML += newToyHTML
      // toyCollection.innerHTML += newToyHTML.join("")
      }) 
    }
    toyCollection.addEventListener("click", (e) => {
      
      
      if (e.target.className === "like-btn") {
        // /traverses the DOM
        let currentLikes = 
        parseInt(e.target.previousElementSibling.innerText)
        let newLikes = currentLikes + 1 + " Likes"
        e.target.previousElementSibling.innerText = newLikes 
        

        fetch(`http://localhost:3000/toys/:${e.target.id}`, {
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
      // hide & seek with the form
      
      addToy = !addToy;
      if (addToy) {
        toyForm.style.display = "block";
        toyForm.addEventListener("submit", event=> {
          event.preventDefault()
          newToy(event.target)
        })
      } else {
        toyForm.style.display = "none";
      }
    }
  
  )
})

