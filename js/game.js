const message = document.getElementById("message");

let playerHP = 100;
let enemyHP = 100;

const playerBar = document.getElementById("playerBar");
const enemyBar = document.getElementById("enemyBar");

const attackBtn = document.getElementById("attackBtn");
const healBtn = document.getElementById("healBtn");
const restartBtn = document.getElementById("restartBtn");

const battleLog = document.getElementById("battleLog");

// 更新血條
function updateBar() {

    playerBar.style.width = playerHP + "%";
    playerBar.textContent = playerHP;

    enemyBar.style.width = enemyHP + "%";
    enemyBar.textContent = enemyHP;

}

// 新增紀錄
function addLog(text) {

    const li = document.createElement("li");

    li.textContent = text;

    battleLog.prepend(li);

}

// 怪物攻擊
function enemyAttack() {

    if (enemyHP <= 0) return;

    let critical = Math.random() < 0.25;

    let damage;

    if (critical) {

        damage = Math.floor(Math.random() * 21) + 35;

        addLog("💥 怪物爆擊！");

    } else {

        damage = Math.floor(Math.random() * 21) + 20;

    }

    playerHP -= damage;

    if (playerHP < 0) {

        playerHP = 0;

    }

    addLog("👹 怪物攻擊，造成 " + damage + " 點傷害");
    if (critical) {

        message.innerHTML = "💥 怪物爆擊！造成 <b>" + damage + "</b> 點傷害！";

    } else {

        message.innerHTML = "👹 怪物造成 <b>" + damage + "</b> 點傷害";

    }


    updateBar();

    if (playerHP <= 0) {

        alert("💀 你輸了！");

        attackBtn.disabled = true;
        healBtn.disabled = true;

    }

}

// 玩家攻擊
attackBtn.addEventListener("click", function () {

    let critical = Math.random() < 0.2;

    let damage;

    if (critical) {

        damage = Math.floor(Math.random() * 21) + 30;

        addLog("💥 爆擊！");

    } else {

        damage = Math.floor(Math.random() * 21) + 10;

    }

    enemyHP -= damage;

    if (enemyHP < 0) {

        enemyHP = 0;

    }

    addLog("⚔️ 玩家攻擊，造成 " + damage + " 點傷害");

    if (critical) {

        message.innerHTML = "💥 玩家爆擊！造成 <b>" + damage + "</b> 點傷害！";

    } else {

        message.innerHTML = "⚔️ 玩家造成 <b>" + damage + "</b> 點傷害";

    }

    updateBar();

    if (enemyHP <= 0) {

        alert("🏆 勝利！");

        attackBtn.disabled = true;
        healBtn.disabled = true;

        return;

    }

    enemyAttack();

});

// 補血
healBtn.addEventListener("click", function () {

    let heal = Math.floor(Math.random() * 11) + 5;

    playerHP += heal;

    if (playerHP > 100) {

        playerHP = 100;

    }

    addLog("❤️ 玩家恢復 " + heal + " 點生命");
    message.innerHTML = "❤️ 玩家恢復 <b>" + heal + "</b> 點生命";

    updateBar();

    enemyAttack();

});

// 重新開始
restartBtn.addEventListener("click", function () {

    if (!confirm("確定重新開始？")) {

        return;

    }

    playerHP = 100;
    enemyHP = 100;

    battleLog.innerHTML = "";

    attackBtn.disabled = false;
    healBtn.disabled = false;

    updateBar();

});

updateBar();