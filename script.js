var currentGradientIndex = 0;

function copyCode() {
    var code = document.getElementById("code").textContent;

    navigator.clipboard.writeText(code).then(function () {
        console.log("Code copied to clipboard: ", code);
    }).catch(function (error) {
        console.error("Failed to copy code: ", error);
    });
}

function showPreviousGradient() {
    if (currentGradientIndex > 0) {
        currentGradientIndex--;
        var gradient = gradientHistory[currentGradientIndex];
        setGradientAndCode(gradient);
    }
}

function showNextGradient() {
    if (currentGradientIndex < gradientHistory.length - 1) {
        currentGradientIndex++;
        var gradient = gradientHistory[currentGradientIndex];
        setGradientAndCode(gradient);
    }
}

function randomColor() {
    var hex = Math.floor(Math.random() * 256).toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function randomGradient() {
    var angle = Math.floor(Math.random() * 360); // A random angle between 0 and 360 degrees
    var color1 = "#" + randomColor() + randomColor() + randomColor(); // A random color
    var color2 = "#" + randomColor() + randomColor() + randomColor(); // Another random color
    return "linear-gradient(" + angle + "deg, " + color1 + ", " + color2 + ")"; // The CSS gradient
}

var gradientHistory = [];

function addToHistory(gradient) {
    gradientHistory.push(gradient);
    currentGradientIndex = gradientHistory.length - 1;
}

function setGradientAndCode(gradient) {
    document.getElementById("background").style.background = gradient;
    document.getElementById("code").textContent = gradient;
}

function changeBackground() {
    var gradient = randomGradient();
    setGradientAndCode(gradient);
    addToHistory(gradient);
}

changeBackground();

document.getElementById("copyBtn").addEventListener("click", copyCode);
document.getElementById("prevBtn").addEventListener("click", showPreviousGradient);
document.getElementById("nextBtn").addEventListener("click", showNextGradient);
document.getElementById("randomBtn").addEventListener("click", changeBackground);

document.addEventListener("keydown", function (event) {
    if (event.code === "ArrowLeft") {
        showPreviousGradient();
    } else if (event.code === "ArrowRight") {
        showNextGradient();
    } else if (event.code === "Space") {
        changeBackground();
    }
});