const cityInput = document.getElementById("cites"),
    dateInput = document.getElementById("date"),
    sectionOfDate = document.getElementById("dateInfoData"),
    table = document.getElementById("table");

dateInput.value = getToday();

function showData() {
    const selcetCity = cityInput.value,
        selectDate = dateInput.value;

    let country = selcetCity.split(" ")[1];
    let city = selcetCity.split(" ")[0].split("/")[1];
    let timezon = selcetCity.split(" ")[0].split("/")[0];
    let date = selectDate.split("-").reverse().join("-");

    axios.get(`https://api.aladhan.com/v1/timingsByCity/${date}?city=${city}&country=${country}&method=4&shafaq=general&tune=5%2C3%2C5%2C7%2C9%2C-1%2C0%2C8%2C-6&school=0&midnightMode=0&timezonestring=${timezon}%2F${city}&latitudeAdjustmentMethod=2&calendarMethod=UAQ`)
        .then(function (response) {
            const data = response.data.data;

            sectionOfDate.innerHTML = `
            <div class="top">${data.date.hijri.weekday.ar}</div>
            <p>
                <span>${data.date.hijri.day}</span>
                <span>${data.date.hijri.month.ar}</span>
                <span>${data.date.hijri.year}</span>
            </p>
            <div class="bottom">الهجري</div>
            `;

            table.innerHTML = `
                <thead>
                    <tr>
                        <th scope="col">الصلاة</th>
                        <th scope="col">الوقت</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">الفجر</th>
                        <td>${data.timings.Fajr}</td>
                    </tr>
                    <tr>
                        <th scope="row">الشروق</th>
                        <td>${data.timings.Sunrise}</td>
                    </tr>
                    <tr>
                        <th scope="row">الظهر</th>
                        <td>${data.timings.Dhuhr}</td>
                    </tr>
                    <tr>
                        <th scope="row">العصر</th>
                        <td>${data.timings.Asr}</td>
                    </tr>
                    <tr>
                        <th scope="row">المغرب</th>
                        <td>${data.timings.Maghrib}</td>
                    </tr>
                    <tr>
                        <th scope="row">العشاء</th>
                        <td>${data.timings.Isha}</td>
                    </tr>
                </tbody>
            `;
            document.querySelector(".note").innerHTML = data.meta.method.name;
        })
        .catch(function (error) {
            alert(`API Requst Erorr: ${error}`);
        });
}

function getToday() {
    const d = new Date();
    const day   = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year  = d.getFullYear();
    return `${year}-${month}-${day}`;
}


cityInput.addEventListener("change", showData);
dateInput.addEventListener("change", showData);
showData();
