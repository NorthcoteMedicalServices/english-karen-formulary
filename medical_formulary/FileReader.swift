//
//  FileReader.swift
//  medical_formulary
//
//  Created by Parker Lowney on 10/18/24.
//

import Foundation
import SwiftUI    // REMOVE LATER

class FileReader {
    /* Read the contents of a txt file into a raw string */
    static func read_txt(filename file: String) -> String {
        if let url = Bundle.main.url(forResource: file, withExtension: "txt") {
            // We found it
            if let contents = try? String(contentsOf: url, encoding: .utf8) {
                return contents
            } else {
                return "Couldn't load file"
            }
        } else {
            return "Couldn't find file"
        }
    }
    
    /* Parse a raw csv string into a double array */
    static func read_csv_raw(filename file: String) -> String {
        if let url = Bundle.main.url(forResource: file, withExtension: "csv") {
            // We found it
            if let contents = try? String(contentsOf: url, encoding: .utf8) {
                return contents
            } else {
                return "Couldn't load file"
            }
        } else {
            return "Couldn't find file"
        }
    }
    
    static func parse_csv(csvString: String) -> [[String]] {
        // Split by new lines to get rows
        let rows = csvString.components(separatedBy: "\n")
           
        // 2D array to hold CSV data
        var csvArray: [[String]] = []
        
        // Regex pattern to match CSV fields with quotes and commas
        // https://developer.apple.com/documentation/foundation/nsregularexpression
        
        let regexPattern = #"(?<=^|,)(?:"([^"]*(?:""[^"]*)*)"|([^",]*))(?=,|$)"#
        
        for row in rows {
            var columns: [String] = []
            
            // Apply the regex pattern to capture quoted and unquoted fields
            let regex = try! NSRegularExpression(pattern: regexPattern, options: [])
            let matches = regex.matches(in: row, range: NSRange(row.startIndex..., in: row))
            
            for match in matches {
                let range1 = Range(match.range(at: 1), in: row)
                let range2 = Range(match.range(at: 2), in: row)
                
                // If there's a quoted field, use it and remove any escaped quotes
                if let quotedField = range1 {
                    let field = row[quotedField].replacingOccurrences(of: "\"\"", with: "\"")
                    columns.append(field)
                } else if let unquotedField = range2 {
                    columns.append(String(row[unquotedField]))
                }
            }
            
            // Append columns array to the csvData array
            csvArray.append(columns)
        }
        
        return csvArray
    }



}




// Testing preview
#Preview {
    // Read CSV file and parse it
    let csvRaw: String = FileReader.read_csv_raw(filename: "finalTest")
    let csvDataArray = FileReader.parse_csv(csvString: csvRaw)
    
    Text(csvDataArray[1][0])
    Text(csvDataArray[2][0])
    Text(csvDataArray[1][1])
    Text(csvDataArray[2][1])
    Text(csvDataArray[1][2])
    Text(csvDataArray[2][3])

}
