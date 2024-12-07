//translate.js

var language = 0; // 0 is for english, 1 is for karen
var elements;

document.addEventListener("DOMContentLoaded", () => {
  elements = document.getElementsByClassName("translate");
  console.log("got elements");
  if(localStorage.getItem("lang") == "kar"){
    translate();
  }
});

function translatePage(){
  //swap localStorage language
  localStorage.setItem("lang", (localStorage.getItem("lang") == "kar") ? "eng" : "kar");
  translate()
}

function translate(){
  lang = localStorage.getItem("lang");
  language =  lang == "eng" ? 0 : 1;
  document.documentElement.lang = localStorage.getItem("lang");
  for(var i = 0; i < elements.length; i++){
    elements[i].innerHTML = translations[elements[i].id][language];
  }
}

// Translations dictionary, key is the element id, with values being an array with
// the english translation at index 0 and Karen translation at index 1
translations = {
  //Home Page
  home1:["DRUG SEARCH","karen drugs"],
  home2:["Z SCORES","karen z"],
  home3:["VIEW FORMULARY","karen view"],
  home4:["DRUGS IN PREGNANCY","karen prego"],
  //Drug Search

  //Z Scores

  // Table of contents
  tc1:["Essential Drug Formulary 2021 edition","karenTest1"],
  tc2:["Introduction To 2021 Edition","karenTest2"],
  tc3:["Introduction To 2013 Edition","karenTest3"],
  tc4:["Genereal Guidelines On How To Use The Formulary","karenTest4"],
  tc5:["Drugs In Pregnancy","karenTest5"],
  tc6:["Drugs and G6PD Deficiency","karenTest6"],
  tc7:["Drugs List By Group","karenTest7"],
  tc8:["About Ferros (Iron), Vitamins and Multivitamins","karenTest8"],
  tc9:["Combination Treatment For Genito-Urinary Diseases","karenTest9"],
  tc10:["Drugs Used For Post Partum Haemorrage (PPH) And Missed Or Incomplete Abortion",""],
  tc11:["About Anti-Retroviral Drugs",""],
  tc12:["Use Of Antibiotics In Combination",""],
  tc13:["Drugs For The Treatement of New Cases Of TB",""],
  tc14:["Antiseptics - Disinfectants",""],
  tc15:["Wound Care / Abscess Care",""],
  tc16:["IV Fluids",""],
  tc17:["Malaria Protocols",""],
  tc18:["Vaccination Schedule",""]

  //Drugs in Pregnancy

};