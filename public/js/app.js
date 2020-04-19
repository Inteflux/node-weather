const weatherForm = document.querySelector("form")
const search = document.querySelector("input")
const messageOne = document.getElementById("message-1")
const messageTwo = document.getElementById("message-2")

// test
weatherForm.addEventListener("submit", (e) => {
  e.preventDefault()

  const location = search.value
  messageOne.textContent = "Loading..."
  messageTwo.textContent = ""
  getWeather(location)
})

function getWeather (city) {
  fetch(`http://localhost:3000/weather?address=${city}`).then((res) => {
    res.json().then((data) => {
      if (data.error) {
        messageOne.textContent = data.error
      } else {
        messageOne.textContent = data.location
        messageTwo.textContent = data.forecast
      }
    });
  });
  }
