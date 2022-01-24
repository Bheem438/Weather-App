let loc = document.getElementById("location");
let tempicon = document.getElementById("temp-icon");
let tempvalue = document.getElementById("temp-value");
let climate = document.getElementById("climate");
let iconfile;
const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");

searchButton.addEventListener('click',(e)=>{

    e.preventDefault();
    getWeather(searchInput.value);
    searchInput.value = '';

});

const getWeather = async (city)=>{
    try{
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=ae5cf366682d786d0466562fb10d38b1`,
    
        {mode: 'cors'}
        );
        const weatherData = await response.json();
        console.log(weatherData);
        const{name} = weatherData;
        const{feels_like} = weatherData.main;
        const{id,main} = weatherData.weather[0];
        loc.textContent = name;
        climate.textContent = main;
        tempvalue.textContent = Math.round(feels_like-273);
        if(id<300 && id>200){
            tempicon.src = "https://cdn-icons.flaticon.com/png/512/3236/premium/3236860.png?token=exp=1638967857~hmac=7be063cf751ff8acf978c83c5b750a25"
        }
        else if(id<400 && id>300){
            tempicon.src = "https://cdn-icons-png.flaticon.com/512/2675/2675876.png"
        }
        else if(id<600 && id>500){
            tempicon.src = "https://cdn-icons.flaticon.com/png/512/1207/premium/1207621.png?token=exp=1638968110~hmac=e8301c7d072b98a28e2cd420e97ed926"
        }
        else if(id<700 && id>600){
            tempicon.src = "https://as1.ftcdn.net/v2/jpg/01/73/76/14/1000_F_173761439_Zz42fYozj9ionUxJWJP7Tsmq0JBMZ5Jy.jpg"
        }
        else if(id<800 && id>700){
            tempicon.src = "https://cdn-icons-png.flaticon.com/512/1163/1163624.png"
        }
        else if(id==800){
            tempicon.src = "https://as2.ftcdn.net/v2/jpg/03/04/88/05/1000_F_304880598_9QCkixhgexnm1CchXhZAQeDQUfTcoWqo.jpg"
        }
    
    }
    catch{
        alert('city not found')
    }
};

window.addEventListener("load",()=>{

    let long;
    let lat;
    const proxy ="https://cors-anywhere.herokuapp.com/";

    
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition((position)=>{
            long = position.coords.longitude;
            lat = position.coords.latitude;
            

            const api = `${proxy}api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=ae5cf366682d786d0466562fb10d38b1`
            fetch(api).then((response)=>{
                return response.json();
            })
            .then(data =>{
                const{name} = data;
                const{feels_like} = data.main;
                const{id,main} = data.weather[0];

                loc.textContent = name;
                climate.textContent = main;
                tempvalue.textContent = Math.round(feels_like-273);
                console.log(data)
                if(id<300 && id>200){
                    tempicon.src = "https://cdn-icons.flaticon.com/png/512/3236/premium/3236860.png?token=exp=1638967857~hmac=7be063cf751ff8acf978c83c5b750a25"
                }
                else if(id<400 && id>300){
                    tempicon.src = "https://cdn-icons-png.flaticon.com/512/2675/2675876.png"
                }
                else if(id<600 && id>500){
                    tempicon.src = "https://cdn-icons.flaticon.com/png/512/1207/premium/1207621.png?token=exp=1638968110~hmac=e8301c7d072b98a28e2cd420e97ed926"
                }
                else if(id<700 && id>600){
                    tempicon.src = "https://as1.ftcdn.net/v2/jpg/01/73/76/14/1000_F_173761439_Zz42fYozj9ionUxJWJP7Tsmq0JBMZ5Jy.jpg"
                }
                else if(id<800 && id>700){
                    tempicon.src = "https://cdn-icons-png.flaticon.com/512/1163/1163624.png"
                }
                else if(id==800){
                    tempicon.src = "https://as2.ftcdn.net/v2/jpg/03/04/88/05/1000_F_304880598_9QCkixhgexnm1CchXhZAQeDQUfTcoWqo.jpg"
                }
              
            })
        })
    }
})