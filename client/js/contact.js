let lang=sessionStorage.getItem("lang");

const getLogo = async () => {
    const res = await fetch("http://localhost:8008/logo");
    const data = await res.json();

    return data;
}

getLogo().then(rows => {
    rows.forEach(row => {
        console.log(document.getElementById(row.html_id));
        document.getElementById(row.html_id).setAttribute('src', "data:image/png;charset=utf-8;base64, " + row.img);
    });
});

const getBG = async () => {
    const res = await fetch("http://localhost:8008/blobs5html");
    const data = await res.json();

    return data;
}

getBG().then(rows => {
    rows.forEach(row => {
        document.getElementById(row.html_id).setAttribute('src', "data:image/png;charset=utf-8;base64, " + row.img);
    });
});

const getTextEN = async () => {
    const res = await fetch("http://localhost:8008/contactTextEn");
    const data = await res.json();

    return data;
}

const getTextSR = async () => {
    const res = await fetch("http://localhost:8008/contactTextSR");
    const data = await res.json();

    return data;
}

if(lang=="en"){
    getTextEN().then(texts => {
        texts.forEach(text => {
            console.log(text.div_id);
            console.log(text.content);
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
            console.log(text.div_id);
            console.log(text.content);
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

document.getElementById("submitMessage").addEventListener("click", () => {
    let username = document.getElementById("usernameInput").value;
    let email = document.getElementById("emailInput").value;
    let message = document.getElementById("messageInput").value;

    if (username != null && username != "" && email != null && email != "" && message != null && message != "") {
    const data = {
        username: username,
        email: email,
        message: message
    };

    const options = {
        method: "post",
        body: JSON.stringify(data),
        headers: {"Content-type":"application/json; charset=UTF-8"}
    };

    fetch("http://localhost:8008/postMessage", options)
        .then(res => res.json())
        .then(json => {
            console.log("message sent");
            console.log(json);
        });
    }
});