// Predefined credentials
const VALID_USER = "admin";
const VALID_PASS = "1234";

function handleLogin() {
    const userInp = document.getElementById('username').value;
    const passInp = document.getElementById('password').value;
    const errorMsg = document.getElementById('error-msg');

    if (userInp === VALID_USER && passInp === VALID_PASS) {
        // Redirect to the dashboard page
        window.location.href = "dashboard.html";
    } else {
        errorMsg.innerText = "Invalid credentials! Try admin / 1234";
    }
}

// Function for the Logout button on the dashboard
function logout() {
    window.location.href = "index.html";
}
// --- Music Logic ---
let audio = document.getElementById("myAudio");

function playMusic() {
    audio.play();
}

function pauseMusic() {
    audio.pause();
}

function changeVolume(val) {
    audio.volume = val;
}

async function connectBT() {
    const statusText = document.getElementById('status');
    const connInterface = document.getElementById('connection-interface');
    const musicInterface = document.getElementById('music-interface');
    
    try {
        // This tells the browser: "Show me everything you find"
        const device = await navigator.bluetooth.requestDevice({
            acceptAllDevices: true
            // Note: We removed the 'optionalServices' filter to make it more general
        });

        // Update UI once a device is picked
        statusText.innerText = "Connecting to " + device.name + "...";
        
        // Connect to the device GATT Server (required by some browsers to finalize connection)
        const server = await device.gatt.connect();

        // SUCCESS: Show the Music Player
        connInterface.style.display = "none";
        musicInterface.style.display = "block";
        
        console.log("Successfully connected to:", device.name);

        // Listen for accidental disconnection
        device.addEventListener('gattserverdisconnected', onDisconnected);

    } catch (error) {
        console.log("Scan cancelled or failed: " + error);
        statusText.innerText = "No device selected.";
        statusText.style.color = "red";
    }
}

function onDisconnected(event) {
    const device = event.target;
    console.log('Device ' + device.name + ' is disconnected.');
    disconnectBT(); // Reset the UI
}
// Simulate Live IoT Data
setInterval(() => {
    // Random Temp between 22 and 26
    const temp = (Math.random() * (26 - 22) + 22).toFixed(1);
    if(document.getElementById('temp')) document.getElementById('temp').innerText = temp + "°C";

    // Random CPU between 10 and 20
    const cpu = Math.floor(Math.random() * 10) + 10;
    if(document.getElementById('cpu-load')) document.getElementById('cpu-load').innerText = cpu + "%";
}, 3000); // Updates every 3 seconds

// Toggle LED Simulation
let ledState = false;
function toggleLED() {
    ledState = !ledState;
    const btn = document.getElementById('led-btn');
    btn.innerText = ledState ? "ON" : "OFF";
    btn.style.background = ledState ? "#28a745" : "#dc3545";

}
