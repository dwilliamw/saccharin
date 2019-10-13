// To create legend for the gauge graph on stress eating analysis
var colorList = { Low: '#c9d107', Moderate: '#fa9801', High: '#ff0000' };
colorize = function (colorList) {
    var container = document.getElementById('gauge-container');

    for (var key in colorList) {
        var boxContainer = document.createElement("DIV");
        var box = document.createElement("DIV");
        var label = document.createElement("SPAN");

        label.innerHTML = key;
        box.className = "box";
        box.style.backgroundColor = colorList[key];

        boxContainer.appendChild(box);
        boxContainer.appendChild(label);

        container.appendChild(boxContainer);

    }
}
colorize(colorList);

// To calculate the output of the questionnaire
function calculateStress() {
    if (inputValidation() == true) {
        totalValue = 0;
        avgValue = 0;
        percentValue = 0;
        $(':radio:checked').each(function () {
            totalValue = totalValue + parseInt($(this).val(), 10);
        });
        avgValue = totalValue / 10;
        percentValue = avgValue * 20;
        window.localStorage.setItem('localStress', percentValue.toString());
        $('#answer').show();
        createStatusGauge(percentValue);
        $('#str_btn').show();
    };
};

// To call all functions at once
function callOutputs() {
    showLoader();
    setTimeout(function () {
        hideLoader();
        calculateStress();
        createPlotly();
    }, 2000);
    
};

// To create Scatter plot using Plotly
function createPlotly() {
    $('#myPlotly').remove();
    $('div#answer').append('<div id="myPlotly" style="padding-left:25px; margin-top:30px; margin-bottom:30px;"></div>');
    $('div#answer').append('<li>The graph above shows the relationship between sugar consumption in (gram) vs. the stress level.</li>');
    $('div#answer').append("<li>The data points shown above is collected based on the users input data from 'Sugar Analysis' page and from the 'Stress Eating Analysis' page.</li>");
    $('div#answer').append('<li>If the trend line on the graph shows an <b>upward trend</b>, then it indicates there is a positive correlation. The higher your stress level then you are likely to consume high amount of sugar.</li>');
    $('div#answer').append('<li>If the trend line on the graph shows a <b>downward trend</b>, then it indicates there is a negative correlation. The higher your stress level then you are less likely to consume high amount of sugar.</li>');
    var x_data = [];
    var y_data = [];
    var fb_data = retrieveAndUpdateData();
    console.log(fb_data);
    for (i = 0; i < fb_data.length; i++) {
        x_data.push(fb_data[i]['stress']);
        y_data.push(fb_data[i]['sugar']);
    };
    var linearReg = linearRegression(y_data, x_data);
    console.log(linearReg);
    var y0_data = linearReg['intercept'] + (linearReg['slope'] * Math.min(...x_data));
    var y1_data = linearReg['intercept'] + (linearReg['slope'] * Math.max(...x_data));

    var trace1 = {
        x: x_data,
        y: y_data,
        mode: 'markers',
        type: 'scatter'
    };

    var layout = {
        title: 'Correlation Between Sugar Consumption vs. Stress Level',
        width: 800,
        height: 400,
        shapes: [
            {
                type: 'line',
                x0: Math.min(...x_data),
                y0: y0_data,
                x1: Math.max(...x_data),
                y1: y1_data,
                line: {
                    color: 'red',
                    width: 3
                }
            }
        ],
        xaxis: {
            title: {
                text: 'Stress Level',
                font: {
                    family: 'Montserrat'
                }
            }
        },
        yaxis: {
            title: {
                text: 'Sugar Consumption (gram)',
                font: {
                    family: 'Montserrat'
                }
            }
        }
    };

    var data = [trace1];
    Plotly.newPlot('myPlotly', data, layout);
};

// To create Status Gauge
function createStatusGauge(val) {
    $('#gauge').remove();
    $('#message').remove();
    $("div#answer").append('<div id="gauge" style="width:300px; height:200px; margin-left:auto;margin-right:auto;"></div>')
    var low_message = "Nice! It seems that you are not under stress and not an emotional eater. Keep it up, stay healthy!";
    var mod_message = "Hey, you should pay attention to what you eat and your stress level. You might become an emotional eater."
    var high_message = "You have a high chance to be an emotional eater. Please be aware of what you eat, especially sugary foods and drinks."
    var status = "";
    if (val <= 33) {
        status = "Low Stress Level";
        $("div#answer").append('<p id="message" align="center">' + low_message + '</p>');
    } else if (val > 33 && val <= 66) {
        status = "Moderate Stress Level";
        $("div#answer").append('<p id="message" align="center">' + mod_message + '</p>');
    } else {
        status = "High Stress Level";
        $("div#answer").append('<p id="message" align="center">' + high_message + '</p>');
    }
    var g = new JustGage({
        id: "gauge",
        value: val,
        min: 0,
        max: 100,
        title: status,
        label: "Stress Level"
    });
};

// To hide the loading spinner
function hideLoader() {
    $("#loader").attr('class', 'loader loader-default')
};

// To validate that the user's have answered all of the questions
function inputValidation() {
    if ($('input[name="q1"]:checked').length == 0) {
        alert("Please answer question 1");
        return false;
    } else if ($('input[name="q2"]:checked').length == 0) {
        alert("Please answer question 2");
        return false;
    } else if ($('input[name="q3"]:checked').length == 0) {
        alert("Please answer question 3");
        return false;
    } else if ($('input[name="q4"]:checked').length == 0) {
        alert("Please answer question 4");
        return false;
    } else if ($('input[name="q5"]:checked').length == 0) {
        alert("Please answer question 5");
        return false;
    } else if ($('input[name="q6"]:checked').length == 0) {
        alert("Please answer question 6");
        return false;
    } else if ($('input[name="q7"]:checked').length == 0) {
        alert("Please answer question 7");
        return false;
    } else if ($('input[name="q8"]:checked').length == 0) {
        alert("Please answer question 8");
        return false;
    } else if ($('input[name="q9"]:checked').length == 0) {
        alert("Please answer question 9");
        return false;
    } else if ($('input[name="q10"]:checked').length == 0) {
        alert("Please answer question 10");
        return false;
    } else if ($('input[name="q10"]:checked').length == 0) {
        alert("Please answer question 1");
        return false;
    } else {
        return true;
    }
};

// To calculate the intercept, slope and r squared value.
function linearRegression(y, x) {
    var lr = {};
    var n = y.length;
    var sum_x = 0;
    var sum_y = 0;
    var sum_xy = 0;
    var sum_xx = 0;
    var sum_yy = 0;

    for (var i = 0; i < y.length; i++) {

        sum_x += x[i];
        sum_y += y[i];
        sum_xy += (x[i] * y[i]);
        sum_xx += (x[i] * x[i]);
        sum_yy += (y[i] * y[i]);
    }

    lr['slope'] = (n * sum_xy - sum_x * sum_y) / (n * sum_xx - sum_x * sum_x);
    lr['intercept'] = (sum_y - lr.slope * sum_x) / n;
    lr['r2'] = Math.pow((n * sum_xy - sum_x * sum_y) / Math.sqrt((n * sum_xx - sum_x * sum_x) * (n * sum_yy - sum_y * sum_y)), 2);

    return lr;
};

// To reset the output box
function resetAnswer() {
    document.getElementById("myForm").reset();
    var answerbox = document.getElementById('answer');
    answerbox.innerHTML = "";
    $('#answer').hide();
    $('#div_str_btn').hide();
};

// To retrieve and update to Firebase DB
function retrieveAndUpdateData() {
    var d;
    var localSugars = window.localStorage.getItem('localSugars');
    var localStress = window.localStorage.getItem('localStress');
    $.ajax({
        url: 'https://project-saccharin.firebaseio.com/sugar_vs_stress.json',
        async: false,
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            console.log(data);
            d = data;
        }
    });
    if (localSugars != undefined && localStress != undefined) {
        localSugars = parseInt(localSugars);
        localStress = parseInt(localStress);
        var newData = { "sugar": localSugars, "stress": localStress };
        d.push(newData);
        $.ajax({
            url: 'https://project-saccharin.firebaseio.com/sugar_vs_stress.json',
            type: 'PUT',
            contentType: 'json',
            data: JSON.stringify(d),
            success: function (d) {
                //alert('Success. Firebase DB is updated.'); // alert for testing
            }
        });
        window.localStorage.removeItem('localSugars');
        window.localStorage.removeItem('localStress');
    } else {
        //alert("Firebase DB is not updated. Incomplete data.") // alert for testing
    };

    return d;
};

// To show the loading spinner
function showLoader() {
    $("#loader").attr('class', 'loader loader-default is-active')
};