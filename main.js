const cityInput = document.getElementById("cites"),
    dateInput = document.getElementById("date"),
    sectionOfDate = document.getElementById("dateInfoData"),
    table = document.getElementById("table");

function showData() {
    const selcetCity = cityInput.value,
        selectDate = dateInput.value;
    console.log(selcetCity);
    axios.get(`https://api.aladhan.com/v1/timingsByCity/29-07-2025?city=Riyadh&country=SA&method=4&shafaq=general&tune=5%2C3%2C5%2C7%2C9%2C-1%2C0%2C8%2C-6&school=0&midnightMode=0&timezonestring=Asia%2FRiyadh&latitudeAdjustmentMethod=2&calendarMethod=UAQ`)
        .then(function (response) {
            const data = response.data.data;
        })
        .catch(function (error) {
            alert(`API Requst Erorr: ${error}`);
        });
}
// cityInput.addEventListener("change", showData);
// dateInput.addEventListener("change", showData);
showData();