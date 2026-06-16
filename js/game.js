let score = 0;

const area =
document.getElementById("gameArea");

function createHeart(){

const heart =
document.createElement("div");

heart.className = "heart";

heart.innerHTML = "❤️";

heart.style.left =
Math.random()*90 + "%";

heart.style.top =
Math.random()*80 + "%";

heart.onclick = () => {

score++;

document.getElementById("score")
.textContent = score;

heart.remove();

createHeart();

};

area.appendChild(heart);

}

for(let i=0;i<5;i++){

createHeart();

}