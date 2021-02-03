
$(document).ready(function () {


    //Initialize
    $('.content').hide();
    $('.wrapper-today').show();
    $('.unit-F').toggleClass('active-unit');

    //Nav change tabs
    $('.today-nav').on('click', function () {
        $('.nav-list li').removeClass('active');
        $(this).addClass('active');
        $('.content').hide();
        $('.wrapper-today').show();
    });

    $('.sevenDay').on('click', function () {
        $('.nav-list li').removeClass('active');
        $(this).addClass('active');
        $('.content').hide();
        $('.wrapper-7day').show();
    });

    $('.hourly').on('click', function () {
        $('.nav-list li').removeClass('active');
        $('ul .hourly').addClass('active');
        $('.content').hide();
        $('.wrapper-hourly').show();
    });

    $('.news').on('click', function () {
        $('.nav-list li').removeClass('active');
        $('ul .news').addClass('active');
        $('.content').hide();
        $('.wrapper-news').show();
    });


    //Nav unit conversion buttons
    $('.unit-F').on('click', function () {
        $(this).addClass('active-unit');
        $('.unit-C').removeClass('active-unit');
        PageCtoF()
    });

    $('.unit-C').on('click', function () {
        $(this).addClass('active-unit');
        $('.unit-F').removeClass('active-unit');
        PageFtoC()
    });

    //Seach new location
    $('.search-btn').on('click', function () {
        let val = $('.geo-input').val();
        Weather(val)
    });



    //Unito Conversion
    function PageFtoC() {
        $('.current-temp').html(FtoC($('.current-temp').html()) + '°');
        $('.current-high').html(FtoC($('.current-high').html()) + '°');
        $('.current-low').html(FtoC($('.current-low').html()) + '°');

        $('.today-morning h2').html(FtoC($('.today-morning h2').html()) + '°');
        $('.today-day h2').html(FtoC($('.today-day h2').html()) + '°');
        $('.today-evening h2').html(FtoC($('.today-evening h2').html()) + '°');
        $('.today-night h2').html(FtoC($('.today-night h2').html()) + '°');

        $('.today-feels').html(FtoC($('.today-feels').html()) + '°');
        $('.today-high').html(FtoC($('.today-high').html()) + '° /');
        $('.today-low').html(FtoC($('.today-low').html()) + '°');



        $('.temp-high').each(function () {
            $(this).html(FtoC($(this).html()) + '°');
        });
        $('.temp-low').each(function () {
            $(this).html(FtoC($(this).html()) + '°');
        });
        $('.temp-avg').each(function () {
            $(this).html(FtoC($(this).html()) + '°');
        });
    }

    function PageCtoF() {
        $('.current-temp').html(CtoF($('.current-temp').html()) + '°');
        $('.current-high').html(CtoF($('.current-high').html()) + '°');
        $('.current-low').html(CtoF($('.current-low').html()) + '°');

        $('.today-morning h2').html(CtoF($('.today-morning h2').html()) + '°');
        $('.today-day h2').html(CtoF($('.today-day h2').html()) + '°');
        $('.today-evening h2').html(CtoF($('.today-evening h2').html()) + '°');
        $('.today-night h2').html(CtoF($('.today-night h2').html()) + '°');

        $('.today-feels').html(CtoF($('.today-feels').html()) + '°');
        $('.today-high').html(CtoF($('.today-high').html()) + '° /');
        $('.today-low').html(CtoF($('.today-low').html()) + '°');



        $('.temp-high').each(function () {
            $(this).html(CtoF($(this).html()) + '°');
        });
        $('.temp-low').each(function () {
            $(this).html(CtoF($(this).html()) + '°');
        });
        $('.temp-avg').each(function () {
            $(this).html(CtoF($(this).html()) + '°');
        });
    }

    function FtoC(f) {
        return Math.round((parseInt(f) - 32) * (5 / 9));
    }

    function CtoF(c) {
        return Math.round((parseInt(c) * (9 / 5)) + 32);
    }

    function UnixtoDay(u, timeZone) {
        let unix = u * 1000;

        let day = new Date(unix).toLocaleDateString("en-US", { timeZone: timeZone })
        // //console.log(day)

        return day;
    }

    function UnixtoTime(u, timeZone) {
        let unix = u * 1000;

        let time = new Date(unix).toLocaleTimeString("en-US", { timeZone: timeZone })
        // //console.log(time)

        return time;
    }


    //Time Format Functions
    function GetHour(t) {
        let hIndex = t.search(':');
        let h = t.slice(0, hIndex) + ' ' + t.slice(-2);
        return h;
    }

    const revStr = (string) => string.split("").reverse().join('');
    function GetHourMin(t) {
        let c = t.slice(-2);
        let rev = revStr(t)
        let index = rev.search(':');
        let a = rev.slice(index + 1, rev.length);
        rev = revStr(a) + ' ' + c;

        return rev;
    }

    function TimeofDay(t) {
        $('.bar h2').css('font-weight', 400);
        $('.bar p').css('font-weight', 400);
        let m = t.slice(-2);
        let hIndex = t.search(':');
        let h = t.slice(0, hIndex);
        h = parseInt(h);

        if (m == 'AM') {

            if (h >= 5 && h <= 11) {
                $('.today-morning h2').css('font-weight', 700);
                $('.today-morning p').css('font-weight', 700);
                $('.today-morning h2').css('color', '#4040da');
            } else if (h == 12 || h >= 1 && h <= 4) {
                $('.today-night h2').css('font-weight', 700);
                $('.today-night p').css('font-weight', 700);
                $('.today-night h2').css('color', '#4040da');
            }

        } else if (m == 'PM') {

            if (h == 12 || h >= 1 && h <= 5) {
                $('.today-day h2').css('font-weight', 700);
                $('.today-day p').css('font-weight', 700);
                $('.today-day h2').css('color', '#4040da');
            } else if (h >= 6 && h <= 9) {
                $('.today-evening h2').css('font-weight', 700);
                $('.today-evening p').css('font-weight', 700);
                $('.today-evening h2').css('color', '#4040da');
            } else if (h == 10 || h == 11) {
                $('.today-night h2').css('font-weight', 700);
                $('.today-night p').css('font-weight', 700);
                $('.today-night h2').css('color', '#4040da');
            }

        }
    }

    function GetDay(date) {
        const week = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        let a = new Date(date);
        let b = a.getDate()
        a = a.getDay()
        b = '' + b;
        // //console.log(week[a] + ' ' + b)
        return week[a] + ' ' + b;
    }

    function GetDate() {
        let curDate = new Date()
        temp = curDate.toISOString()
        let i = temp.search('T')
        temp = temp.slice(0, i)
        return temp;
    }


    //Get News
    function News() {
        fetch('http://api.mediastack.com/v1/news?access_key=d99bf880724e38f4ec8d262cdda7e171&countries=us&date=2021-1-17,' + GetDate())
            .then(function (data) {
                return data.json();
            })
            .then(function (data) {
                // console.log(data)


                let image = 0;
                let txt = 0;
                let i = 0;
                //Filter and populate news stories without images
                while (txt < 7) {

                    if (data.data[i].image == null) {
                        $('.news-main-left ul').append(
                            `
                        <li>
                            <a href="${data.data[i].url}">
                                <h5>${data.data[i].title}</h5>
                            </a>
                        </li>
                        `
                        );
                        txt++;
                    }

                    if (i == 24) {
                        break;
                    }
                    i++;
                }

                //Filter and populate news stories with images
                i = 0;
                while (image < 4) {

                    if (data.data[i].image !== null) {
                        $('.news-' + image + ' h3').html(data.data[i].title);
                        $('.news-' + image + ' p').html(data.data[i].description.substring(0, 150) + '...');
                        $('.news-' + image + ' img').attr('src', data.data[i].image);
                        $('.news-' + image + ' a').attr('href', data.data[i].url);
                        image++;
                    }

                    if (i == 24) {
                        break;
                    }
                    i++;
                }

            });

        fetch('https://www.reddit.com/r/USNEWS.json')
            .then(function (response) {
                return response.json();
            })
            .then(function (response) {

                let listItems = $(".news-list li");
                let e = response.data.children;
                let a = 0;

                //Populate top stories
                for (let i = 2; a < 4; i++) {

                    if (e[i].data.thumbnail !== 'self') {
                        $('.news-list').append(
                            `
                            <li>
                                <a href="${e[i].data.url}">
                                <img src="${e[i].data.thumbnail}">
                                <p>${e[i].data.title.substring(0, 45) + '...'}</p>
                                </a>
                                
                            </li>
                            `
                        );
                        a++;
                    }

                }


            });
    }

    //Get Weather
    function Weather(val) {

        let i = 0;

        //get cords
        let loc = encodeURI(val)
        fetch('http://api.positionstack.com/v1/forward?access_key=b3d17c1f4d827be720ddc07891e6bfd5&query=' + loc + '&limit=1')
            .then(function (data) {
                return data.json();
            })
            .then(function (data) {
                let lon = data.data[0].longitude;
                let lat = data.data[0].latitude;
                let geo = data.data[0].label.substring(0, data.data[0].label.length - 5);

                //Display location
                $('.current-location').html(geo + ' Weather');
                $('.list-location').html(' - ' + geo);
                $('.today h3').html('Today\'s Forecast for ' + geo);
                $('.aqi-location').html(geo);

                //Get air quality
                fetch('http://api.openweathermap.org/data/2.5/air_pollution?lat=' + lat + '&lon=' + lon + '&appid=59b311adf4bebd54d25f7c9836d4ed0d')
                    .then(function (data) {
                        return data.json();
                    })
                    .then(function (data) {
                        $('.aqi-1').removeClass('grey')
                        $('.aqi-2').removeClass('grey');
                        $('.aqi-3').removeClass('grey');
                        $('.aqi-4').removeClass('grey');
                        $('.aqi-5').removeClass('grey');
                        switch (data.list[0].main.aqi) {
                            case 0:
                                $('.aqi-1').addClass('grey')
                                $('.aqi-2').addClass('grey');
                                $('.aqi-3').addClass('grey');
                                $('.aqi-4').addClass('grey');
                                $('.aqi-5').addClass('grey');
                                $('.aqi-summary p').html('Good');
                                $('.aqi-summary h5').html('Air quality is considered satisfactory, and air pollution poses little or no risk.');
                                break;

                            case 1:
                                $('.aqi-2').addClass('grey');
                                $('.aqi-3').addClass('grey');
                                $('.aqi-4').addClass('grey');
                                $('.aqi-5').addClass('grey');
                                $('.aqi-summary p').html('Good');
                                $('.aqi-summary h5').html('Air quality is considered satisfactory, and air pollution poses little or no risk.');
                                break;

                            case 2:
                                $('.aqi-3').addClass('grey');
                                $('.aqi-4').addClass('grey');
                                $('.aqi-5').addClass('grey');
                                $('.aqi-summary p').html('Moderate');
                                $('.aqi-summary h5').html('Air quality is acceptable; however, for some pollutants there may be a moderate health concern for a very small number of people who are unusually sensitive to air pollution.');
                                break;

                            case 3:
                                $('.aqi-4').addClass('grey');
                                $('.aqi-5').addClass('grey');
                                $('.aqi-summary p').html('Moderate');
                                $('.aqi-summary h5').html('Air quality is acceptable; however, for some pollutants there may be a moderate health concern for a very small number of people who are unusually sensitive to air pollution.');
                                break;

                            case 4:
                                $('.aqi-5').addClass('grey');
                                $('.aqi-summary p').html('Unhealthy');
                                $('.aqi-summary h5').html('Everyone may begin to experience health effects; members of sensitive groups may experience more serious health effects.');
                                break;

                            case 5:
                                $('.aqi-summary p').html('Unhealthy');
                                $('.aqi-summary h5').html('Everyone may begin to experience health effects; members of sensitive groups may experience more serious health effects.');
                                break;

                            default:
                                break;
                        }
                    });

                //get weather
                fetch('https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&units=imperial&appid=59b311adf4bebd54d25f7c9836d4ed0d')
                    .then(function (data) {
                        return data.json();
                    })
                    .then(function (data) {

                        //Current
                        let curTime = data.current.dt;
                        let timeZone = data.timezone;
                        let time = UnixtoTime(curTime, timeZone);
                        let dayStart = data.current.dt;

                        let curFeels = Math.round(data.current.feels_like)

                        //Current weather widget
                        $('.current-time').html('As of ' + GetHourMin(time));
                        $('.current-temp').html(Math.round(data.current.temp) + '°');
                        $('.current-des').html(data.current.weather[0].description.replace(/\b\w/g, l => l.toUpperCase()));
                        $('.current-pop').html(Math.round(data.daily[0].pop * 100));
                        $('.current-cloud').html(Math.round(data.daily[0].clouds));
                        $('.current-high').html(Math.round(data.daily[i].temp.max) + '°');
                        $('.current-low').html(Math.round(data.daily[i].temp.min) + '°');
                        $('.current-img').attr('src', 'assets/icons/' + data.current.weather[0].main + '.png');

                        //Today widget
                        $('.today-morning h2').html(Math.round(data.daily[0].temp.morn) + '°');
                        $('.today-day h2').html(Math.round(data.daily[0].temp.day) + '°');
                        $('.today-evening h2').html(Math.round(data.daily[0].temp.eve) + '°');
                        $('.today-night h2').html(Math.round(data.daily[0].temp.night) + '°');
                        TimeofDay(time);

                        //Today-info widget
                        $('.today-feels').html(Math.round(data.current.feels_like) + '°');
                        $('.sunrise').html(GetHourMin(UnixtoTime(data.current.sunrise, timeZone)));
                        $('.sunset').html(GetHourMin(UnixtoTime(data.current.sunset, timeZone)));

                        $('.today-high').html(Math.round(data.daily[i].temp.max) + '° /');
                        $('.today-low').html(Math.round(data.daily[i].temp.min) + '°');
                        $('.today-humid').html(data.current.humidity + '%');
                        $('.today-pressure').html(data.current.pressure + ' hPA');
                        $('.today-vis').html(Math.round((data.current.visibility * 3.2) / 5280) + ' mi');
                        $('.today-wind').html(Math.round(data.current.wind_speed) + ' mph');
                        $('.today-dew').html(Math.round(data.current.dew_point) + '°');
                        $('.today-uvi').html(Math.round(data.current.uvi) + ' out of 10');
                        $('.today-windgust').html(Math.round(data.current.wind_deg) + '°');
                        //////////////////////////

                        //Get weather for the rest of the current day
                        data.hourly.forEach(e => {
                            if (UnixtoDay(e.dt, timeZone) == UnixtoDay(curTime)) {
                                let a = GetHour(UnixtoTime(e.dt, timeZone), timeZone)

                                if (a == '8 AM') {

                                    $('.today-morning .morn-img').attr('src', 'assets/icons/' + e.weather[0].main + '.png');
                                    $('.today-morning h4').html(Math.round(e.pop * 100) + '%');
                                    // console.log('fut morn ' + e.weather[0].main + ' ' + e.pop)

                                } else if (a == '2 PM') {

                                    $('.today-day .day-img').attr('src', 'assets/icons/' + e.weather[0].main + '.png');
                                    $('.today-day h4').html(Math.round(e.pop * 100) + '%');
                                    // console.log('fut noon ' + e.weather[0].main + ' ' + e.pop)


                                } else if (a == '7 PM') {

                                    $('.today-evening .eve-img').attr('src', 'assets/icons/' + e.weather[0].main + '.png');
                                    $('.today-evening h4').html(Math.round(e.pop * 100) + '%');
                                    // console.log('fut eve ' + e.weather[0].main + ' ' + e.pop)


                                } else if (a == '11 PM') {

                                    // console.log('fut night')
                                    if (e.weather[0].main == 'Rain' || e.weather[0].main == 'Snow' || e.weather[0].main == 'Drizzle' || e.weather[0].main == 'Thunderstorm') {
                                        $('.today-night .night-img').attr('src', 'assets/icons/' + e.weather[0].main + '.png');
                                    }
                                    $('.today-night h4').html(Math.round(e.pop * 100) + '%');


                                }

                            }
                        });

                        //Get past weather from the current day
                        fetch('http://api.openweathermap.org/data/2.5/onecall/timemachine?lat=' + lat + '&lon=' + lon + '&dt=' + dayStart + '&units=imperial&appid=59b311adf4bebd54d25f7c9836d4ed0d')
                            .then(function (data) {
                                return data.json();
                            })
                            .then(function (data) {

                                data.hourly.forEach(e => {
                                    // //console.log(data)
                                    if (UnixtoDay(e.dt, timeZone) == UnixtoDay(curTime)) {
                                        let a = GetHour(UnixtoTime(e.dt, timeZone), timeZone)

                                        if (a == '8 AM') {

                                            // console.log('fut morn ' + e.weather[0].main + ' ' + e.rain)
                                            $('.today-morning .morn-img').attr('src', 'assets/icons/' + e.weather[0].main + '.png');
                                            if (e.weather[0].main == 'Rain' || e.weather[0].main == 'Snow' || e.weather[0].main == 'Drizzle' || e.weather[0].main == 'Thunderstorm') {
                                                $('.today-morning h4').html('100%');
                                            }

                                        } else if (a == '2 PM') {

                                            // console.log('fut noon ' + e.weather[0].main + ' ' + e.rain)
                                            $('.today-day .day-img').attr('src', 'assets/icons/' + e.weather[0].main + '.png');
                                            if (e.weather[0].main == 'Rain' || e.weather[0].main == 'Snow' || e.weather[0].main == 'Drizzle' || e.weather[0].main == 'Thunderstorm') {
                                                $('.today-day h4').html('100%');
                                            }

                                        } else if (a == '7 PM') {

                                            // console.log('fut eve ' + e.weather[0].main + ' ' + e.rain)
                                            $('.today-evening .eve-img').attr('src', 'assets/icons/' + e.weather[0].main + '.png');
                                            if (e.weather[0].main == 'Rain' || e.weather[0].main == 'Snow' || e.weather[0].main == 'Drizzle' || e.weather[0].main == 'Thunderstorm') {
                                                $('.today-evening h4').html('100%');
                                            }

                                        } else if (a == '11 PM') {

                                            // console.log('his night')
                                            if (e.weather[0].main == 'Rain' || e.weather[0].main == 'Snow' || e.weather[0].main == 'Drizzle' || e.weather[0].main == 'Thunderstorm') {
                                                $('.today-night .night-img').attr('src', 'assets/icons/' + e.weather[0].main + '.png');
                                            }
                                            if (e.weather[0].main == 'Rain' || e.weather[0].main == 'Snow' || e.weather[0].main == 'Drizzle' || e.weather[0].main == 'Thunderstorm') {
                                                $('.today-night h4').html('100%');
                                            }

                                        }

                                    }
                                });

                            });



                        ////////////////7Day///////////////
                        $('.7day-time').html('As of ' + GetHourMin(time));
                        $('.list-7day li').remove();
                        for (let i = 0; i < 7; i++) {

                            $('.list-7day').append(
                                `
                                <li>
                                    <span class="day">${GetDay(UnixtoDay(data.daily[i].dt, timeZone))}</span>
                                    <div class="temp">
                                        <span class="temp-high">${Math.round(data.daily[i].temp.max)}°</span>
                                        <span class="spacer">/</span>
                                        <span class="temp-low">${Math.round(data.daily[i].temp.min)}°</span>
                                    </div>
                                    <img class="temp-img" src="assets/icons/${data.daily[i].weather[0].main}.png" alt="">
                                    <span class="summary">${data.daily[i].weather[0].description.replace(/\b\w/g, l => l.toUpperCase())}</span>
                                    <div class="right-temp">
                                        <img class="perc-img" src="assets/icons/humid.png" alt="">
                                        <span class="perc">${Math.round(data.daily[i].pop * 100)}%</span>
                                        <img class="wind-img" src="assets/icons/wind.png" alt="">
                                        <span class="wind">${Math.round(data.daily[i].wind_speed)}mph</span>
                                    </div>
                                </li>
                                `
                            );

                        }

                        ////////////hourly///////////////////
                        $('.hourly-time').html('As of ' + GetHourMin(time));
                        $('.list-hourly li').remove();
                        for (let i = 0; i < 24; i++) {

                            $('.list-hourly').append(
                                `
                                <li>
                                    <span class="day">${GetHour(UnixtoTime(data.hourly[i].dt, timeZone))}</span>
                                    <div class="temp">
                                        <span class="temp-avg">${Math.round(data.hourly[i].temp)}°</span>
                                    </div>
                                    <img class="temp-img" src="assets/icons/${data.hourly[i].weather[0].main}.png" alt="">
                                    <span class="summary">${data.hourly[i].weather[0].description.replace(/\b\w/g, l => l.toUpperCase())}</span>
                                    <div class="right-temp">
                                        <img class="perc-img" src="assets/icons/humid.png" alt="">
                                        <span class="perc">${Math.round(data.hourly[i].pop * 100)}%</span>
                                        <img class="wind-img" src="assets/icons/wind.png" alt="">
                                        <span class="wind">${Math.round(data.hourly[i].wind_speed)}mph</span>
                                    </div>
                                </li>
                                `
                            );

                        }



                    });
            });


    };


    //Initialize
    Weather('New York City');
    News()





});






