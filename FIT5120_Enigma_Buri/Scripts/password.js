var pass1 = "monashfit2019";
var flag = false;
while (flag == false && window.localStorage.getItem('localPassword') != pass1) {
    var password;
    password = prompt("Please enter the password to view the page");
    if (password == pass1) {
        flag = true;
        window.localStorage.setItem('localPassword', password);
        alert('Correct password, click Ok to enter.');
    } else {
        alert("Wrong password");
    };
};