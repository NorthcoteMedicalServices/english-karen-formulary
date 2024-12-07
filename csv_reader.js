// Fetch the drug list data and insert into the HTML list
function getDrugList() {
    let data = fetch("./assets/finalTest.csv")
                .then(response => response.text())
                .then(data => {
                    // Now we have the data
                    data = parseCSV(data)
                    let list = document.getElementById("drug_list")
            
                    // Loop through and add each item to the drug list
                    for (let i = 2; i < data.length; i++) {
                        let li = document.createElement('li')
                        li.innerText = data[i][0]
                        li.setAttribute("onclick", "navigateToDetailPage(\"" + data[i][0] + "\")")
                        list.appendChild(li)
                    }
                })
}

// Parse a CSV string into a double array
function parseCSV(data) {
    let obj = [],
    row = [],
    inQuote = false,
    current = ""

    // Loop through each char
    let c = 'a'
    for (let i = 0; i < data.length; i++) {
        c = data[i]

        if (c == '\"') {
            inQuote = !inQuote
        } else if (c == ',' && !inQuote) {
            row.push(current)
            current = ""
        } else if (c == '\n' && !inQuote) {
            obj.push(row)
            //console.log(row)
            row = []
            current = ""
        } else {
            current += c
        }
    }

    return obj
}