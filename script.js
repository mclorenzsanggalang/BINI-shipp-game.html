// --- YOUR C++ DATA TRANSLATED ---
const BINI_SHIP_NAMES = {
    // Aiah pairings
    "Aiah-Stacey": "AiahCey/Kikayz/starphrodites/healers",
    "Aiah-Maloi": "MalAiah - Cookies",
    "Aiah-Jhoanna": "JhoAiah - Lewsers/Kalinaws",
    "Aiah-Gwen": "GwenAiah",
    "Aiah-Colet": "ColAiah - Ramenz",
    "Aiah-Sheena": "SheenAiah",
    "Aiah-Mikha": "MikhAiah - jellies",

    // Stacey pairings
    "Stacey-Maloi": "LoiCey - Luckystars",
    "Stacey-Jhoanna": "JhoCey/Mahmen - Bawangs",
    "Stacey-Gwen": "GwenCey - Spiders",
    "Stacey-Colet": "ColCey - Bare Minimum",
    "Stacey-Sheena": "SheeCey",
    "Stacey-Mikha": "MikhCey",

    "Stacey-Aiah": "AiahCey/Kikayz/starphrodites/healers",

    // Maloi pairings
    "Maloi-Jhoanna": "LuckyTin/Wifiz",
    "Maloi-Gwen": "GweLoi",
    "Maloi-Colet": "MaColet - Uyab Nation",
    "Maloi-Sheena": "SheeLoi",
    "Maloi-Mikha": "MikhaLoi",

    "Maloi-Aiah": "MalAiah - Cookies",
    "Maloi-Stacey": "LoiCey - Luckystars",

    // Jhoanna pairings
    "Jhoanna-Gwen": "JhoGwen",
    "Jhoanna-Colet": "JhoLet - Sweeties",
    "Jhoanna-Sheena": "JhoShee",
    "Jhoanna-Mikha": "MikJho/JhoMikha",

    "Jhoanna-Maloi": "LuckyTin/Wifiz",
    "Jhoanna-Stacey": "JhoCey/Mahmen - Bawangs",
    "Jhoanna-Aiah": "JhoAiah - Lewsers/Kalinaws",

    // Gwen pairings
    "Gwen-Colet": "Gwelet",
    "Gwen-Sheena": "Hambebe - babies",
    "Gwen-Mikha": "MikhGwen",

    "Gwen-Aiah": "GwenAiah",
    "Gwen-Stacey": "GwenCey - Spiders",
    "Gwen-Maloi": "GweLoi",
    "Gwen-Jhoanna": "JhoGwen",

    // Colet pairings
    "Colet-Sheena": "ColShee",
    "Colet-Mikha": "MikhOlet/Abunjingz - Cocalites",

    "Colet-Aiah": "ColAiah - Ramenz",
    "Colet-Stacey": "ColCey/Bare Minimum",
    "Colet-Maloi": "MaColet - Uyab Nation",
    "Colet-Jhoanna": "JhoLet - Sweeties",
    "Colet-Gwen": "Gwelet",

    // Sheena pairings
    "Sheena-Mikha": "MikhShee",

    "Sheena-Aiah": "SheenAiah",
    "Sheena-Stacey": "SheeCey",
    "Sheena-Maloi": "SheeLoi",
    "Sheena-Jhoanna": "Jhoshee",
    "Sheena-Gwen": "Hambebe - babies",
    "Sheena-Colet": "ColShee",

    // Mikha pairings
    "Mikha-Aiah": "MikhAiah - jellies",
    "Mikha-Stacey": "MikhCey",
    "Mikha-Maloi": "MikhaLoi",
    "Mikha-Jhoanna": "MikJho/JhoMikha/offcamz/burgerz",
    "Mikha-Gwen": "MikhGwen",
    "Mikha-Colet": "MikhOlet/Abunjingz - Cocalites",
    "Mikha-Sheena": "MikhShee"
    
};
let currentShip = "";
let playerBet = "";

// 1. SHIP SELECTION LOGIC
function confirmShip() {
    let m1 = document.getElementById('member1').value.trim();
    let m2 = document.getElementById('member2').value.trim();
    
    // Capitalize first letter
    m1 = m1.charAt(0).toUpperCase() + m1.slice(1).toLowerCase();
    m2 = m2.charAt(0).toUpperCase() + m2.slice(1).toLowerCase();

    const key = (m1 < m2) ? `${m1}-${m2}` : `${m2}-${m1}`;
    
    if (BINI_SHIP_NAMES[key]) {
        currentShip = BINI_SHIP_NAMES[key];
        document.getElementById('shipNameDisplay').innerText = currentShip;
        document.getElementById('shipInfo').classList.remove('hidden');
        checkReady();
    } else {
        alert("Invalid pair! Make sure names are spelled correctly.");
    }
}

function setBet(val) {
    playerBet = val;
    document.getElementById('betDisplay').innerHTML = `Your Bet: <strong>${val}</strong>`;
    checkReady();
}

function checkReady() {
    if (currentShip && playerBet) {
        document.getElementById('spinBtn').disabled = false;
    }
}

// 2. 8-PIE ROULETTE LOGIC
const canvas = document.getElementById("wheelCanvas");
const ctx = canvas.getContext("2d");
const slices = ["LAYAG", "LUBOG", "LAYAG", "LUBOG", "LAYAG", "LUBOG", "LAYAG", "LUBOG"];
const colors = ["#63CBD6", "#FFC0CB", "#63CBD6", "#FFC0CB", "#63CBD6", "#FFC0CB", "#63CBD6", "#FFC0CB"];
let startAngle = 0;
const arc = Math.PI / 4;

function drawWheel() {
    for (let i = 0; i < 8; i++) {
        let angle = startAngle + i * arc;
        ctx.fillStyle = colors[i];
        ctx.beginPath();
        ctx.arc(150, 150, 140, angle, angle + arc, false);
        ctx.lineTo(150, 150);
        ctx.fill();
        ctx.stroke();
        ctx.save();
        ctx.fillStyle = "white";
        ctx.font = "bold 14px Arial";
        ctx.translate(150 + Math.cos(angle + arc/2) * 100, 150 + Math.sin(angle + arc/2) * 100);
        ctx.rotate(angle + arc/2 + Math.PI/2);
        ctx.fillText(slices[i], -ctx.measureText(slices[i]).width/2, 0);
        ctx.restore();
    }
}

function spinWheel() {
    let spinDuration = 4000;
    let start = null;
    let rotationSpeed = Math.random() * 0.5 + 0.4;
    document.getElementById('spinBtn').disabled = true;

    function animate(time) {
        if (!start) start = time;
        let progress = time - start;
        if (progress < spinDuration) {
            startAngle += rotationSpeed;
            rotationSpeed *= 0.985; // Friction
            drawWheel();
            requestAnimationFrame(animate);
        } else {
            const index = Math.floor((360 - (startAngle * 180 / Math.PI % 360)) / 45) % 8;
            const result = slices[index];
            showResult(result);
        }
    }
    requestAnimationFrame(animate);
}

function showResult(result) {
    const display = document.getElementById('gameResult');
    if (result === playerBet) {
        display.innerHTML = `🎉 WIN! The shipp ${currentShip} ${result}ED!`;
        display.style.color = "#2d6a4f";
    } else {
        display.innerHTML = `💀 LOSE! The shipp ${currentShip} ${result}ED.`;
        display.style.color = "#c9184a";
    }
}

drawWheel();
