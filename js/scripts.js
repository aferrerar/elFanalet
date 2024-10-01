// The Fanalet class
class Fanalet {
    constructor(connected, name, bat, on_off, mode, light_R, light_G, light_B, light_A) {
        this.connected = connected;
        this.name = name;
        this.bat = bat;
        this.on_off = on_off;
        this.mode = mode;
        this.light_R = light_R;
        this.light_G = light_G;
        this.light_B = light_B;
        this.light_A = light_A;
    }
}

// Fanalet instances
let fanalet = [];
/*                       con,     name, bat, on, mode,   R,  G,  B,  A */
fanalet[0] = new Fanalet(1, "FNLT000",  50,  1,    1, 255, 0,  0,  100);
fanalet[1] = new Fanalet(0, "FNLT001",  80,  0,    2, 0,   255, 0,  100);
fanalet[2] = new Fanalet(0, "FNLT002",  90,  1,    3, 0,   0,  255, 100);

// Function to create a widget for each fanalet
function createFanaletWidget(fanaletInstance, index) {
    const widget = document.createElement('div');
    widget.classList.add('widget');

    // Unique IDs based on the index
    widget.innerHTML = `
        <div class="card text-bg-light mb-3 text-center" id="fanalet-card-${index}" style="max-width: 14rem;">
            <div class="card-header" id="fanalet-name-${index}" onclick="changeFanaletName(${index})">
                ${fanaletInstance.name}
            </div>
            <div class="card-body">
                <div class="row">
					<img src="assets/fanalet.svg" alt="fanalet Icon" id="fanalet-icon-${index} style="width: 200px; height: 150px;">
                    <i class="bi bi-lightbulb-fill fanalet-icon" id="fanalet-icon-${index}"></i>
                </div>
                <div class="btn-group" role="group" aria-label="Basic radio toggle button group">
                    <input type="radio" class="btn-check" name="btnradio-${index}" id="fanalet-btnradio-standalone-${index}" autocomplete="off" onchange="updateFanaletMode(${index}, 1)">
                    <label class="btn btn-outline-primary" for="fanalet-btnradio-standalone-${index}">
                        <i class="bi bi-person-arms-up"></i>
                    </label>
                </div>
                <div class="btn-group" role="group" aria-label="Basic radio toggle button group">
                    <input type="radio" class="btn-check" name="btnradio-${index}" id="fanalet-btnradio-broadcast-${index}" autocomplete="off" onchange="updateFanaletMode(${index}, 2)">
                    <label class="btn btn-outline-primary" for="fanalet-btnradio-broadcast-${index}">
                        <i class="bi bi-broadcast-pin"></i>
                    </label>

                    <input type="radio" class="btn-check" name="btnradio-${index}" id="fanalet-btnradio-observer-${index}" autocomplete="off" onchange="updateFanaletMode(${index}, 3)">
                    <label class="btn btn-outline-primary" for="fanalet-btnradio-observer-${index}">
                        <i class="bi bi-eye"></i>
                    </label>
                </div>
            </div>
        </div>
    `;

    return widget;
}

// Function to update the widget UI
function updateFanaletWidget(fanaletInstance, index) {
    // Update the name
    document.getElementById(`fanalet-name-${index}`).innerText = fanaletInstance.name;

    // Update the icon color
    let fanaletIcon = document.getElementById(`fanalet-icon-${index}`);
    if (fanaletInstance.on_off == 0) {
        fanaletIcon.style.color = "black";
    } else {
        let alphaValue = fanaletInstance.light_A / 100; // Ensure alpha is between 0 and 1
        fanaletIcon.style.color = `rgba(${fanaletInstance.light_R}, ${fanaletInstance.light_G}, ${fanaletInstance.light_B}, ${alphaValue})`;
    }

    // Update the radio button selection based on mode
    if (fanaletInstance.mode === 1) {
        document.getElementById(`fanalet-btnradio-standalone-${index}`).checked = true;
    } else if (fanaletInstance.mode === 2) {
        document.getElementById(`fanalet-btnradio-broadcast-${index}`).checked = true;
    } else if (fanaletInstance.mode === 3) {
        document.getElementById(`fanalet-btnradio-observer-${index}`).checked = true;
    }
	
	// Update the card class based on the connection status
    let fanaletCard = document.getElementById(`fanalet-card-${index}`);
	
    if (fanaletInstance.connected) {
        fanaletCard.classList.remove('text-bg-light');
        fanaletCard.classList.add('text-bg-primary');
    } else {
        fanaletCard.classList.remove('text-bg-primary');
        fanaletCard.classList.add('text-bg-light');
    }
	
	// Update the observer button style based on connection status
	let btn1 = document.querySelector(`label[for='fanalet-btnradio-standalone-${index}']`);
	let btn2 = document.querySelector(`label[for='fanalet-btnradio-broadcast-${index}']`);
	let btn3 = document.querySelector(`label[for='fanalet-btnradio-observer-${index}']`);
	
    if (fanaletInstance.connected) {
		btn1.classList.remove('btn-outline-primary');
        btn1.classList.add('btn-outline-light');
		btn2.classList.remove('btn-outline-primary');
        btn2.classList.add('btn-outline-light');
        btn3.classList.remove('btn-outline-primary');
        btn3.classList.add('btn-outline-light');
    } else {
		btn1.classList.remove('btn-outline-light');
        btn1.classList.add('btn-outline-primary');
		btn2.classList.remove('btn-outline-light');
        btn2.classList.add('btn-outline-primary');
        btn3.classList.remove('btn-outline-light');
        btn3.classList.add('btn-outline-primary');
    }
	
}

// Function to update the mode of the Fanalet instance when a radio button is changed
function updateFanaletMode(index, mode) {
    // Update the mode in the Fanalet array
    fanalet[index].mode = mode;
    // Optionally, update the UI or log it
    console.log(`Updated Fanalet ${index} mode to ${mode}`);
}

function changeFanaletName(index) {
    let newName = prompt("Enter new Fanalet name (max 8 characters):", fanalet[index].name);

    if (newName !== null) {
        newName = newName.trim();

        // Check if the entered name is within the 8-character limit
        if (newName.length > 8) {
            alert("Name must be 8 characters or less.");
            return;
        }

        // Check if the name is not empty after trimming
        if (newName !== "") {
            fanalet[index].name = newName;
            document.getElementById(`fanalet-name-${index}`).innerText = newName;
            console.log(`Updated Fanalet ${index} name to ${newName}`);
        } else {
            alert("Name cannot be empty.");
        }
    }
}

// Initialize the widgets
function initFanaletWidgets() {
    const container = document.getElementById('fanalet-widgets-container');
    fanalet.forEach((fanaletInstance, index) => {
        const widget = createFanaletWidget(fanaletInstance, index);
        container.appendChild(widget);
        updateFanaletWidget(fanaletInstance, index);  // Update widget with initial values
    });
}

// Ensure DOM is fully loaded before creating and updating the widgets
document.addEventListener("DOMContentLoaded", function() {
    initFanaletWidgets();  // Initialize widgets
});

// BUTTON SCAN/STOP
document.getElementById('scan-button').addEventListener('click', function() {
    var button = this;
    if (button.classList.contains('btn-success')) {
        button.classList.remove('btn-success');
        button.classList.add('btn-danger');
        button.textContent = 'STOP';
    } else {
        button.classList.remove('btn-danger');
        button.classList.add('btn-success');
        button.textContent = 'SCAN';
    }
});