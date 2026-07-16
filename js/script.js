alert("🎮 歡迎來到 Battle Arena！");
let playerHP = 100;
let enemyHP = 100;

let defending = false;

const playerHPText = document.getElementById("playerHP");
const enemyHPText = document.getElementById("enemyHP");

const playerBar = document.getElementById("playerBar");
const enemyBar = document.getElementById("enemyBar");

const attackBtn = document.getElementById("attackBtn");
const healBtn = document.getElementById("healBtn");
const restartBtn = document.getElementById("restartBtn");
const defendBtn = document.getElementById("defendBtn");

const battleLog = document.getElementById("battleLog");

// 新增戰鬥紀錄
function addLog(text) {

    const li = document.createElement("li");

    li.textContent = text;

    battleLog.prepend(li);

}

// 更新畫面
function updateUI() {

    playerHPText.textContent = `${playerHP} / 100`;

    enemyHPText.textContent = `${enemyHP} / 100`;

    playerBar.style.width = playerHP + "%";

    enemyBar.style.width = enemyHP + "%";

}

// 怪物攻擊
function enemyAttack() {

    if (enemyHP <= 0) return;

    let damage = Math.floor(Math.random() * 16) + 5;

    if (defending) {

        damage = Math.floor(damage / 2);

        defending = false;

        addLog("🛡️ 防禦成功，傷害減半！");

    }

    playerHP -= damage;

    if (playerHP < 0) {

        playerHP = 0;

    }

    addLog(`👹 Slime 攻擊造成 ${damage} 點傷害`);

    updateUI();

    if (playerHP <= 0) {

        alert("💀 Game Over");

        attackBtn.disabled = true;

        healBtn.disabled = true;

    }

}

//輸入名稱
let playerName = prompt("請輸入你的遊戲名稱");

if (!playerName) {
    playerName = "Hero";
}




document.getElementById("playerName").textContent = "🧙 " +playerName;




    // 玩家攻擊
    attackBtn.addEventListener("click", function () {

        let damage;

        let critical = Math.random() < 0.2;

        if (critical) {

            damage = Math.floor(Math.random() * 21) + 30;

            addLog("💥 Critical Hit!");

        } else {

            damage = Math.floor(Math.random() * 21) + 10;

        }

        enemyHP -= damage;

        if (enemyHP < 0) {

            enemyHP = 0;

        }

        addLog(`⚔️ Hero 攻擊造成 ${damage} 點傷害`);

        updateUI();

        if (enemyHP <= 0) {

            addLog("🎉 Victory!");

            alert("🏆 You Win!");

            attackBtn.disabled = true;

            healBtn.disabled = true;

            return;

        }

        enemyAttack();

    });

// 補血
healBtn.addEventListener("click", function () {

    let heal = Math.floor(Math.random() * 16) + 10;

    playerHP += heal;

    if (playerHP > 100) {

        playerHP = 100;

    }

    addLog(`🧪 Hero 回復 ${heal} HP`);

    updateUI();

    enemyAttack();

});

// 重新開始
restartBtn.addEventListener("click", function () {
    let yes = confirm("確定重新開始? ");
    if (!yes) {
        return;
    }

    playerHP = 100;

    enemyHP = 100;

    battleLog.innerHTML = "";

    attackBtn.disabled = false;

    healBtn.disabled = false;

    updateUI();

});

updateUI();