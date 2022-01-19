let addToy = false;

const toyUrl="http://localhost:3000/toys"

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
      postToy();
    } else {
      toyFormContainer.style.display = "none";
    }
  });
  //adding all toys to the page
  fetchToys();
});

//// RENDER TOYS

//fetch toys from server
function fetchToys() {
  // To pass the tests, don't forget to return your fetch!
  return fetch(toyUrl)
  .then( (resp) => resp.json() )
  .then( (json) => renderToys(json) );
}

//render toys on page
function renderToys(toys) {
  const collection = document.getElementById('toy-collection');
  toys.forEach(toy => {
    //create card
    const div = document.createElement('div');
    div.className = 'card';
    collection.appendChild(div);
    //add name
    const toyName = document.createElement('h2');
    toyName.textContent=toy.name;
    div.appendChild(toyName);
    //add image
    const toyImg = document.createElement('img');
    toyImg.src=toy.image;
    toyImg.className='toy-avatar';
    div.appendChild(toyImg);
    //add likes
    const toyLikes = document.createElement("p");
    toyLikes.textContent=`${toy.likes} likes`;
    div.appendChild(toyLikes);
    //add like button
    const toyLikeButton = document.createElement('button');
    toyLikeButton.className='like-btn';
    toyLikeButton.textContent='like'
    toyLikeButton.id=`${toy.id}`;
    toyLikeButton.addEventListener('click',clickAction)
    div.appendChild(toyLikeButton)
  });
}


//// ADDING NEW TOY
const postToy = () => {
  const form = document.querySelector('.add-toy-form');
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const newName = event.target.querySelectorAll('.input-text')[0].value;
    const newImg = document.querySelectorAll('.input-text')[1].value;
    submitToyData(newName,newImg);
    form.reset(); 
  })
}

// POST send new toy to the source
const submitToyData = (toyName,toyImage) => {
  const formData = {
      name: toyName,
      image: toyImage,
      likes: 0,
    };
    
    const configurationObject = {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(formData),
    };
    
    return fetch(toyUrl, configurationObject)
      .then(function (response) {
        return response.json();
      })
      .then(function (object) {
        console.log('Successfully Added to the Database')
      })
      .catch(function (error) {
          alert("ERROR");
      });
}

/// PATCH update a toys number of likes 

const clickAction = (event) => {
  const toyId = event.target.id;
  let toyLikeVal = parseInt(event.target.parentNode.querySelector('p').textContent);
  toyLikeVal++;
  console.log(toyLikeVal);
  updateToyLikes(toyLikeVal,toyId);
}

const updateToyLikes = (newLikes,toyId) => {
  const newURL= toyUrl+`/${toyId}`;
  const formData = {
      likes: newLikes,
    };
    
    const configurationObject = {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(formData),
    };
    
    return fetch(newURL, configurationObject)
      .then(function (response) {
        return response.json();
      })
      .then(function (object) {
          console.log('Successfully Updated the Database')
      })
      .catch(function (error) {
          alert("ERROR");
      });
}
