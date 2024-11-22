// Given a CSV file in string form, parse into json object
function parseCSV(str) {
    
}

// Fetch the drug list data and insert into the HTML list
function getDrugList() {
    let data = fetch("./assets/inputFile.txt")
                .then(response => response.text())
                .then(data => {
                    // Now we have the data
                    data = data.split("\n")
                    let list = document.getElementById("drug_list")
            
                    for (i = 0; i < data.length; i++) {
                        let li = document.createElement('li')
                        li.innerText = data[i]
                        li.setAttribute("onclick", "navigateToDetailPage(\"" + data[i] + "\")")
                        list.appendChild(li)
                    }
                })
}