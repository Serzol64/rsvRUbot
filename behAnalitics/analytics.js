//
// Скрипт реоедает данные о расположении пользователя на страницах сайта
//


const behAnCookieName = 'clientCode'    //имя куки для временного кода клиента
const behAnCookieExp = 30               //время жизни куки для временного кода клиента (в днях)

let referrer = document.referrer  // откуда перешел
let url = document.URL           // адрес текущей страницы
let clientId = readCookie(behAnCookieName)  // временнвй ID клиента из куки

let isUserActive = 1;

// если куки нет - генерим и ставим
if (typeof clientId == 'undefined') {
    clientId = Math.floor(Math.random() * 10000000);
    writeCookie(behAnCookieName, clientId, behAnCookieExp)
}

// отправка данных к сервису трекера
function loadXMLDoc() {
    if (isUserActive === 0) return 0;
    var xmlhttp = new XMLHttpRequest();
    var test = ''
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == XMLHttpRequest.DONE) {
            if (xmlhttp.status == 200) {
                let result = xmlhttp.responseText
                mainActions(result)
            }
            else if (xmlhttp.status == 400) {
                alert('There was an error 400');
            }
            else {
                alert('something else other than 200 was returned')
            }
        }
    };

    xmlhttp.open("GET", "http://polyakov-pro.ru/behAnalit/?page=" + url  + '&referrer=' + referrer + '&id=' + clientId, true)
    xmlhttp.send()
}

function readCookie(name) {
    let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ))
    return matches ? decodeURIComponent(matches[1]) : undefined
}

function writeCookie(name, val, expires) {
    let expDate = new Date
    expDate.setDate(expDate.getDate() + expires)
    document.cookie = name+"="+val+"; path=/; expires=" + expDate.toUTCString()
}

// все что нужно сделать после успешного запроса пишем в эту функцию
function mainActions(result) {
    isUserActive = 0;
    console.log('got: ' + result)
    //console.log(JSON.parse(result))

}

function addListen(){
    window.addEventListener("keyup", getEvent);
    window.addEventListener("scroll", getEvent);
    window.addEventListener("click", getEvent);
}

function getEvent(e){
    isUserActive++
}

document.addEventListener('DOMContentLoaded', addListen, false);
loadXMLDoc()
setInterval(loadXMLDoc, 10000)


