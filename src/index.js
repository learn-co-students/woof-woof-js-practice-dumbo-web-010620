document.addEventListener("DOMContentLoaded", () => { // or add defer in the script index.html
    
    
    // Step 1 - identify the first deliverable, creating a dog-bar
    const dogBarDiv = document.getElementById("dog-bar")
    // Step 10 - identify the second deliverable, show each dog-info
    const dogInfoDiv = document.getElementById("dog-info")
    
    // Step 3 - fetch our data
    fetch("http://localhost:3000/pups")
        .then(response => response.json())
        // .then(console.log) // Step 4 - test ASAP
        // Step 5 - get the array of dogs from our JSON API
        .then(result => {
            // Step 10 - function for iterating over all the dogs
            result.forEach(dog => {
                dogsArray(dog)
            });
        })
     
    // Step 6 - render one dog function, you need this for step 7!!!
    function dogsArray(dog) {
        // Step 7 - creating a new element called "span"
        const dogSpan = document.createElement("span")
        // Step 8 - create text content in our newly created element
        dogSpan.textContent = dog.name
        // Step 11 - create event for clicking on each dog
        dogSpan.addEventListener("click", () => {
            // Step 12 - display the boolean equivalent for each dog's isGoodDog 
            console.log("in span click", dog)    
            let goodDogText;
            if (dog.isGoodDog) {
                goodDogText = "Good Dog!"
            } else {
                goodDogText = "Bad Dog!"
            }
            // let goodDogText = dog.isGoodDog ? "Good Dog!" : "Bad Dog!" (same thing)  
            // Step 13 - create dog innerhtml by interpolating
            dogInfoDiv.innerHTML = `
                <img src= ${dog.image}>
                <h2>${dog.name}</h2>
                <button id="good-dog-button">${goodDogText}</button>
            `

            // Step 14 - identify the third deliverable, change dog button when clicked 
            const dogButton = document.getElementById("good-dog-button")
            dogButton.addEventListener("click", () => {
                let newText;
                // if dog is true, return false
                dog.isGoodDog = !dog.isGoodDog
                // just use old code we already have 
                if (dog.isGoodDog) {
                    newText = "Good Dog!"
                } else {
                    newText = "Bad Dog!"
                }
                // Step 15 - old textcontent is replaced with new content
                dogButton.textContent = newText

                // Step 16 - update JSON from clicking the button
                fetch(`http://localhost:3000/pups/${dog.id}`, {
                    method: 'PATCH', // or 'PUT'
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        isGoodDog: dog.isGoodDog
                    }),
                })
            })
        // end of dogSpan event listener
        })
        // Step 9 - appending the newly created dogSpan to the dogBarDiv
        dogBarDiv.append(dogSpan)
    
    // end of dogsArray function
    }
})