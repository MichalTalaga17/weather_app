

function pogoda_local() {
  const url_weather_local = `https://api.openweathermap.org/data/2.5/weather?lat=${x}&lon=${y}&lang=pl&appid=e58dfbc15daacbeabeed6abc3e5d95ca`;
  error.innerHTML = "";
  fetch(url_weather_local)
    .then(response => response.json())
    .then(dane => {
      console.log(dane);
      const {
        clouds,
        dt,
        main,
        name,
        sys,
        weather,
        wind
      } = dane;
      const {
        feels_like,
        humidity,
        temp
      } = main;
      const {
        sunrise,
        sunset
      } = sys;
      const {
        description,
        icon
      } = weather[0];
      const {
        speed,
        deg
      } = wind
      var kierunek = "";
      if (deg < 22.5) {
        kierunek = "N"
      } else if (deg < 67.5) {
        kierunek = "NE"
      } else if (deg < 112.5) {
        kierunek = "E"
      } else if (deg < 157.5) {
        kierunek = "SE"
      } else if (deg < 202.5) {
        kierunek = "S"
      } else if (deg < 247.5) {
        kierunek = "SW"
      } else if (deg < 292.5) {
        kierunek = "W"
      } else if (deg < 337.5) {
        kierunek = "NW"
      } else {
        kierunek = "N"
      }



     var markup3 = ""
            markup3 = markup3 +
                `    
                    <h1 class = "data">${days(dt)}</h1>   
                    <img src="icons/${icon}.png" alt="${description}">
                    <div class="wschod"><h2>Wschód słońca: <span class = "slonce">${time(sunrise)}</span></h2></div>
                    <div class="zachod"><h2>Zachód słońca: <span class = "slonce">${time(sunset)}</span></h2></div>
                    <div class="temperatura"><h1>${temp_cel(temp)} °C</h1></div>
                    <div class="wilgotnosc">
                        <h2>Wilgotność: <span class="wilgotnosc_v">${humidity}</span></h2>
                    </div>
                    <div class="wiatr">
                        <h2>Wiatr: <span class="wiatr-v">${speed} m/s ${kierunek}</span></h2>
                    </div>
                    <div class="temperatura_odczuwalna">
                        <h1>Temperatura odczuwalna: ${temp_cel(feels_like)} °C</h1>
                    </div>
                    `;
            div.innerHTML = markup3;
            wynik1.appendChild(div);
            markup3 = "";

    });

}

function prognoza_local() {

  const url_forecast_local = `https://api.openweathermap.org/data/2.5/forecast?lat=${x}&lon=${y}&lang=pl&appid=e58dfbc15daacbeabeed6abc3e5d95ca`;

  error.innerHTML = "";
  fetch(url_forecast_local)
    .then(response => response.json())
    .then(dane => {
      console.log(dane);
      var markup1 = ""
      for (i = 0; i < 4; i++) {
        const {
          list
        } = dane;
        const {
          dt,
          main,
          pop,
          weather
        } = list[i];
        const {
          temp
        } = main;
        const {
          description,
          icon
        } = weather[0];

        markup1 = markup1 +
          `    
                    <div class="godz godz_${i}">
                        <h1 class = "godzina">${time(dt)}</h1>
                        <img src="icons/${icon}.png" alt="${description}">
                        <h1 class = "temp">${temp_cel(temp)} &#x2103</h1>
                        <div class="opady"><h2>Opady:</h2>
                        <h1 class="opady_wartość">${Math.round(pop+0.49)}%</h1></div>
                    </div>
                    `;
      }
      
      div2.innerHTML += markup1;
      wynik1.appendChild(div2);

      var markup2 = ""
      for (i = 8; i < 33; i = i + 8) {
        const {
          list
        } = dane;
        const {
          dt,
          main,
          pop,
          weather
        } = list[i];
        const {
          temp
        } = main;
        const {
          description,
          icon
        } = weather[0];

        console.log(temp_cel(temp));
        markup2 = markup2 +
          `    
                    <div class="dzien dzien_${i}">
                        <h1 class = "dzień">${days(dt)}</h1>
                        <img src="icons/${icon}.png" alt="${description}">
                        <h1 class = "temp">${temp_cel(temp)} &#x2103</h1>
                        <div class="opady"><h2>Opady:</h2>
                        <h1 class="opady_wartość">${Math.round(pop+0.49)}%</h1></div>
                    </div>
                    `;
      }
      div3.innerHTML += markup2;
      wynik1.appendChild(div3);
    });
}

function powietrze_local() {
  const url_weather = `https://api.openweathermap.org/data/2.5/weather?lat=${x}&lon=${y}&lang=pl&appid=e58dfbc15daacbeabeed6abc3e5d95ca`;
  fetch(url_weather)
    .then(response => response.json())
    .then(dane => {
      console.log(dane);
      const {
        name
      } = dane;
      const url_air_pollution_local = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${x}&lang=pl&lon=${y}&appid=e58dfbc15daacbeabeed6abc3e5d95ca`;
      error.innerHTML = "";
      fetch(url_air_pollution_local)
        .then(response => response.json())
        .then(dane => {
          console.log(dane);
          const {
            list
          } = dane;
          console.log(list);

          a = list[0];
          console.log(a);
          const {
            main,
            components,
            dt
          } = a;
          dt_new = date(dt)
          const {
            aqi
          } = main;

          const {
            co,
            no2,
            o3,
            pm10,
            pm2_5,
            so2
          } = components;
          var color = "";
          var num = "";
          if (aqi < 50) {
            color = "green";
            num = 1;
          } else if (aqi < 100) {
            color = "yellow";
            num = 2;
          } else if (aqi < 150) {
            color = "orange";
            num = 3;
          } else if (aqi < 200) {
            color = "red";
            num = 4;
          } else if (aqi < 300) {
            color = "#660000";
            num = 5;
          } else if (aqi < 500) {
            color = "#4c1130";
            num = 6;
          };
          const markup1 =
            `
                        
                            <div class="city">${name}<span class="v_aqi"></span></div>
                            
                            <div class="aqi"><span class="name">Aktualna jakość powietrza(<abbr title ="Air Quality Index">AQI</abbr>)  :</span><span class="v_aqi" style="color:${color};"> ${aqi}</span></div>
                            <img src="https://waqi.info/images/emoticons/aqi-label-${num}.svg"  alt="" srcset="">
                            <div class="dane">
                            <div class="co"><span class="name">Stężenie CO<sub></sub></span><br><span class="v_co v">${co}</span></div>
                            <div class="no2"><span class="name">Stężenie NO<sub>2</sub></span><br><span class="v_no2 v">${no2}</span></div>
                            <div class="o3"><span class="name">Stężenie O<sub>3</sub></span><br><span class="v_o3 v">${o3}</span></div>
                            <div class="pm10"><span class="name">Stężenie PM10<sub></sub></span><br><span class="v_pm10 v">${pm10}</span></div>
                            <div class="pm25"><span class="name">Stężenie PM2.5<sub></sub></span><br><span class="v_pm25 v">${pm2_5}</span></div>
                            <div class="so2"><span class="name">Stężenie SO<sub>2</sub></span><br><span class="v_so2 v">${so2}</span></div>
                            </div><br>
                        
                    `;


          div4.innerHTML += markup1;
          wynik1.appendChild(div4);


        });


    });
}