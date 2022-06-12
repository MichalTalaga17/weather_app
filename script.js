const form = document.querySelector("form");
const body = document.querySelector("body");
const input = document.querySelector("input");
const wynik1 = document.querySelector(".wynik");
const error = document.querySelector(".error");
const div = document.createElement("div");
const div2 = document.createElement("div");

const div3 = document.createElement("div");

const div4 = document.createElement("div");


const lokalizuj = document.querySelector(".lokalizuj")

div.className += "aktualna";
div2.className += "godzinowa";
div3.className += "dzienna";
div4.className += "zanieczyszczenie";
function clear(){
    div2.innerHTML = "<h1 class='prognoza_godzinowa_tytuł'> Prognoza godzinowa</h1 > "
    div3.innerHTML = "<h1 class='prognoza_dzienna_tytuł'> Prognoza dzienna</h1> "
    div4.innerHTML = "<h1 class='zanieczyszczenie_tytuł'> Zanieczyszczenie powietrza</h1>"
}
function temp_cel(kelwin) {
    celcjusz = Math.round(kelwin - 273.15)
    return celcjusz

}
function date(UNIX_date) {
    var a = new Date(UNIX_date * 1000);
    var months = ['Stycznia', 'Lutego', 'Marca', 'Kwietnia', 'Maja', 'Czerwca', 'Lipca', 'Sierpnia', 'Września', 'Października', 'Listopada', 'Grudznia'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    if (hour < 10) {
        hour = "0" + hour
    }
    var min = a.getMinutes();
    if (min < 10) {
        min = "0" + min
    }
    
    var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min;
    return time;
}
function time(UNIX_date) {
    var a = new Date(UNIX_date * 1000);
    var hour = a.getHours();
    if (hour < 10) {
        hour = "0" + hour
    }
    var min = a.getMinutes();
    if (min < 10) {
        min = "0" + min
    }
    var time = hour + ':' + min;
    return time;
}
function days(UNIX_date) {
    var a = new Date(UNIX_date * 1000);
    var months = ['Stycznia', 'Lutego', 'Marca', 'Kwietnia', 'Maja', 'Czerwca', 'Lipca', 'Sierpnia', 'Września', 'Października', 'Listopada', 'Grudznia'];
    var month = months[a.getMonth()];
    var date = a.getDate();

    var time = date + ' ' + month;
    return time;
}

form.addEventListener("submit", e => {
    clear();
    e.preventDefault();
    wynik1.innerHTML = "";
    pogoda();
    prognoza();
    powietrze();
    form.reset();
    input.focus();


})

lokalizuj.addEventListener("click", e => {
    clear();
  e.preventDefault();
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
})


function showPosition(position) {
  x = position.coords.latitude;
  y = position.coords.longitude;
  
  wynik1.innerHTML = "";
  pogoda_local();
  prognoza_local();
  powietrze_local()

}
