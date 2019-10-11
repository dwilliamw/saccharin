// To generate the low intensity exercise buttons
function lowButtons() {
    var lowList = ['Billiards', 'Bowling', 'Burpee', 'Gardening', 'Golf', 'Ping-Pong', 'Push-up', 'Sitting', 'Sit-ups',
                    'Softball', 'Tai-Chi', 'Track-and-Field', 'Walking', 'Weight-lifting', 'Yoga'];
    for (i = 0; i < lowList.length; i++) {
        var btn = document.createElement("input");
        var text = document.createTextNode(lowList[i]);
        btn.appendChild(text);
        btn.setAttribute("id", "low" + i);
        btn.setAttribute("type", "button")
        btn.setAttribute("class", "mybuttons");
        btn.setAttribute("value", lowList[i]);
        btn.setAttribute("style", "background-image: url(/img/exercise-buttons/low/" + lowList[i] + ".jpg" + ");")
        btn.setAttribute("onclick", "getExcerciseDB(this.value);")
        document.getElementById("tab1").appendChild(btn);
    };
};

// To generate the moderate intensity exercise buttons
function modButtons() {
    var modList = ['Badminton', 'Baseball', 'Basketball', 'Kayaking', 'Rowing', 'Running', 'Skateboarding', 'Skiing', 'Snorkeling',
                    'Snow-shoeing', 'Stationary-cycling', 'Volleyball', 'Wrestling'];
    for (i = 0; i < modList.length; i++) {
        var btn = document.createElement("input");
        var text = document.createTextNode(modList[i]);
        btn.appendChild(text);
        btn.setAttribute("id", "mod" + i);
        btn.setAttribute("type", "button")
        btn.setAttribute("class", "mybuttons");
        btn.setAttribute("value", modList[i]);
        btn.setAttribute("style", "background-image: url(/img/exercise-buttons/mod/" + modList[i] + ".jpg" + ");")
        btn.setAttribute("onclick", "getExcerciseDB(this.value);")
        document.getElementById("tab2").appendChild(btn);
    };
};

// To generate the highest intensity exercise buttons
function intButtons() {
    var intList = ['Aerobics', 'Boxing', 'Handball', 'Soccer', 'Speed-skating', 'Squash', 'Stair-machine',
                    'Swimming', 'Tennis', 'Water-polo'];
    for (i = 0; i < intList.length; i++) {
        var btn = document.createElement("input");
        var text = document.createTextNode(intList[i]);
        btn.appendChild(text);
        btn.setAttribute("id", "int" + i);
        btn.setAttribute("type", "button")
        btn.setAttribute("class", "mybuttons");
        btn.setAttribute("value", intList[i]);
        btn.setAttribute("style", "background-image: url(/img/exercise-buttons/int/" + intList[i] + ".jpg" + ");")
        btn.setAttribute("onclick", "getExcerciseDB(this.value);");
        document.getElementById("tab3").appendChild(btn);
    };
};

// To call all of the button functions
function createAllButtons() {
    lowButtons();
    modButtons();
    intButtons();
    hideOutputContainer();
    getCalFromSugars();
};

// To count the number of outputs generated
function countOutput() {
    var length = $('#output-exercises').find('p').length;
    return length;
};


// To check whether the output contains a specific exercise
function checkElement(v) {
    return exercise_array.includes(v);
}

// To show the number of calories that need to be burned
function showCaloriesToBurn() {
    var myCalories = $('#kcal').val();
    $('#myKcal').text('Total Calories You Want to Burn: ' + myCalories + ' Calories (kcal)');
};

// To hide the output container
function hideOutputContainer() {
    $('.output-container').hide();
};

// To show the output container
function showOutputContainer() {
    $('.output-container').show();
};

// To clear the existing output content
function clearOutput() {
    $('#output-exercises').empty();
    exercise_array = [];
};

// To get the calories from sugars from the local storage
function getCalFromSugars() {
    var calFromSugar = window.localStorage.getItem('localCalories')
    if (calFromSugar != null) {
        $('#kcal').val(calFromSugar)
    } else {
        $('#kcal').val('0');
    };
    
};

// To automatically scroll down to the output section
function scrollToOutput() {
    document.getElementById('scroll-here').scrollIntoView({ behavior: "smooth", block: "end", inline: "start" });
};

var exercise_array = [];

// To get the GIF by name
function getGIFByName(name) {
    return data.filter(
        function (data) {
            return data.name == name
        });
};

// To call the API and get exercise information in terms of calories burned
function getExcerciseDB(value) {
    console.log(value);
    var found = getGIFByName(value);
    var gif_link = found[0].gif;
    console.log(gif_link);
    if (countOutput() < 5 && checkElement(value) == false) {
        showCaloriesToBurn();
        showLoader();
        var enteredExercise = value;
        var enteredCalories = $('#kcal').val();
        setTimeout(function () {
            $.ajax({
                url: 'https://trackapi.nutritionix.com/v2/natural/exercise',
                async: false,
                type: 'POST',
                headers: {
                    'x-app-id': '5e7ab318',
                    'x-app-key': '89b3530dd2463a70c7913d05d47636bf',
                    'Content-Type': 'application/json',
                },

                data: JSON.stringify({
                    "query": enteredExercise + " 1min"
                }),
                dataType: 'json',
                success: function (data) {
                    hideLoader();
                    showOutputContainer();
                    scrollToOutput();
                    //console.log(data);
                    //console.log(data.exercises[0].nf_calories);
                    var nf_calories = data.exercises[0].nf_calories; // calories burned in one minute
                    var one_minute = nf_calories;
                    var one_hour = Math.round(one_minute * 60);
                    var exercise_name = data.exercises[0].user_input;
                    var duration = Math.round(enteredCalories / nf_calories);
                    //console.log("Estimated Calories Burned in One Hour: " + one_hour + " kcal")
                    //console.log("Estimated Time to Burn Your Calories: " + duration + " min(s)")
                    exercise_array.push(value);
                    $('#output-exercises').append('<div class="indiv_out"><p>Exercise Name: ' + '<b>' + exercise_name + '</b> | Duration: ' + '<b>' + duration + '</b> min(s)' + ' | Calories burned per hour: ' + '<b>' + one_hour + '</b> kcal' + '</p>' +
                        '<a class="hover-gif">' + exercise_name + ' GIF: <b>Hover Me</b><img src="' + gif_link + '" /></a></div>');
                }
            });
        }, 1000);
    } else if (countOutput() >= 5) {
        alert('Oops you cannot choose more than 5 exercises to compare. You can press the clear all button.');
    } else if (countOutput() < 5 && checkElement(value) == true) {
        alert('Oops you have selected ' + value + ' twice, you can choose other exercise');
    };
};

// To show the loading spinner
function showLoader() {
    $("#loader").attr('class', 'loader loader-default is-active')
};

// To hide the loading spinner
function hideLoader() {
    $("#loader").attr('class', 'loader loader-default')
};

var data = [
    { name: 'Billiards', gif: "https://media.giphy.com/media/QXWORsvGb3zdS/giphy.gif" },
    { name: 'Bowling', gif: "https://media.giphy.com/media/VgJdeO5Fkvfqg/giphy.gif" },
    { name: 'Burpee', gif: "https://media.giphy.com/media/lEYcevSwZ55Go/giphy.gif" },
    { name: 'Gardening', gif: "https://media.giphy.com/media/1ylPOs3DMqlxsyqIw9/giphy.gif" },
    { name: 'Golf', gif: "https://media.giphy.com/media/3orif7dPxm05py2x9u/giphy.gif" },
    { name: 'Ping-Pong', gif: "https://media.giphy.com/media/SwRyILPR4S6Ig/giphy.gif" },
    { name: 'Push-up', gif: "https://media.giphy.com/media/3og0IPcmqPjr32J1e0/giphy.gif" },
    { name: 'Sitting', gif: "https://media.giphy.com/media/Q60OPG0xWZbtVTtoyV/giphy.gif" },
    { name: 'Sit-ups', gif: "https://media.giphy.com/media/huHYI809mgwMw/giphy.gif" },
    { name: 'Softball', gif: "https://media.giphy.com/media/3rgXBCa1m18bKa9T3i/giphy.gif" },
    { name: 'Tai-Chi', gif: "https://media.giphy.com/media/l2Sqb3eAKkP06JkRy/giphy.gif" },
    { name: 'Track-and-Field', gif: "https://media.giphy.com/media/13MUyg7C3ilM8U/giphy.gif" },
    { name: 'Walking', gif: "https://media.giphy.com/media/3orif6LqArO7SYGTzW/giphy.gif" },
    { name: 'Weight-lifting', gif: "https://media.giphy.com/media/FskYViAkG1LG/giphy.gif" },
    { name: 'Yoga', gif: "https://media.giphy.com/media/kJO5gpaoW2IA8/giphy.gif" },
    { name: 'Badminton', gif: 'https://media.giphy.com/media/xT1R9EFwojGbQ92MqQ/giphy.gif' },
    { name: 'Baseball', gif: 'https://media.giphy.com/media/3otOKsqHz8cLLzD7JC/giphy.gif' },
    { name: 'Basketball', gif: 'https://media.giphy.com/media/xTiTnpcaFPfJAzaP8A/giphy.gif' },
    { name: 'Kayaking', gif: 'https://media.giphy.com/media/l2JecQkOkb2Jc8vQc/giphy.gif' },
    { name: 'Rowing', gif: 'https://media.giphy.com/media/rVUvL9orXqFi/giphy.gif' },
    { name: 'Running', gif: 'https://media.giphy.com/media/vCJrwYGBQlbdS/giphy.gif' },
    { name: 'Skateboarding', gif: 'https://media.giphy.com/media/vCJrwYGBQlbdS/giphy.gif' },
    { name: 'Skiing', gif: 'https://media.giphy.com/media/2aLiVCqTZmxwXeRfMh/giphy.gif' },
    { name: 'Snorkeling', gif: 'https://media.giphy.com/media/QTa9YvrCqLzDZnn4Cf/giphy.gif' },
    { name: 'Snow-shoeing', gif: 'https://media.giphy.com/media/9oI4MCnfYv8rxLNdZK/giphy.gif' },
    { name: 'Stationary-cycling', gif: 'https://media.giphy.com/media/pjl91hQV4OJtS/giphy.gif' },
    { name: 'Volleyball', gif: 'https://media.giphy.com/media/l0G17Fp1jdq62ZltK/giphy.gif' },
    { name: 'Wrestling', gif: 'https://media.giphy.com/media/i2rZ1WGOud2dq/giphy.gif' },
    { name: 'Aerobics', gif: 'https://media.giphy.com/media/L6pR869dhwG6Q/giphy.gif' },
    { name: 'Boxing', gif: 'https://media.giphy.com/media/xT1XH3d4QgZSjoZSVy/giphy.gif' },
    { name: 'Handball', gif: 'https://media.giphy.com/media/3owypjRyFdVUQRXsJO/giphy.gif' },
    { name: 'Soccer', gif: 'https://media.giphy.com/media/SKAQ4kWov6tdC/giphy.gif' },
    { name: 'Speed-skating', gif: 'https://media.giphy.com/media/pzcBQQs6aJ5CbxKFZm/giphy.gif' },
    { name: 'Squash', gif: 'https://media.giphy.com/media/fBFSt76inXGNy/giphy.gif' },
    { name: 'Stair-machine', gif: 'https://media.giphy.com/media/39xECXySeCsT34Kdk9/giphy.gif' },
    { name: 'Swimming', gif: 'https://media.giphy.com/media/l3V0mnnGcVblF8bAI/giphy.gif' },
    { name: 'Tennis', gif: 'https://media.giphy.com/media/88tGPfFe4gAMg/giphy.gif' },
    { name: 'Water-polo', gif: 'https://media.giphy.com/media/5QPaE4FBaeX1DXUZCo/giphy.gif' }
]