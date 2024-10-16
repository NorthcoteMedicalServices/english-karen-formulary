//
//  PDFListView.swift
//  medical_formulary
//
//  Created by Parker Lowney on 10/16/24.
//

import SwiftUI

struct PListView: View {
    var body: some View {
        NavigationStack {
            VStack {
                NavigationLink {
                    PDFView("PDF #1")
                } label: {
                    Text("PDF #1")
                }
                NavigationLink {
                    PDFView("PDF #2")
                } label: {
                    Text("PDF #2")
                }
                NavigationLink {
                    PDFView("Etc.")
                } label: {
                    Text("Etc.")
                }
            }
        }
    }
}

#Preview {
    PListView()
}
