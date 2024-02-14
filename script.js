// Gjør HTML-elementene usynlige. De blir synliggjort når "search"-funksjon kjører
document.getElementById("table").style.visibility = "hidden"
document.getElementById("image").style.visibility = "hidden"

// Funksjon som søker etter karakter basert på navn gitt av bruker, og legger inn vedlagte data i HTML-dokumentet om den finner data
function search() {
    userInput = document.getElementById("textInput").value.trim()

    if (userInput === "") {
        document.getElementById("table").style.visibility = "hidden"
        document.getElementById("image").style.visibility = "hidden"

        document.getElementById("name").innerHTML = "Please input a name"
        return
    }

    fetch("https://hp-api.onrender.com/api/characters")
        .then(response => response.json())
        .then(data => {
            for (let i = 0; i < data.length; i++) {
                if (data[i].name.toLowerCase().includes(userInput.toLowerCase())) {
                    document.getElementById("name").innerHTML = data[i].name
                    document.getElementById("image").src = data[i].image
                    document.getElementById("species").innerHTML = data[i].species
                    document.getElementById("gender").innerHTML = data[i].gender
                    document.getElementById("actor").innerHTML = data[i].actor
                    document.getElementById("house").innerHTML = data[i].house
                    document.getElementById("dateOfBirth").innerHTML = data[i].dateOfBirth
                    document.getElementById("ancestry").innerHTML = data[i].ancestry

                    document.getElementById("table").style.visibility = "visible"
                    document.getElementById("table").style.backgroundColor = "rgb(255, 230, 140)"
                    document.getElementById("image").style.visibility = "visible"

                    break
                } else {
                    document.getElementById("name").innerHTML = `Could not find a character named ${userInput}`

                    document.getElementById("table").style.visibility = "hidden"
                    document.getElementById("image").style.visibility = "hidden"
                }
            }
        })
 }

// Call function "search()" når bruker trykker på "Enter". Sletter også alt som ligger i "input" feltet
document.getElementById("textInput").addEventListener("keydown", function () {
    if (event.key === "Enter") {
        search()
        document.getElementById("textInput").value = ""
    }
})