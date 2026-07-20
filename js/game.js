function showEffect(text, type, target) {

    const effect = document.getElementById(target);

    effect.className = "effect";

    if (type === "damage") {
        effect.classList.add("damage");
    }

    if (type === "heal") {
        effect.classList.add("heal");
    }

    if (type === "critical") {
        effect.classList.add("critical");
    }

    effect.textContent = text;

    setTimeout(function () {
        effect.textContent = "";
    }, 800);

} const message = document.getElementById("message");

const MAX_HP = 200;

let playerHP = MAX_HP;
let enemyHP = MAX_HP;

const playerBar = document.getElementById("playerBar");
const enemyBar = document.getElementById("enemyBar");

const attackBtn = document.getElementById("attackBtn");
const healBtn = document.getElementById("healBtn");
const restartBtn = document.getElementById("restartBtn");

const battleLog = document.getElementById("battleLog");

// 更新血條
function updateBar() {

    playerBar.style.width = (playerHP / MAX_HP) * 100 + "%";
    enemyBar.style.width = (enemyHP / MAX_HP) * 100 + "%";

    playerBar.textContent = playerHP + " / " + MAX_HP;
    enemyBar.textContent = enemyHP + " / " + MAX_HP;

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

    let critical = Math.random() < 0.15;

    let damage;

    if (critical) {

        damage = Math.floor(Math.random() * 11) + 20;

        addLog("💥 怪物爆擊！");

    } else {

        damage = Math.floor(Math.random() * 11) + 10;

    }

    playerHP -= damage;

    if (playerHP < 0) {

        playerHP = 0;

    }

    addLog("👹 怪物攻擊，造成 " + damage + " 點傷害");
    showEffect("-" + damage, "damage", "playerEffect");
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

        damage = Math.floor(Math.random() * 11) + 25;

        addLog("💥 爆擊！");
        showEffect("💥 -" + damage, "critical", "enemyEffect");

    } else {

        damage = Math.floor(Math.random() * 11) + 12;

    }

    enemyHP -= damage;

    if (enemyHP < 0) {

        enemyHP = 0;

    }

    addLog("⚔️ 玩家攻擊，造成 " + damage + " 點傷害");

    if (!critical) {

        showEffect("-" + damage, "damage", "enemyEffect");

    }

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

    setTimeout(function () {

        enemyAttack();

    }, 500);

});

// 補血
healBtn.addEventListener("click", function () {

    let heal = Math.floor(Math.random() * 8) + 8;

    playerHP += heal;

    if (playerHP > MAX_HP) {

        playerHP = MAX_HP;

    }

    addLog("❤️ 玩家恢復 " + heal + " 點生命");
    showEffect("+" + heal, "heal", "playerEffect");
    message.innerHTML = "❤️ 玩家恢復 <b>" + heal + "</b> 點生命";

    updateBar();

    setTimeout(function () {

        enemyAttack();

    }, 500);

});

// 重新開始
restartBtn.addEventListener("click", function () {

    if (!confirm("確定重新開始？")) {

        return;

    }

    playerHP = MAX_HP;
    enemyHP = MAX_HP;

    battleLog.innerHTML = "";

    attackBtn.disabled = false;
    healBtn.disabled = false;

    updateBar();

});


updateBar();