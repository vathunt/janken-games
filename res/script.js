let skorKen           = 0;
let skorPlayer        = 0;
let timeOut           = "";

let ken               = document.getElementById("ninja-ken");

let splashScreen      = document.getElementsByClassName("splash")[0];
let startGame         = document.getElementsByClassName("start")[0];
let displaySkorKen    = document.getElementsByClassName("skor-ken")[0];
let displaySkorPlayer = document.getElementsByClassName("skor-player")[0];

let reset             = document.getElementById("reset");
let batu              = document.getElementById("batu");
let gunting           = document.getElementById("gunting");
let kertas            = document.getElementById("kertas");

let status	      = document.getElementById("status");

if (localStorage.getItem("skorKen")) {
	skorKen = localStorage.getItem("skorKen");
	displaySkorKen.innerHTML = skorKen;
}

if (localStorage.getItem("skorPlayer")) {
	skorPlayer = localStorage.getItem("skorPlayer");
	displaySkorPlayer.innerHTML = skorPlayer;
}

startGame.addEventListener("click", () => {
	splashScreen.style.top = "-110vh";
	splashScreen.style.transition = ".75s";
});

batu.addEventListener("click", () => {
	janken(0);
});

gunting.addEventListener("click", () => {
	janken(1);
});

kertas.addEventListener("click", () => {
	janken(2);
});

reset.addEventListener("click", () => {
	if (confirm("Ini akan memulai ulang permainan, Anda yakin?")) {
		skorKen    = 0;
		skorPlayer = 0;
		displaySkorKen.innerHTML    = skorKen;
		displaySkorPlayer.innerHTML = skorPlayer;
		localStorage.clear();
	}
});

function janken(tangan) {
	let jariKen = Math.floor(Math.random() * 3);

	switch (jariKen) {
		case 0:
			ken.style.backgroundImage = "url(res/ken-batu.png)";
			break;
		case 1:
			ken.style.backgroundImage = "url(res/ken-gunting.png)";
			break;
		default:
			ken.style.backgroundImage = "url(res/ken-kertas.png)";
			break;
	}

	ken.classList.remove("goyang");

	switch (tangan) {
		case 0:
			if (jariKen == 0) {
				result("draw");
			} else if (jariKen == 1) {
				result("player");
			} else {
				result("ken");
			}
			break;
		case 1:
			if (jariKen == 0) {
				result("ken");
			} else if (jariKen == 1) {
				result("draw");
			} else {
				result("player");
			}
			break;
		default:
			if (jariKen == 0) {
				result("player");
			} else if (jariKen == 1) {
				result("ken");
			} else {
				result("draw");
			}
			break;
	}
}

function result(who) {
	clearTimeout(timeOut);

	switch (who) {
		case "ken":
			skorKen++;
			localStorage.setItem("skorKen", skorKen);
			displaySkorKen.innerHTML= skorKen;
			status.innerHTML= "Ninja Ken Win";
			console.log("Ninja Ken Menang");
			break;
		case "player":
			skorPlayer++;
			localStorage.setItem("skorPlayer", skorPlayer);
			displaySkorPlayer.innerHTML= skorPlayer;
			status.innerHTML= "Player Win";
			console.log("Anda Menang");
			break;
		default:
			status.innerHTML= "Draw";
			console.log("Seri");
			break;
	}

	timeOut = setTimeout(() => {
		ken.style.removeProperty("background-image");
		ken.classList.add("goyang");
	}, 3000);
}
