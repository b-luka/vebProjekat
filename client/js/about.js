let lang=sessionStorage.getItem("lang");

const getLogo = async () => {
    const res = await fetch("http://localhost:8008/logo");
    const data = await res.json();

    return data;
}

getLogo().then(rows => {
    rows.forEach(row => {
        document.getElementById(row.html_id).setAttribute('src', "data:image/png;charset=utf-8;base64, " + row.img);
    });
});

const getBG = async () => {
    const res = await fetch("http://localhost:8008/blobs2html");
    const data = await res.json();

    return data;
}

getBG().then(rows => {
    rows.forEach(row => {
        document.getElementById(row.html_id).setAttribute('src', "data:image/png;charset=utf-8;base64, " + row.img);
    });
});

const getTextEN = async () => {
    const res = await fetch("http://localhost:8008/aboutTextEn");
    const data = await res.json();

    return data;
}

const getTextSR = async () => {
    const res = await fetch("http://localhost:8008/aboutTextSR");
    const data = await res.json();

    return data;
}

if(lang=="en"){
    getTextEN().then(texts => {
        texts.forEach(text => {
            document.getElementById(text.div_id).innerHTML = text.content;
            console.log(text);
        })
    });
}
if(lang=="sr"){
    getTextSR().then(texts => {
        texts.forEach(text => {
            document.getElementById(text.div_id).innerHTML = text.content;
            console.log(text);
        })
    });
}

document.getElementById('lang_en').addEventListener('click', () => {
    lang = "en";
    sessionStorage.setItem("lang", lang);
    console.log(lang);

    getTextEN().then(texts => {
        texts.forEach(text => {
            document.getElementById(text.div_id).innerHTML = text.content;
            console.log(text);
        });
    });
});

document.getElementById('lang_sr').addEventListener('click', () => {
    lang = "sr";
    sessionStorage.setItem("lang", lang);
    console.log(lang);

    getTextSR().then(texts => {
        texts.forEach(text => {
            document.getElementById(text.div_id).innerHTML = text.content;
            console.log(text);
        });
    });
});