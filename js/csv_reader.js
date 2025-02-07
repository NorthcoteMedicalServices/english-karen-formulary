// Fetch the drug list data and insert into the HTML list
function fillDrugList() {
    let data = fetch("../assets/drugDetails.csv")
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

// Inserts links based on drug names into text
// This process is computationally inefficient, but requires no special formatting in the data
function insertLinks(text, names, self) {
    // Loop through drug names and create links
    for (let i = 0; i < names.length; i++) {
        if (text.toLowerCase().includes(names[i].toLowerCase()) && names[i] != self) {
            // Replace for lower case and upper case
            text = text.replaceAll(names[i], "<a href='detail.html?item=" + names[i] + "'>" + names[i] + "</a>")
            text = text.replaceAll(names[i].toLowerCase(), "<a href='detail.html?item=" + names[i] + "'>" + names[i] + "</a>")
        }
    }

    // Now replace table names (just hardcoded since it's like that overall)
    let pdfs = [
        'Essential Drug Formulary 2021 edition', '1,218',
        'Introduction To 2021 Edition', '8,11',
        'Introduction To 2013 Edition', '12,14',
        'Genereal Guidelines On How To Use The Formulary', '15, 16',
        'Drugs In Pregnancy', '17,18',
        'Drugs and G6PD Deficiency', '19,20',
        'Drugs List By Group', '21,23',
        'About Ferros (Iron), Vitamins and Multivitamins', '135,136',
        'Combination Treatment For Genito-Urinary Diseases', '137,172',
        'Drugs Used For Post Partum Haemorrage (PPH) And Missed Or Incomplete Abortion', '139,143',
        'About Anti-Retroviral Drugs', '145,146',
        'Use Of Antibiotics In Combination', '147,149',
        'Drugs For The Treatement of New Cases Of TB', '150,159',
        'Antiseptics - Disinfectants', '160,162',
        'Wound Care / Abscess Care', '163,163',
        'IV Fluids', '164,169',
        'Malaria Protocols', '170,202',
        'Vaccination Schedule', '203,204'
    ]

    for (let i = 0; i < pdfs.length; i += 2) {
        if (text.toLowerCase().includes(pdfs[i].toLowerCase())) {
            // Replace for lower case and upper case
            text = text.replaceAll(pdfs[i], "<a href='pdf_viewer.html?pageRange=" + pdfs[i + 1] + "'>" + pdfs[i] + "</a>")
            text = text.replaceAll(pdfs[i].toLowerCase(), "<a href='pdf_viewer.html?pageRange=" + pdfs[i + 1] + "'>" + pdfs[i] + "</a>")
        }

        console.log(text.toLowerCase())
        console.log(pdfs[i].toLowerCase())
    }

    return text
}

// Fetch data for a specific drug and populate the detail page
function populateDrugDetail(name, lang) {
    let data = fetch("../assets/drugDetails.csv")
                .then(response => response.text())
                .then(data => {
                    // Now we have the data
                    data = parseCSV(data)

                    // This row holds the section titles
                    let categories = data[0]
                    let titles = data[1]
                    let info = null

                    // Names of drugs (for creating links)
                    let names = []
                    
                    // Loop through and find the relevant drug
                    for (let i = 2; i < data.length; i++) {
                        names.push(data[i][0]);

                        if (data[i][0] == name) {
                            info = data[i]
                        }
                    }

                    if (info == null) {
                        // Couldn't find it, something has gone wrong
                        return
                    }

                    // Now insert into HTML page
                    let obj = document.getElementById("drug-info")

                    // Remove anything already in there (for language swapping)
                    obj.innerHTML = ''

                    // Set title seperately
                    let title = document.getElementById("title")
                    title.innerHTML = info[0]

                    
                    //document.getElementById("MEDICATION").textContent = info[0]

                    // Then set individual parts
                    for (let i = 1; i < categories.length; i++) {
                        // If no content or wrong language, skip
                        if (info[i] == null || info[i].length == 0 || !categories[i].endsWith(lang)) {
                            continue
                        }

                        // Insert links into text where applicable
                        let txt_with_links = insertLinks(info[i], names, info[0])

                        // Otherwise, create div
                        let div = document.createElement('div')
                        div.id = categories[i]

                        // Insert title into div
                        let title = document.createElement('h2')
                        title.textContent = titles[i]
                        div.appendChild(title)

                        // Insert text
                        let text = document.createElement('p')
                        text.innerHTML = txt_with_links
                        div.appendChild(text)

                        // Finally, write div
                        obj.appendChild(div)
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
            row = []
            current = ""
        } else {
            current += c
        }
    }

    // Push anything left over
    if (row != "") {
        if (current != "") {
            row.push(current)
        }

        obj.push(row)
    }

    return obj
}