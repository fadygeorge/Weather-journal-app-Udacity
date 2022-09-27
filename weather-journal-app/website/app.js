/* Global Variables */

const ApiKey = "&appid=35563c091af30866c54e553a38a08fee&units=metric";
const apiURL = `http://api.openweathermap.org/data/2.5/forecast?id=`;
const serverURL = 'http://localhost:3000';


// Event listener for the generate button to start taking values
document.getElementById("generate").addEventListener("click", callFun);



// the callback function
function callFun(e){
    const zipCode = document.getElementById("zip").value;
    const feelings = document.getElementById("feelings").value;
    const d = new Date();

    getData(apiURL, zipCode, ApiKey)
    .then(function(data){
        postData("/postData", { temperature:data.list[0].main.temp, date: d, user_response: feelings});
    })
}

// function to get all the data from the weather server api
const getData = async (url, zip, ApiKey) => {
    const response = await fetch(url+zip+ApiKey);
    try{
        const newData = await response.json();
        return newData;
    }catch(error){
        console.log("error", error);
    }
}


// function to add the data retrived from Api and UI to the our local server
// and then calling the updateUI function
const postData = async (url = "", data = {})=>{
    //console.log(data);
    const response = await fetch(serverURL + url, {
        method: 'POST',
        credentials: "same-origin",
        headers: {
            "Content-Type": 'application/json',
        },
        body: JSON.stringify(data)
    });
    try{
        const newData = await response.json();
        updateUI();
    }catch(error){
        console.log("error", error);
    }
}


// function to update the UI to display the retrived data from our local server
const updateUI = async () =>{
    const req = await fetch(serverURL+'/getData');
    try{
        const data = await req.json();
        document.getElementById('date').innerHTML = `Date: ${data["date"]}`;
        document.getElementById('temp').innerHTML = `Temperature: ${Math.round(data["temperature"])} degrees`;
        document.getElementById('content').innerHTML = `Feeling: ${data["user_response"]}`;
    }catch(error){
        console.log("error", error);
    }
}