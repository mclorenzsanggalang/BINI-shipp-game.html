// --- YOUR C++ DATA TRANSLATED ---
const BINI_SHIP_NAMES = {
    // Aiah pairings
    "Aiah-Stacey": "AiahCey/Kikayz",
    "Aiah-Maloi": "MalAiah/Cookies",
    "Aiah-Jhoanna": "JhoAiah/Lewsers",
    "Aiah-Gwen": "GwenAiah",
    "Aiah-Colet": "ColAiah/Ramenz",
    "Aiah-Sheena": "SheenAiah",
    "Aiah-Mikha": "MikhAiah",

    // Stacey pairings
    "Maloi-Stacey": "LoiCey/Luckystars",
    "Jhoanna-Stacey": "JhoCey/Bawangs",
    "Gwen-Stacey": "GwenCey/Spiders",
    "Colet-Stacey": "ColCey/Bare Minimum",
    "Sheena-Stacey": "SheeCey",
    "Mikha-Stacey": "MikhCey",
    "Aiah-Stacey": "AiahCey/Kikayz",

    // Maloi pairings
    "Jhoanna-Maloi": "LuckyTin/Wifiz",
    "Gwen-Maloi": "GweLoi",
    "Colet-Maloi": "MaColet/Uyab Nation",
    "Maloi-Sheena": "SheeLoi",
    "Maloi-Mikha": "MikhaLoi",
    "Aiah-Maloi": "MalAiah/Cookies",
    "Maloi-Stacey": "LoiCey/Luckystars",

    // Jhoanna pairings
    "Gwen-Jhoanna": "JhoGwen",
    "Colet-Jhoanna": "JhoLet/Sweeties",
    "Jhoanna-Sheena": "JhoShee",
    "Jhoanna-Mikha": "MikJho/JhoMikha",
    "Jhoanna-Maloi": "LuckyTin/Wifiz",
    "Jhoanna-Stacey": "JhoCey/Bawangs",
    "Aiah-Jhoanna": "JhoAiah/Lewsers",

    // Gwen pairings
    "Colet-Gwen": "Gwelet",
    "Gwen-Sheena": "Hambebe",
    "Gwen-Mikha": "MikhGwen",
    "Aiah-Gwen": "GwenAiah",
    "Gwen-Stacey": "GwenCey/Spiders",
    "Gwen-Maloi": "GweLoi",
    "Gwen-Jhoanna": "JhoGwen",

    // Colet pairings
    "Colet-Sheena": "ColShee",
    "Colet-Mikha": "MikhOlet/Abunjingz",
    "Aiah-Colet": "ColAiah/Ramenz",
    "Colet-Stacey": "ColCey/Bare Minimum",
    "Colet-Maloi": "MaColet/Uyab Nation",
    "Colet-Jhoanna": "JhoLet/Sweeties",
    "Colet-Gwen": "Gwelet",

    // Sheena pairings
    "Mikha-Sheena": "MikhShee",
    "Aiah-Sheena": "SheenAiah",
    "Sheena-Stacey": "SheeCey",
    "Maloi-Sheena": "SheeLoi",
    "Jhoanna-Sheena": "Jhoshee",
    "Gwen-Sheena": "Hambebe",
    "Colet-Sheena": "ColShee",

    // Mikha pairings
    "Aiah-Mikha": "MikhAiah",
    "Mikha-Stacey": "MikhCey",
    "Maloi-Mikha": "MikhaLoi",
    "Jhoanna-Mikha": "MikJho/JhoMikha",
    "Gwen-Mikha": "MikhGwen",
    "Colet-Mikha": "MikhOlet/Abunjingz",
    "Mikha-Sheena": "MikhShee",
    
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