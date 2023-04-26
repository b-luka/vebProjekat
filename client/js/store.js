window.addEventListener('scroll', () => {

    const albumTop = document.getElementById('album_img').getBoundingClientRect().top;

    document.getElementById('album_img').style.width = albumTop > 0 ? "calc(100vw - " + (albumTop / 3) + "vh)"
    : document.getElementById('album_img').style.maxWidth;

    document.getElementById('album_img').style.marginTop = albumTop > 0 ? (albumTop / 20) + "vh"
    : document.getElementById('album_img').style.marginTop = albumTop;
});

document.getElementById('album_img').addEventListener('mouseenter', () => {
    var element = document.getElementById('tracklist');
    var op = 0;
    var timer = setInterval(() => {
        if (op >= 1) {
            clearInterval(timer);
        }
        element.style.opacity = op;
        op += 0.1;
    }, 10);
});

document.getElementById('album_img').addEventListener('mouseleave', () => {
    var element = document.getElementById('tracklist');
    var op = 1;
    var timer = setInterval(() => {
        if (op <= 0) {
            clearInterval(timer);
        }
        element.style.opacity = op;
        op -= 0.1;
    }, 10);
});

const getTextEN = async () => {
    const res = await fetch("http://localhost:8008/indexTextEN");
    const data = await res.json();

    return data;
}

const getTextSR = async () => {
    const res = await fetch("http://localhost:8008/indexTextSR");
    const data = await res.json();

    return data;
}

var language = "en";
sessionStorage.setItem("lang", language);

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

getTextEN().then(texts => {
    texts.forEach(text => {
        document.getElementById(text.div_id).innerHTML = text.content;
        console.log(text);
    })
});