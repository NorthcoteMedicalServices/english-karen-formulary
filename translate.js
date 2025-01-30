//translate.js

let language = 0; // 0 is for english, 1 is for karen
let elements;
let lang = localStorage.getItem("lang");
let navbar = `
  <div class = "navButton arrow left" id="backArrow" onclick="history.back()"></div>
    <a class = "navButton" id="homeButton" href="index.html"><img src="assets/homeIcon.png" alt=""></a>
    <div class = "navButton" id="translateButton">
      <label class="slider">
        <input id = "toggle" type="checkbox">
        <span class="slider-button" onclick="translatePage()"></span>
        <display:inline-block;>
    </label>    
    </div>
`

document.addEventListener("DOMContentLoaded", () => {

  elements = document.getElementsByClassName("translate");
  if(elements.length > 0){
    translate();
  }else{
    callDrugDetails();
  }


  document.getElementById("navbar").innerHTML += navbar;
  let toggle = document.getElementById("toggle");
  if(lang == "kar"){
    toggle.checked = true;
  }
});

function translatePage(){
  //swap localStorage language
  localStorage.setItem("lang", (localStorage.getItem("lang") == "kar") ? "eng" : "kar");
  translate()
  callDrugDetails();
}

function callDrugDetails(){
  try {
    drugDetails();
  } catch (error) {
    console.log("not on drug detail page");
  }
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
  home1:["DRUG SEARCH","တၢ်ဃုကသံၣ်"],
  home2:["Z-SCORES","Z-SCORES"],
  home3:["VIEW FORMULARY","တၢ်ကွၢ်ကသံၣ်လံာ်နဲၣ်ကျဲအံၤ"],
  home4:["DRUGS IN PREGNANCY","ကသံၣ်သ့ၣ်တဖၣ်လၢၦၤမိၢ်ဒၢဂီၢ်"],
  home6:["TB (TUBERCULOSIS)", "tb kar"],
  home5:["Malaria", "malaria kar"],
  //Drug Search

  // Table of contents
  tc1:["Essential Drug Formulary 2021 edition","ကသံၣ်လံာ်နဲၣ်ကျဲ"],
  tc2:["Introduction To 2021 Edition","၂၀၂၁ ကသံၣ်လံာ်နဲၣ်ကျဲ"],
  tc3:["Introduction To 2013 Edition","၂၀၁၃ ကသံၣ်လံာ်နဲၣ်ကျဲ"],
  tc4:["Genereal Guidelines On How To Use The Formulary","တၢ်သိၣ်တၢ်သီလၢတၢ်ကဘၣ်သူလံာ်တၢ်နဲၣ်ကျဲအံၤဒ်လဲၣ်"],
  tc5:["Drugs In Pregnancy","ကသံၣ်သ့ၣ်တဖၣ်လၢၦၤမိၢ်ဒၢဂီၢ်"],
  tc6:["Drugs and G6PD Deficiency","ကသံၣ်ဒီး(ကၠံၤစံၣ်ဖံၤဒံၤ)လီၤထုးတဖၣ်"],
  tc7:["Drugs List By Group","ကသံၣ်တဖၣ်ဘၣ်တၢ်ရဲၣ်လီၤအီၤလၢအကဂူၢ်"],
  tc8:["About Ferros (Iron), Vitamins and Multivitamins","ဘၣ်ဃးဒီးထး(Ferrous/Iron) ၀ံၤတၤမံၤဒီး၀ဲၤတၤမံၤပာ်ဖှိၣ်တဖၣ်"],
  tc9:["Combination Treatment For Genito-Urinary Diseases","တၢ်ကူဆါယါဘျါကသံၣ်လၢဘၣ်တၢ်ပာ်ဖှိၣ်ဃုာ်အီၤလၢပိာ်မုၣ်ပိာ်ခွါက့ၢ်ဂီၤတၢ်ဆါတဖၣ်"],
  tc10:["Drugs Used For Post Partum Haemorrage (PPH) And Missed Or Incomplete Abortion","ကသံၣ်လၢတၢ်သူအီၤလၢအိၣ်ဖျဲၣ်၀ံၤသွံၣ်လူဒီးဖိသၣ်ဟးဂီၤလၢဒၢလီၢ်ပူၤ(ဟုးဟးဂီၤ) မ့ မိၢ်ဒၢဟုးလီၤဖှံၣ်တ၀ာ်"],
  tc11:["About Anti-Retroviral Drugs","ဘၣ်ဃးဒီး(အဲၤထံၤရံၤထြိၤ၀ံၤရၤ)ကသံၣ်တဖၣ"],
  tc12:["Use Of Antibiotics In Combination","တၢ်သူ၀ဲကသံၣ်မၤသံ (ဘၣ်ထံရံယၤ) ဃၢ်တဖၣ်လၢအဘၣ်တၢ်ပာ်ဖှိၣ်ဃုာ်အီၤ"],
  tc13:["Drugs For The Treatement of New Cases Of TB","ကသံၣ်ကူစါယါဘျါ(ထံၣ်ဘံၣ်)ဃၢ်လၢၦၤလၢအဘၣ်တၢ်ဆါအသီတဖၣ်အဂီၢ်"],
  tc14:["Antiseptics - Disinfectants","ကသံၣ်ထံမၤသံ(ဘၣ်ထံရံယၤ)ဒီး(၀ံၤရူစ်)ဃၢ်လၢဖုဒါခိၣ်ဒီးတၢ်ပီးတၢ်လီအကလုာ်ကလုာ်"],
  tc15:["Wound Care / Abscess Care","တၢ်ကွၢ်ထွဲတၢ်ပူၤလီၢ်၊တၢ်ကွၢ်ထွဲ တၢ်အဖံ(၀့ထီၣ်) တဖၣ်"],
  tc16:["IV Fluids","ကသံၣ်လၢဘၣ်သွီလၢသွံၣ်ကျိၤ (အံသၣ်ထံတဖၣ်)"],
  tc17:["Malaria Protocols","တၢ်ညၣ်ဂိၢ်ဃၢ်ကသံၣ်အကျိၤအကျဲ"],
  tc18:["Vaccination Schedule","ကသံၣ်ဒီသဒၢအတၢ်ရဲၣ်တၢ်ကျဲၤ (ယိၤကီၢ် ၊ ပယီၤကီၢ်)"]

};