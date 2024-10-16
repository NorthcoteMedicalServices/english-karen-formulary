//
//  DListView.swift
//  medical_formulary
//
//  Created by Parker Lowney on 10/16/24.
//

import SwiftUI

struct DListView: View {
    let drugs = ["Drug 1", "Drug 2", "Drug 3", "Drug 4", "An item", "Wrods"]  // Example list
    @State private var searchText = ""
    
    var body: some View {
        VStack {
            NavigationStack {
                List {
                    ForEach(results, id: \.self) { drug in
                        NavigationLink {
                            DrugInfoView(drug)
                        } label: {
                            Text(drug)
                        }
                    }
                }
                .navigationTitle("Karen Formulary")
                .searchable(text: $searchText, placement: .navigationBarDrawer(displayMode: .always))
            }
        }
    }
    
    // Filter list to only matches for search
    var results: [String] {
        if (searchText.isEmpty) {
            return drugs
        } else {
            return drugs.filter { $0.lowercased().contains(searchText.lowercased()) }
        }
    }
}

#Preview {
    DListView()
}
