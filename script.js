// Get the table
let table = document.getElementById("myTable")

// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btns = document.getElementsByClassName("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// Get the form
let form = document.getElementById('myForm')

let nameArray = ["Smith", "Pascal", "Steve"] // contains all the names
let splitNames;


/* handle form submission */
function handleSubmit () {
  let input = document.getElementById("textField").value

  if(input.length > 0){
    splitNames = input.split(',')

    for(let i = 0; i < splitNames.length; i++){
      nameArray.push(splitNames[i].trim())
    }
  }

  form.reset()

  queryContent(nameArray)
}



/* function to display output */
function queryContent(nameArray) {

  let tbody = document.getElementById("table-body")

  // // reset table
  tbody.innerHTML = ""

  // check if nameArray is not empty
  if(nameArray.length > 0){

    nameArray.forEach((nameInput, index) => {

      let tr = document.createElement("tr")
      tbody.appendChild(tr)

      tr.classList.add("table-row")

      let textdata1 = document.createElement("td")
      let textdata2 = document.createElement("td")

      textdata1.textContent = nameInput

      textdata2.innerHTML = `
        <button type="button" id="editBtn" class="myBtn" onclick="updateEntry(${index})">Edit</button>
        <button type="button" id="deleteBtn" onclick="deleteEntry(${index})">Delete</button>
      `

      tr.append(textdata1, textdata2)
    })
  }
}
queryContent(nameArray)



/* edit entry in array */
function updateEntry(index){

  // Fetch popup form
  let form = document.getElementById("popupForm")

  // When the user clicks on the edit button, open the modal
  for (let i=0; i<btns.length; i++) {
    btns[i].onclick = function() {
      modal.style.display = "block";
    }
  }

  // When the user clicks on <span> (x), close the modal
  span.onclick = function() {
    modal.style.display = "none";
    queryContent(nameArray)
  }

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
      queryContent(nameArray)
    }
  }

  form.innerHTML = `
    <input type="text" id="re-enter" autocomplete="off" required />
    <button type="button" onclick="reSubmit(${index})">Submit</button>
  `

}

/* submit updated entry */
function reSubmit(index){
  let input = document.getElementById("re-enter").value
  if(input){
    nameArray[index] = input

    modal.style.display = "none";
  
    queryContent(nameArray)
  }
}


/* delete entry from array */
function deleteEntry(index){
  nameArray.splice(index, 1)

  queryContent(nameArray)
}
