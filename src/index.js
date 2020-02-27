document.addEventListener("DOMContentLoaded", () => {

    const dogBar = document.querySelector("#dog-bar")
    const dogInfo = document.querySelector("#dog-info")

    function renderPup(pupObj) {
        const newSpan = document.createElement('span')
        newSpan.textContent = pupObj.name

        dogBar.append(newSpan)

        newSpan.addEventListener("click", event => {
            displayPupInfo(pupObj)
        })
    }

    function renderAllPups(pupsArray) {
        pupsArray.forEach(pupObj => renderPup(pupObj))
    }

    function displayPupInfo(pupObj) {

        let dogText; 

        if (pupObj.isGoodDog) {
            dogText = "Good Dog!"
        } else {
            dogText = "Bad Dog!"
        }

        dogInfo.innerHTML = `
            <img src=${pupObj.image}>
            <h2>${pupObj.name}</h2>
            <button id="dog-button">${dogText}</button>
        `
        
        const dogButton = dogInfo.querySelector("#dog-button")
        dogButton.addEventListener("click", event => {
            pupObj.isGoodDog = !pupObj.isGoodDog


            fetch(`http://localhost:3000/pups/${pupObj.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    isGoodDog: pupObj.isGoodDog
                }),
            })
            .then(response => response.json())
            .then(result => {
                if (result.isGoodDog) {
                    dogText = "Good Dog!"
                } else {
                    dogText = "Bad Dog!"
                }   
                dogButton.textContent = dogText
            })
        })
    }

    fetch("http://localhost:3000/pups")
        .then(response => response.json())
        .then(pupsArray => renderAllPups(pupsArray))

})