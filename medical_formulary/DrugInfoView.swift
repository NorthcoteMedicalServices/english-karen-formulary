//
//  DrugInfoView.swift
//  medical_formulary
//
//  Created by Parker Lowney on 10/16/24.
//

import SwiftUI

struct DrugInfoView: View {
    @State private var isON = false
    let name: String
    
    init(_ name: String) {
        self.name = name
    }
    
    var body: some View {
        Toggle(isOn: $isON) {
            Text("English/[Karen]")
        }
        .frame(alignment: .topLeading)
        .padding()
        
        Text(name + " info goes here").frame(maxHeight: .infinity)
    }
}

#Preview {
    DrugInfoView("Preview")
}
