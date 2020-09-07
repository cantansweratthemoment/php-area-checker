document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("button").addEventListener("click", submit);
});

function submit() {
    if (checkY()) {
        let xButtons = document.getElementsByName("radiobuttons");
        let form = new FormData();
        for (let i = 0; i < 9; i++) {
            if (xButtons[i].checked) {
                let x = xButtons[i].value;
                form.append("x", x);
                break;
            }
        }
        let rSelect = document.getElementById("select");
        let r = rSelect.value;
        let y = document.getElementById("y").value;
        form.append("y", y.replace(',', '.'));
        form.append("r", r);
        let request = new XMLHttpRequest();
        request.open('POST', 'server.php');
        request.onreadystatechange = function () {
            if (request.readyState === 4 && request.status === 200) {
                document.querySelector(".not-main-table").innerHTML = request.responseText;
            }
        }
        request.send(form);
    }
}

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("cleaningbutton").addEventListener("click", clean);
});

function clean() {
    let cleaningform = new FormData();
    let cleaningrequest = new XMLHttpRequest();
    cleaningrequest.open('POST', 'clean.php');
    cleaningrequest.onreadystatechange = function () {
        if (cleaningrequest.readyState === 4 && cleaningrequest.status === 200) {
            document.querySelector(".not-main-table").innerHTML = cleaningrequest.responseText;
        }
    }
    cleaningrequest.send(cleaningform);
}

function checkY() {
    let y = document.getElementById("y");
    if (y.value.trim() === "") {
        alert("Y не должен быть пустым!");
        return false;
    } else if (!isFinite(y.value.replace(',', '.'))) {
        alert("Y должен быть числом!");
    } else if (y.value >= 5 || y.value <= -5) {
        alert("Y должен быть в диапазоне (-5; 5)");
        return false;
    } else {
        return true;
    }
}