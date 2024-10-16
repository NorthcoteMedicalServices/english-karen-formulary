//
//  PDFView.swift
//  medical_formulary
//
//  Created by Parker Lowney on 10/16/24.
//

import SwiftUI

struct PDFView: View {
    let name: String
    
    init(_ name: String, _ id: Int = 0) {
        self.name = name
    }
    
    var body: some View {
        Text(name + " PDF goes here")
    }
}

#Preview {
    PDFView("Preview")
}
