let appliances = [];

// Automatically fill power input when an appliance is selected
function handleApplianceChange() {
    const applianceTypeElement = document.getElementById("appliance-type");
    const selectedOption = applianceTypeElement.options[applianceTypeElement.selectedIndex];

    // Show custom name input if "Other" is selected
    if (selectedOption.value === "Other") {
        document.getElementById("custom-appliance").style.display = "block";
        document.getElementById("power").value = "";
    } else {
        document.getElementById("custom-appliance").style.display = "none";
        document.getElementById("custom-appliance-name").value = "";
        document.getElementById("power").value = selectedOption.dataset.watt;
    }
}

function addAppliance() {
    const applianceTypeElement = document.getElementById("appliance-type");
    const selectedOption = applianceTypeElement.options[applianceTypeElement.selectedIndex];
    const applianceName = selectedOption.value === "Other" ? document.getElementById("custom-appliance-name").value : selectedOption.value;
    const power = parseFloat(document.getElementById("power").value);
    const quantity = parseInt(document.getElementById("quantity").value);
    const usage = parseFloat(document.getElementById("usage").value);
        const puc = parseInt(document.getElementById("puc").value);



    if (applianceName && power && quantity > 0 && usage >= 0) {
        appliances.push({ applianceName, power, quantity, usage });
        
        // Reset fields
        document.getElementById("quantity").value = "1";
        document.getElementById("usage").value = "";
        document.getElementById("custom-appliance-name").value = "";
        document.getElementById("power").value = "";

        displayAppliances();
    } else {
        alert("Please enter valid details for all fields.");
    }
}

function displayAppliances() {
    const applianceList = document.getElementById("appliance-list");
    applianceList.innerHTML = "";

    appliances.forEach((appliance, index) => {
        const li = document.createElement("li");
        li.innerText = `${appliance.quantity} x ${appliance.applianceName} - ${appliance.power}W, ${appliance.usage} hrs/day`;
        applianceList.appendChild(li);
    });
}

function calculateBill() {
     const ratePerKWh = parseFloat(document.getElementById("puc").value);  // Correctly retrieve the rate per kWh from the input field
    if (isNaN(ratePerKWh) || ratePerKWh <= 0) {
        alert("Please enter a valid Per Unit Cost.");
        return;
    }
    // const ratePerKWh = puc;  // Rate per kWh in ₹
    let totalDailyConsumption = 0;

    appliances.forEach(appliance => {
        const dailyConsumption = (appliance.power / 1000) * appliance.usage * appliance.quantity;
        totalDailyConsumption += dailyConsumption;
    });

    const totalMonthlyConsumption = totalDailyConsumption * 30;
    const monthlyBill = totalMonthlyConsumption * ratePerKWh;

    document.getElementById("daily-consumption").innerText = `Total Daily Consumption: ${totalDailyConsumption.toFixed(2)} kWh`;
    document.getElementById("monthly-consumption").innerText = `Total Monthly Consumption: ${totalMonthlyConsumption.toFixed(2)} kWh`;
    document.getElementById("monthly-bill").innerText = `Approximate Monthly Bill: ₹${monthlyBill.toFixed(2)}`;
}
