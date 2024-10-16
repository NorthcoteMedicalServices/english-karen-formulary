//
//  HomeView.swift
//  medical_formulary
//
//  Created by Parker Lowney on 10/9/24.
//

import SwiftUI

struct HomeView: View {
    var body: some View {
        NavigationStack {
            VStack {
                NavigationLink {
                    DListView()
                } label: {
                    Text("Drug Search")
                }
                .buttonStyle(.borderedProminent)
                .padding()
                
                NavigationLink {
                    PDFView("Z-Scores")
                } label: {
                    Text("Z-Scores")
                }
                .buttonStyle(.borderedProminent)
                .padding()
                
                NavigationLink {
                    PListView()
                } label: {
                    Text("View Formulary")
                }
                .buttonStyle(.borderedProminent)
                .padding()
                
                NavigationLink {
                    PDFView("Drugs in Pregnancy")
                } label: {
                    Text("Drugs in Pregnancy")
                }
                .buttonStyle(.borderedProminent)
                .padding()
                
                NavigationLink {
                    PDFView("Malaria Protocols")
                } label: {
                    Text("Malaria Protocols")
                }
                .buttonStyle(.borderedProminent)
                .padding()
                
                NavigationLink {
                    PDFView("Drugs for the Treatment of New Cases of TB")
                } label: {
                    Text("Drugs for the Treatment of New Cases of TB")
                }
                .buttonStyle(.borderedProminent)
                .padding()
            }
        }
    }
}

struct MyView: View {
    var name: String
    init(name given: String) {
        name = given
    }
    
    var body: some View {
        Text(name)
    }
}

#Preview {
    HomeView()
}
