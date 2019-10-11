// This is the app_id and app_key for Edamam API
var app_id = '7ffe21bf'; // Bob API id
var app_key = '527beb9c1a327d93d17478b9538e6b3f'; // Bob API key
var encodedString = []; // Declare array of encodedString variable
var user_inputs = []; // Declare arrat for user inputs

// Validation for the user inputs
function validateForm() {
    var status = true;
    $('.inputfields > input.quantity').each(function () {
        if ($(this).val().trim() == "") {
            $(this).css('border', '1px solid red');
            status = false;
        } else {
            $(this).css('border', '');
        }
    });
    $.each($(".unit option:selected"), function () {
        if ($(this).val().trim() == "") {
            $(this).parent().css('border', '1px solid red');
            status = false;
        } else {
            $(this).parent().css('border', '');
        }
    });
    $('.inputfields > input.foodname').each(function () {
        if ($(this).val().trim() == "") {
            $(this).css('border', '1px solid red');
            status = false;
        } else {
            $(this).css('border', '');
        }
    });

    if (status == false) {
        alert("Please fill out all of the fields. Thanks.")
    }
    return status;
}


// The function below is used to get the string from the food or drink input and analyse the nutrition
function nutAnalysis() {
    if (validateForm() == true) {
        var quantity = [];
        $('.inputfields > input.quantity').each(function () {
            quantity.push($(this).val().trim())
        });
        console.log(quantity);

        var units = [];
        $.each($(".unit option:selected"), function () {
            units.push($(this).val().trim());
        });
        console.log(units);

        var foodname = [];
        $('.inputfields > input.foodname').each(function () {
            foodname.push($(this).val().trim())
        });
        console.log(foodname);

        user_inputs = [];
        for (i = 0; i < quantity.length; i++) {
            user_inputs.push(quantity[i] + ' ' + units[i] + ' ' + foodname[i]);
        };
        console.log(user_inputs);

        encodedString = []; // To reset Array of encodedString
        for (var j = 0; j < user_inputs.length; j++) {
            if (user_inputs[j] !== "") { // Check if empty string
                encodedString.push(encodeURIComponent(user_inputs[j])); // We use 'encodeURIComponent' to do Percent-encoding
            }
        }
        console.log(encodedString);

        arrayOfJson = []; // To reset arrayOfJson variable
        for (var x = 0; x < encodedString.length; x++) {
            var data = encodedString[x];
            getFoodDB(x, data); // Call the getFoodDB function for each line in text area
        };
        
        var localCalories;
        setTimeout(function () { // Need to setTimeout for the table and chart in order to make sure the data is available
            drawTable(arrayOfJson);
            createChart();
            showArrow();
            localSugars = calcSugars();
            if (localSugars <= 300 && localSugars > 0) {
                window.localStorage.setItem('localSugars', localSugars.toString());
            };
            localCalories = caloriesSugars();
            window.localStorage.setItem('localCalories', localCalories.toString());
            showNotes();
            showExeBtn();
            showStrBtn();
        }, 2000);
    }
}

// To calculate total sugars in arrayOfJson
function calcSugars(){
    var totSugar = 0;
    for (i = 0; i < arrayOfJson.length; i++) {
        totSugar += arrayOfJson[i].sugars;
    }
    //console.log(totSugar);
    return totSugar;
}

function caloriesSugars() {
    var calories = 0;
    for (i = 0; i < arrayOfJson.length; i++) {
        calories += arrayOfJson[i].sugars*4;
    }
    //console.log(totSugar);
    return calories;
}

// To calculate total calories in arrayOfJson
function calcCalories(){
    var totCalories = 0;
    for (i = 0; i < arrayOfJson.length; i++) {
        totCalories += arrayOfJson[i].calories;
    }
    //console.log(totCalories);
    return totCalories;
}

// To create Tabulator on DOM element with id "example-table" | The table is created by using tabulator.js
function drawTable(t){
    var table = new Tabulator("#example-table", {
        height:205, // set height of table (in CSS or here), this enables the Virtual DOM and improves render speed dramatically (can be any valid css height value)
        data:t, //assign data to table
        layout:"fitColumns", //fit columns to width of table (optional)
        columns:[ //Define Table Columns
            { title: "Food or Drinks", field: "food" },
            { title: "Weight (g)", field: "weight" },
            { title: "Calories (kcal)", field: "calories", bottomCalc: "sum" },
            { title: "Sugars (g)", field: "sugars", bottomCalc: "sum" },
            { title: "Calories from Sugar", field: "calSugars", bottomCalc: "sum"}
        ]
    });

    table.redraw();       
};

// The function below is used to request food nutritions from Edamam API
var arrayOfJson = [];
function getFoodDB(pos, ingrURI) {
    showLoader();
    setTimeout(function(){
        $.ajax({
            url: 'https://api.edamam.com/api/nutrition-data?app_id=' + app_id + '&app_key=' + app_key + '&ingr=' + ingrURI,
            async: false, // To make JSON synchronous
            beforeSend: function(xhr) {
                xhr.setRequestHeader("Authorization", "Bearer 6QXNMEMFHNY4FJ5ELNFMP5KRW52WFXN5")
            }, success: function(data){
                //alert("Retrieving Food Data");
                hideLoader();
                console.log(data);
                var food = user_inputs[pos];
                var weight = Math.round(data.totalWeight);
                var calories = data.calories;
                var sugars;
                var calSugars;
                if(data.totalNutrients.SUGAR !== undefined){ // This is to check whether the food has sugar content or not
                    sugars = Math.round(data.totalNutrients.SUGAR.quantity); // We round the number of sugars
                    calSugars = sugars * 4;
                } else {
                    sugars = 0;
                    calSugars = 0;
                };
                var result = {food, weight, calories, sugars, calSugars};
                if(result.weight !== 0){
                    arrayOfJson.push(result);
                } else {
                    alert(food + ' ' + 'is not in the database. Please Check Your Spelling.');
                }            
                return data;
                //download(result, 'food.json', 'text/plain');
            }
        });
    },1000);

};

// This function is used to download the json object as json file
function download(content, fileName, contentType) {
    content = JSON.stringify(content);
    var a = document.createElement("a");
    var file = new Blob([content], {type: contentType});
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
}

// To create chart based on the user input sugar consumption | The chart is created by using Chart.js
function createChart() {
    $("canvas#myChart").remove(); // To prevent previous chart overlapping
    $("div.chart-container").append('<canvas id="myChart" class="col-md-12"></canvas>'); // To prevent previous chart overlapping
    var ctx = document.getElementById('myChart').getContext('2d');
    window.myChart = new Chart(ctx, {
        type: 'horizontalBar',
        data: {
            labels: [['Your Sugar','Consumption'], ['Avg. Australian Sugar Consumption', '(Australian Bureau of Statistics)'],['Recommended','Sugar Consumption','(health.gov.au)']],
            datasets: [{
                label: 'Sugar (g) Consumption',
                data: [calcSugars(), 105, 50], // calcSugar() is a function that returns the sum of sugar consumption
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                xAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }],
                yAxes: [{
                    barPercentage: 0.3,
                    ticks: {
                        beginAtZero: false
                    }
                }]
            }
        }
    });
    return myChart;
};

// To destroy or clear the rendered chart previously
function destroyMyChart(m) {
    m.destroy();
};

// To show the loading spinner
function showLoader(){
    $("#loader").attr('class', 'loader loader-default is-active')
};

// To hide the loading spinner
function hideLoader(){
    $("#loader").attr('class', 'loader loader-default')
};

// To show scroll down arrow
function showArrow() {
    $('#arrowdown').show();
}

// To show notes under the table
function showNotes() {
    $('#notes').show();
};

// To show the exercise page button
function showExeBtn() {
    $('#exe_btn').show();
};

// To show the stress page button
function showStrBtn() {
    $('#str_btn').show();
};

// To clear the local sotrage
function clearLocalStorage() {
    window.localStorage.removeItem('localSugars');
    window.localStorage.removeItem('localCalories');
};