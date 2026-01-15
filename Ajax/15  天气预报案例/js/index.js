/**
 * 目标1：默认显示-北京市天气
 *  1.1 获取北京市天气数据
 *  1.2 数据展示到页面
 */
function render(cityCode){
    // 1. 获取北京市天气数据
    myAxios({
        url: 'http://hmajax.itheima.net/api/weather',
        params: {
            city: cityCode
        }
    }).then(result => {
        console.log(result);
        const wObj = result.data

        // 2. 数据展示到页面
        document.querySelector('.area').innerHTML = wObj.area
        const dataTitle = `
        <span class="dateShort">${wObj.date}</span>
        <span class="calendar">农历&nbsp;
          <span class="dateLunar">${wObj.dateLunar}</span>
        </span>`
        document.querySelector('.title').innerHTML = dataTitle

        const dataWeather = ` 
        <div class="tem-box">
            <span class="temp">
            <span class="temperature">${wObj.temperature}</span>
            <span>°</span>
            </span>
        </div>
        <div class="climate-box">
            <div class="air">
            <span class="psPm25">${wObj.psPm25}</span>
            <span class="psPm25Level">${wObj.psPm25Level}</span>
            </div>
            <ul class="weather-list">
            <li>
                <img src="./imgs/小雨-line.png" class="weatherImg" alt="">
                <span class="weather">${wObj.weather}</span>
            </li>
            <li class="windDirection">${wObj.windDirection}</li>
            <li class="windPower">${wObj.windPower}</li>
            </ul>
        </div>`
        document.querySelector('.weather-box').innerHTML = dataWeather

        const dataTodayWeather = `
        <div class="range-box">
            <span>今天：</span>
            <span class="range">
                <span class="weather">${wObj.todayWeather.weather}</span>
                <span class="temNight">${wObj.todayWeather.temNight}</span>
                <span>-</span>
                <span class="temDay">${wObj.todayWeather.temDay}</span>
                <span>℃</span>
            </span>
        </div>
        <ul class="sun-list">
            <li>
                <span>紫外线</span>
                <span class="ultraviolet"></span>
            </li>
            <li>
                <span>湿度</span>
                <span class="humidity">${wObj.todayWeather.humidity}</span>%
            </li>
            <li>
                <span>日出</span>
                <span class="sunriseTime">${wObj.todayWeather.sunriseTime}</span>
            </li>
            <li>
                <span>日落</span>
                <span class="sunsetTime">${wObj.todayWeather.sunsetTime}</span>
            </li>
        </ul>`
        document.querySelector('.today-weather').innerHTML = dataTodayWeather

        const weekWrap = document.querySelector('.week-wrap')
        weekWrap.innerHTML = wObj.dayForecast.map(day => `
            <li class="item">
                <div class="date-box">
                    <span class="dateFormat">今天</span>
                    <span class="date">${day.date}</span>
                </div>
                <img src="${day.weatherImg}" alt="" class="weatherImg">
                <span class="weather">${day.weather}</span>
                <div class="temp">
                    <span class="temNight">${day.temNight}</span>-
                    <span class="temDay">${day.temDay}</span>
                    <span>℃</span>
                </div>
                <div class="wind">
                    <span class="windDirection">${day.windDirection}</span>
                    <span class="windPower">&lt;${day.windPower}</span>
                </div>
            </li>`).join('')
    })
}

render('110100')


/**
 *  目标2：切换城市功能
 *  2.1 给select绑定input事件
 *  2.2 获取选择的城市编码
*/
// 搜索输入时实时显示城市列表，但不渲染天气
document.querySelector('.search-city').addEventListener('input', function(e){
    myAxios({
        url: 'http://hmajax.itheima.net/api/weather/city',
        params: {
            city: e.target.value
        }
    }).then(result => {
        document.querySelector('.search-list').innerHTML = result.data.map(item => {
            return `<li class="city-item" data-code="${item.code}">${item.name}</li>`
        }).join('')
    })
})

// 点击城市列表项时才渲染天气
document.querySelector('.search-list').addEventListener('click', function(e){
    if(e.target.classList.contains('city-item')){
        render(e.target.getAttribute('data-code'))
    }
    document.querySelector('.search-city').value = ''
})
