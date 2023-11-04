const submit = document.querySelector('.submit');
const sourceLang = document.querySelector('.source-lang');
const targetLang = document.querySelector('.target-lang');
const sourceText=document.querySelector('.source-text');
const targetText=document.querySelector('.target-text');
const loader=document.querySelector('.loading');
const content=document.querySelector('.content');


submit.addEventListener('click', postRequest);

async function postRequest() {
    loader.style.display="block";
    content.style.zIndex=0;
    // Get request for getting code of language
    const url2 = 'https://text-translator2.p.rapidapi.com/getLanguages';
    
    const options2 = {
        method: "GET",
        headers: {
            'X-RapidAPI-Key': 'a9030757f8msh1f5e32ad610cf0bp148f4bjsnc946de35f5a7',
            'X-RapidAPI-Host': 'text-translator2.p.rapidapi.com'
        }
    }
    
    let value_of_targetLang = targetLang.value;
    let value_of_sourceLang = sourceLang.value;
    let text_of_sourceLang=sourceText.value;
    value_of_targetLang = value_of_targetLang.toLowerCase();
    value_of_sourceLang = value_of_sourceLang.toLowerCase();
    
    let targetLang_code;
    let sourceLang_code;
    
    let response = await fetch(url2, options2);
    let result = await response.json();
    console.log(result);
    let array_of_languages = result.data.languages;
    for (value of array_of_languages) {
        if (value.name.toLowerCase() == value_of_targetLang) {
            targetLang_code = value.code;
        }
        if (value.name.toLowerCase() == value_of_sourceLang) {
            sourceLang_code = value.code;
        }
    }
    
    // Post request for result
    const url1 = 'https://text-translator2.p.rapidapi.com/translate';
    const option1 = {
        method: "POST",
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'X-RapidAPI-Key': 'a9030757f8msh1f5e32ad610cf0bp148f4bjsnc946de35f5a7',
            'X-RapidAPI-Host': 'text-translator2.p.rapidapi.com'
        },
        body: new URLSearchParams({
            source_language: sourceLang_code,
            target_language: targetLang_code,
            text: text_of_sourceLang
        })
    }
    try{
        let postRespond=await fetch(url1,option1);
        let postData=await postRespond.json();
        targetText.textContent=postData.data.translatedText;
    }catch(e){
        alert('Please Check either your language is correct or not and is source text has something or not :) because following error is throwing: \n\n'+e);
    }
    content.style.zIndex=30;
    loader.style.display="none";
}