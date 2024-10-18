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
    
    @ObservedObject var model = Model()
    

    
    init(_ name: String) {
        self.name = name
    }
    
    var body: some View {
        Toggle(isOn: $isON) {
            Text("English/[Karen]")
        }
        .frame(alignment: .topLeading)
        .padding()
        
        Text(model.data).frame(maxHeight: .infinity)
    }
}

class Model: ObservableObject {
    @Published var data: String = ""
    init() { self.load(file: "gabe_test") }
    func load(file: String) {
        if let filepath = Bundle.main.path(forResource: file, ofType: "txt") {
            do {
                let contents = try String(contentsOfFile: filepath)
                DispatchQueue.main.async {
                    self.data = contents
                }
            } catch let error as NSError {
                print(error.localizedDescription)
            }
        } else {
            print("File not found")
        }
    }
}
    
    
    #Preview {
        DrugInfoView("Preview")
    }
    
