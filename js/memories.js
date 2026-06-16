fetch("data/memories.json")

.then(res => res.json())

.then(memories => {

const timeline =
document.getElementById("timeline");

memories.forEach(memory => {

const card =
document.createElement("div");

card.style.margin = "20px";

card.innerHTML = `
<h3>${memory.title}</h3>
<p>${memory.description}</p>
`;

timeline.appendChild(card);

});

});