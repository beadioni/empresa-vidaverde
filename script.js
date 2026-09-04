const produtos = [
  {nome:"Grão Vivo - Quinoa Real", cat:"graos", preco:"R$ 32,90", emoji:"🌾", desc:"Proteína completa e fibras"},
  {nome:"Chá Calm - Camomila & Lavanda", cat:"chas", preco:"R$ 24,90", emoji:"🍵", desc:"Relaxamento noturno"},
  {nome:"Suplemento Puro - Ashwagandha", cat:"suplementos", preco:"R$ 89,90", emoji:"💊", desc:"Foco e anti-estresse"},
  {nome:"Grão da Terra - Lentilha Orgânica", cat:"graos", preco:"R$ 18,90", emoji:"🫘", desc:"Rico em ferro"},
  {nome:"Chá Energy - Gengibre & Guaraná", cat:"chas", preco:"R$ 27,90", emoji:"🔥", desc:"Energia natural"},
  {nome:"Suplemento Green - Clorella", cat:"suplementos", preco:"R$ 79,90", emoji:"🌿", desc:"Detox e imunidade"}
];

const grid = document.getElementById('productGrid');
let cart = 0;

function render(filtro="todos"){
  grid.innerHTML="";
  produtos.filter(p=> filtro==="todos" || p.cat===filtro).forEach(p=>{
    grid.innerHTML+=`
      <div class="product">
        <div style="font-size:40px">${p.emoji}</div>
        <h3>${p.nome}</h3>
        <p style="opacity:.7;font-size:14px">${p.desc}</p>
        <div class="price">${p.preco}</div>
        <button onclick="addCart()">Adicionar</button>
      </div>
    `;
  })
}
render();

document.querySelectorAll('.filter').forEach(btn=>{
  btn.addEventListener('click',()=>{
    document.querySelectorAll('.filter').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    render(btn.dataset.filter);
  })
})

function addCart(){
  cart++;
  document.getElementById('cartCount').innerText=cart;
  let bar = document.getElementById('progressBar');
  let txt = document.getElementById('impactText');
  bar.style.width = Math.min(cart*20,100)+"%";
  txt.innerText = `Incrível! Você já compensou ${cart*0.8}kg de CO2 e apoia agricultura familiar.`;
  // animação CO2
  document.getElementById('co2').innerText = (cart*0.8).toFixed(1)+"kg";
}

// Tema
document.getElementById('themeToggle').onclick = () =>{
  document.body.classList.toggle('dark');
  document.getElementById('themeToggle').innerText = document.body.classList.contains('dark') ? "🌙" : "☀️";
}

// Quiz
function openQuiz(){document.getElementById('quizModal').style.display='flex'}
function closeQuiz(){document.getElementById('quizModal').style.display='none'}
function answerQuiz(tipo){
  let res = document.getElementById('quizResult');
  if(tipo==="energia") res.innerText="Recomendamos: Chá Energy + Grão Vivo Quinoa";
  if(tipo==="calma") res.innerText="Recomendamos: Chá Calm + Suplemento Ashwagandha";
  if(tipo==="foco") res.innerText="Recomendamos: Suplemento Green Clorella + Lentilha Orgânica";
}
