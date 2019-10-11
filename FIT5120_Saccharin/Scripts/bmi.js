// To show the loading spinner
function showLoader() {
    $("#loader").attr('class', 'loader loader-default is-active')
};

// To hide the loading spinner
function hideLoader() {
    $("#loader").attr('class', 'loader loader-default')
};

// To hide the div with id area
function hideArea() {
    $('#area').hide();
};

// To show the div with id area
function showArea() {
    $('#area').show();
};

// To show the metric user input box
function showMetric() {
    $('#metric-input').show();
    $('#imperial-input').hide();
};

// To show the imperial user input box
function showImperial() {
    $('#imperial-input').show();
    $('#metric-input').hide();
}

// To calculate BMI based on imperical measurement
function calcImperialBMI() {
    showLoader();
    var val1 = $.trim($('#imperial-weight').val());
    console.log(val1);
    var val2 = $.trim($('#height-ft').val());
    console.log(val2);
    var val2_in = $.trim($('#height-in').val());
    console.log(val2);
    var val2_tot = Math.round((val2 * 30.48) + (val2_in * 2.54));
    var val3 = $.trim($('#imperial-age').val());
    console.log(val3);
    var val4 = $.trim($('input[name="sex-b"]:checked').val());
    console.log(val4);
    
    var settings = {
        "async": false,
        "crossDomain": true,
        "url": "https://bmi.p.rapidapi.com/",
        "method": "POST",
        "headers": {
            "x-rapidapi-host": "bmi.p.rapidapi.com",
            "x-rapidapi-key": "a2fbe3e7f6msh2b0ba54445f27cap16f6ecjsn249d2a02d1a4",
            "content-type": "application/json",
            "accept": "application/json"
        },
        "processData": false,
        "data": "{\"weight\":{\"value\":\"" + val1 + "\",\"unit\":\"lb\"},\"height\":{\"value\":\"" + val2_tot + "\",\"unit\":\"cm\"},\"sex\":\"" + val4 + "\",\"age\":\"" + val3 + "\"}"
    }

    var JSONObject;
    setTimeout(function () {
        $.ajax(settings).done(function (response) {
            hideLoader();
            showArea();
            var bmi = response.bmi.value;
            var status = response.bmi.status;
            var risk = response.bmi.risk;
            var bmr = response.bmr.value;
            var ideal_weight = response.ideal_weight;
            var ideal_weight_lbs = ideal_weight.match(/\d/g);
            ideal_weight_lbs_1 = Math.round(parseInt(ideal_weight_lbs.join("").substring(0, 2), 10) * 2.2);
            ideal_weight_lbs_2 = Math.round(parseInt(ideal_weight_lbs.join("").substring(3, 5), 10) * 2.2);
            console.log(ideal_weight_lbs_1);
            console.log(ideal_weight_lbs_2);
            ideal_weight = "" + ideal_weight_lbs_1 + "lbs" + " to " + ideal_weight_lbs_2 + "lbs"
            JSONObject = { bmi, status, risk, bmr, ideal_weight };
        });
        console.log(JSONObject);
        $('#bmi').text(JSONObject.bmi);
        $('#status').text(JSONObject.status);
        $('#your-risk').text(JSONObject.risk);
        $('#ideal-weight').text(JSONObject.ideal_weight);

        var maleJson;
        var femaleJson;

        //Male https://api.myjson.com/bins/aow4n
        $.ajax({
            //url: "/Bmi/GetAllMale", (backup solution to get data from local database)
            url: "https://project-saccharin.firebaseio.com/au_male_only.json",
            async: false,
            type: "GET",
            success: function (data, textStatus, jqXHR) {
                maleJson = data;
            }
        });

        //Female https://api.myjson.com/bins/151zzb
        $.ajax({
            //url: "/Bmi/GetAllFemale", (backup solution to get data from local database)
            url: "https://project-saccharin.firebaseio.com/au_female_only.json",
            async: false,
            type: "GET",
            success: function (data, textStatus, jqXHR) {
                femaleJson = data;
            }
        });

        $('#imperial-btn').focus();

        if (JSONObject.bmi <= 18.5) {
            $('#box_bmi').css('background-color', '#0D8AD6');
            $('#box_status').css('background-color', '#0D8AD6');
            $('#box_risk').css('background-color', '#0D8AD6');
            $('#box_ideal').css('background-color', '#0D8AD6');
            $('#bmi0').css('color', 'white');
            $('#bmi').css('color', 'white');
            $('#status0').css('color', 'white');
            $('#status').css('color', 'white');
            $('#your-risk0').css('color', 'white');
            $('#your-risk').css('color', 'white');
            $('#box-risk0').css('color', 'white');
            $('#box').css('color', 'white');
            $('#ideal-weight0').css('color', 'white');
            $('#ideal-weight').css('color', 'white');
        } else if (JSONObject.bmi > 18.5 && JSONObject.bmi <= 24.99) {
            $('#box_bmi').css('background-color', '#0CCB49');
            $('#box_status').css('background-color', '#0CCB49');
            $('#box_risk').css('background-color', '#0CCB49');
            $('#box_ideal').css('background-color', '#0CCB49');
            $('#bmi0').css('color', 'white');
            $('#bmi').css('color', 'white');
            $('#status0').css('color', 'white');
            $('#status').css('color', 'white');
            $('#your-risk0').css('color', 'white');
            $('#your-risk').css('color', 'white');
            $('#box-risk0').css('color', 'white');
            $('#box').css('color', 'white');
            $('#ideal-weight0').css('color', 'white');
            $('#ideal-weight').css('color', 'white');
        } else if (JSONObject.bmi > 25 && JSONObject.bmi <= 29.99) {
            $('#box_bmi').css('background-color', '#D6990C');
            $('#box_status').css('background-color', '#D6990C');
            $('#box_risk').css('background-color', '#D6990C');
            $('#box_ideal').css('background-color', '#D6990C');
            $('#bmi0').css('color', 'white');
            $('#bmi').css('color', 'white');
            $('#status0').css('color', 'white');
            $('#status').css('color', 'white');
            $('#your-risk0').css('color', 'white');
            $('#your-risk').css('color', 'white');
            $('#box-risk0').css('color', 'white');
            $('#box').css('color', 'white');
            $('#ideal-weight0').css('color', 'white');
            $('#ideal-weight').css('color', 'white');
        } else {
            $('#box_bmi').css('background-color', '#D6180C');
            $('#box_status').css('background-color', '#D6180C');
            $('#box_risk').css('background-color', '#D6180C');
            $('#box_ideal').css('background-color', '#D6180C');
            $('#bmi0').css('color', 'white');
            $('#bmi').css('color', 'white');
            $('#status0').css('color', 'white');
            $('#status').css('color', 'white');
            $('#your-risk0').css('color', 'white');
            $('#your-risk').css('color', 'white');
            $('#box-risk0').css('color', 'white');
            $('#box').css('color', 'white');
            $('#ideal-weight0').css('color', 'white');
            $('#ideal-weight').css('color', 'white');
        }

        var tmp_c;
        if (val4 === "m") {
            if (val3 >= 18 && val3 <= 24) {
                tmp_c = createChart(maleJson[0]);
                destroyMyChart(tmp_c);
                createChart(maleJson[0]);
                console.log(maleJson[0]);
            } else if (val3 >= 25 && val3 <= 34) {
                tmp_c = createChart(maleJson[1]);
                destroyMyChart(tmp_c);
                createChart(maleJson[1]);
                console.log(maleJson[1]);
            } else if (val3 >= 35 && val3 <= 44) {
                tmp_c = createChart(maleJson[2]);
                destroyMyChart(tmp_c);
                createChart(maleJson[2]);
                console.log(maleJson[2]);
            } else if (val3 >= 45 && val3 <= 54) {
                tmp_c = createChart(maleJson[3]);
                destroyMyChart(tmp_c);
                createChart(maleJson[3]);
                console.log(maleJson[3]);
            } else if (val3 >= 55 && val3 <= 64) {
                tmp_c = createChart(maleJson[4]);
                destroyMyChart(tmp_c);
                createChart(maleJson[4]);
                console.log(maleJson[4]);
            } else if (val3 >= 65 && val3 <= 74) {
                tmp_c = createChart(maleJson[5]);
                destroyMyChart(tmp_c);
                createChart(maleJson[5]);
                console.log(maleJson[5]);
            } else if (val3 >= 75 && val3 <= 84) {
                tmp_c = createChart(maleJson[6]);
                destroyMyChart(tmp_c);
                createChart(maleJson[6]);
                console.log(maleJson[6]);
            }
        } else {
            if (val3 >= 18 && val3 <= 24) {
                tmp_c = createChart(femaleJson[0]);
                destroyMyChart(tmp_c);
                createChart(femaleJson[0]);
                console.log(femaleJson[0]);
            } else if (val3 >= 25 && val3 <= 34) {
                tmp_c = createChart(femaleJson[1]);
                destroyMyChart(tmp_c);
                createChart(femaleJson[1]);
                console.log(femaleJson[1]);
            } else if (val3 >= 35 && val3 <= 44) {
                tmp_c = createChart(femaleJson[2]);
                destroyMyChart(tmp_c);
                createChart(femaleJson[2]);
                console.log(femaleJson[2]);
            } else if (val3 >= 45 && val3 <= 54) {
                tmp_c = createChart(femaleJson[3]);
                destroyMyChart(tmp_c);
                createChart(femaleJson[3]);
                console.log(femaleJson[3]);
            } else if (val3 >= 55 && val3 <= 64) {
                tmp_c = createChart(femaleJson[4]);
                destroyMyChart(tmp_c);
                createChart(femaleJson[4]);
                console.log(femaleJson[4]);
            } else if (val3 >= 65 && val3 <= 74) {
                tmp_c = createChart(femaleJson[5]);
                destroyMyChart(tmp_c);
                createChart(femaleJson[5]);
                console.log(femaleJson[5]);
            } else if (val3 >= 75 && val3 <= 84) {
                tmp_c = createChart(femaleJson[6]);
                destroyMyChart(tmp_c);
                createChart(femaleJson[6]);
                console.log(femaleJson[6]);
            }
        };
    }, 1000); // Delay the JSON get for 100 nanosecond so that we can show the loading spinner
};

// To calculate BMI based on metric measurement
function calcBMI() {
    showLoader();
    var val1 = $.trim($('#weight').val());
    console.log(val1);
    var val2 = $.trim($('#height').val());
    console.log(val2);
    var val3 = $.trim($('#age').val());
    console.log(val3);
    var val4 = $.trim($('input[name="sex"]:checked').val());
    console.log(val4);

    var settings = {
        "async": false,
        "crossDomain": true,
        "url": "https://bmi.p.rapidapi.com/",
        "method": "POST",
        "headers": {
            "x-rapidapi-host": "bmi.p.rapidapi.com",
            "x-rapidapi-key": "a2fbe3e7f6msh2b0ba54445f27cap16f6ecjsn249d2a02d1a4",
            "content-type": "application/json",
            "accept": "application/json"
        },
        "processData": false,
        "data": "{\"weight\":{\"value\":\"" + val1 + "\",\"unit\":\"kg\"},\"height\":{\"value\":\"" + val2 + "\",\"unit\":\"cm\"},\"sex\":\"" + val4 + "\",\"age\":\"" + val3 + "\"}"
    }

    var JSONObject;
    setTimeout(function () {
        $.ajax(settings).done(function (response) {
            hideLoader();
            showArea();
            var bmi = response.bmi.value;
            var status = response.bmi.status;
            var risk = response.bmi.risk;
            var bmr = response.bmr.value;
            var ideal_weight = response.ideal_weight;
            JSONObject = { bmi, status, risk, bmr, ideal_weight };
        });
        console.log(JSONObject);
        $('#bmi').text(JSONObject.bmi);
        $('#status').text(JSONObject.status);
        $('#your-risk').text(JSONObject.risk);
        $('#ideal-weight').text(JSONObject.ideal_weight);

        var maleJson;
        var femaleJson;

        //Male https://api.myjson.com/bins/aow4n
        $.ajax({
            //url: "/Bmi/GetAllMale", (backup solution to get data from local database)
            url: "https://project-saccharin.firebaseio.com/au_male_only.json",
            async: false,
            type: "GET",
            success: function (data, textStatus, jqXHR) {
                maleJson = data;
            }
        });

        //Female https://api.myjson.com/bins/151zzb
        $.ajax({
            //url: "/Bmi/GetAllFemale", (backup solution to get data from local database)
            url: "https://project-saccharin.firebaseio.com/au_female_only.json",
            async: false,
            type: "GET",
            success: function (data, textStatus, jqXHR) {
                femaleJson = data;
            }
        });

        $('#metric-btn').focus();

        if (JSONObject.bmi <= 18.5) {
            $('#box_bmi').css('background-color', '#0D8AD6');
            $('#box_status').css('background-color', '#0D8AD6');
            $('#box_risk').css('background-color', '#0D8AD6');
            $('#box_ideal').css('background-color', '#0D8AD6');
            $('#bmi0').css('color', 'white');
            $('#bmi').css('color', 'white');
            $('#status0').css('color', 'white');
            $('#status').css('color', 'white');
            $('#your-risk0').css('color', 'white');
            $('#your-risk').css('color', 'white');
            $('#box-risk0').css('color', 'white');
            $('#box').css('color', 'white');
            $('#ideal-weight0').css('color', 'white');
            $('#ideal-weight').css('color', 'white');
        } else if (JSONObject.bmi > 18.5 && JSONObject.bmi <= 24.99) {
            $('#box_bmi').css('background-color', '#0CCB49');
            $('#box_status').css('background-color', '#0CCB49');
            $('#box_risk').css('background-color', '#0CCB49');
            $('#box_ideal').css('background-color', '#0CCB49');
            $('#bmi0').css('color', 'white');
            $('#bmi').css('color', 'white');
            $('#status0').css('color', 'white');
            $('#status').css('color', 'white');
            $('#your-risk0').css('color', 'white');
            $('#your-risk').css('color', 'white');
            $('#box-risk0').css('color', 'white');
            $('#box').css('color', 'white');
            $('#ideal-weight0').css('color', 'white');
            $('#ideal-weight').css('color', 'white');
        } else if (JSONObject.bmi > 25 && JSONObject.bmi <= 29.99) {
            $('#box_bmi').css('background-color', '#D6990C');
            $('#box_status').css('background-color', '#D6990C');
            $('#box_risk').css('background-color', '#D6990C');
            $('#box_ideal').css('background-color', '#D6990C');
            $('#bmi0').css('color', 'white');
            $('#bmi').css('color', 'white');
            $('#status0').css('color', 'white');
            $('#status').css('color', 'white');
            $('#your-risk0').css('color', 'white');
            $('#your-risk').css('color', 'white');
            $('#box-risk0').css('color', 'white');
            $('#box').css('color', 'white');
            $('#ideal-weight0').css('color', 'white');
            $('#ideal-weight').css('color', 'white');
        } else {
            $('#box_bmi').css('background-color', '#D6180C');
            $('#box_status').css('background-color', '#D6180C');
            $('#box_risk').css('background-color', '#D6180C');
            $('#box_ideal').css('background-color', '#D6180C');
            $('#bmi0').css('color', 'white');
            $('#bmi').css('color', 'white');
            $('#status0').css('color', 'white');
            $('#status').css('color', 'white');
            $('#your-risk0').css('color', 'white');
            $('#your-risk').css('color', 'white');
            $('#box-risk0').css('color', 'white');
            $('#box').css('color', 'white');
            $('#ideal-weight0').css('color', 'white');
            $('#ideal-weight').css('color', 'white');
        }

        var tmp_c;
        if (val4 === "m") {
            if (val3 >= 18 && val3 <= 24) {
                tmp_c = createChart(maleJson[0]);
                destroyMyChart(tmp_c);
                createChart(maleJson[0]);
                console.log(maleJson[0]);
            } else if (val3 >= 25 && val3 <= 34) {
                tmp_c = createChart(maleJson[1]);
                destroyMyChart(tmp_c);
                createChart(maleJson[1]);
                console.log(maleJson[1]);
            } else if (val3 >= 35 && val3 <= 44) {
                tmp_c = createChart(maleJson[2]);
                destroyMyChart(tmp_c);
                createChart(maleJson[2]);
                console.log(maleJson[2]);
            } else if (val3 >= 45 && val3 <= 54) {
                tmp_c = createChart(maleJson[3]);
                destroyMyChart(tmp_c);
                createChart(maleJson[3]);
                console.log(maleJson[3]);
            } else if (val3 >= 55 && val3 <= 64) {
                tmp_c = createChart(maleJson[4]);
                destroyMyChart(tmp_c);
                createChart(maleJson[4]);
                console.log(maleJson[4]);
            } else if (val3 >= 65 && val3 <= 74) {
                tmp_c = createChart(maleJson[5]);
                destroyMyChart(tmp_c);
                createChart(maleJson[5]);
                console.log(maleJson[5]);
            } else if (val3 >= 75 && val3 <= 84) {
                tmp_c = createChart(maleJson[6]);
                destroyMyChart(tmp_c);
                createChart(maleJson[6]);
                console.log(maleJson[6]);
            }
        } else {
            if (val3 >= 18 && val3 <= 24) {
                tmp_c = createChart(femaleJson[0]);
                destroyMyChart(tmp_c);
                createChart(femaleJson[0]);
                console.log(femaleJson[0]);
            } else if (val3 >= 25 && val3 <= 34) {
                tmp_c = createChart(femaleJson[1]);
                destroyMyChart(tmp_c);
                createChart(femaleJson[1]);
                console.log(femaleJson[1]);
            } else if (val3 >= 35 && val3 <= 44) {
                tmp_c = createChart(femaleJson[2]);
                destroyMyChart(tmp_c);
                createChart(femaleJson[2]);
                console.log(femaleJson[2]);
            } else if (val3 >= 45 && val3 <= 54) {
                tmp_c = createChart(femaleJson[3]);
                destroyMyChart(tmp_c);
                createChart(femaleJson[3]);
                console.log(femaleJson[3]);
            } else if (val3 >= 55 && val3 <= 64) {
                tmp_c = createChart(femaleJson[4]);
                destroyMyChart(tmp_c);
                createChart(femaleJson[4]);
                console.log(femaleJson[4]);
            } else if (val3 >= 65 && val3 <= 74) {
                tmp_c = createChart(femaleJson[5]);
                destroyMyChart(tmp_c);
                createChart(femaleJson[5]);
                console.log(femaleJson[5]);
            } else if (val3 >= 75 && val3 <= 84) {
                tmp_c = createChart(femaleJson[6]);
                destroyMyChart(tmp_c);
                createChart(femaleJson[6]);
                console.log(femaleJson[6]);
            }
        };
    }, 1000); // Delay the JSON get for 100 nanosecond so that we can show the loading spinner
};

// To create the donut chart
function createChart(d) {
    $("canvas#myChart").remove(); // To prevent previous chart overlapping
    $("div.chart-container").append('<canvas id="myChart" class="col-md-12"></canvas>'); // To prevent previous chart overlapping
    var underweight = d.underweight;
    var total_normal_range = d.total_normal_range;
    var overweight = d.overweight;
    var total_obese = d.total_obese;
    var ctx = document.getElementById('myChart');
    
    var myDoughnutChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Underweight', 'Normal Range', 'Overweight', 'Obese'],
            datasets: [{
                backgroundColor: ['#0D8AD6', '#0CCB49', '#D6990C', '#D6180C'],
                data: [underweight, total_normal_range, overweight, total_obese]
            }]
        },
        options: {
            title: {
                display: true,
                text: 'The Proportion (%) of BMI in Australia Based on Your Gender and Age'
            },
            tooltips: {
                yAlign: 'bottom'
            }
        }
    });
    return myDoughnutChart;
};

// To destroy or clear the rendered chart previously
function destroyMyChart(m) {
    m.destroy();
};
