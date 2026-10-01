const produtos = [
  {nome:"Grão Vivo - Quinoa Real", cat:"graos", preco:"R\$ 32,90", emoji:"🌾", desc:"Proteína completa e fibras"},
  {nome:"Chá Calm - Camomila & Lavanda", cat:"chas", preco:"R\$ 24,90", emoji:"🍵", desc:"Relaxamento noturno"},
  {nome:"Suplemento Puro - Ashwagandha", cat:"suplementos", preco:"R\$ 89,90", emoji:"💊", desc:"Foco e anti-estresse"},
  {nome:"Grão da Terra - Lentilha Orgânica", cat:"graos", preco:"R\$ 18,90", emoji:"🫘", desc:"Rico em ferro"},
  {nome:"Chá Energy - Gengibre & Guaraná", cat:"chas", preco:"R\$ 27,90", emoji:"🔥", desc:"Energia natural"},
  {nome:"Suplemento Green - Clorella", cat:"suplementos", preco:"R\$ 79,90", emoji:"🌿", desc:"Detox e imunidade"}
];

const grid = document.getElementById('productGrid');
let cart = 0;

function render(filtro="todos"){
  if(!grid) return; // Evita erros se o elemento não existir na página
  grid.innerHTML="";
  produtos.filter(p=> filtro==="todos" || p.cat===filtro).forEach(p=>{
    grid.innerHTML+=`
      <div class="product">
        <div style="font-size:40px">${p.emoji}</div>
        <h3>${p.nome}</h3>
        <p style="opacity:.7;font-size:14px">${p.desc}</p>
        <div class="price">${p.preco}</div>
        <button onclick="simularCompra('${p.nome}')">Comprar</button>
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
  const cartCount = document.getElementById('cartCount');
  const bar = document.getElementById('progressBar');
  const txt = document.getElementById('impactText');
  const co2 = document.getElementById('co2');

  if(cartCount) cartCount.innerText=cart;
  if(bar) bar.style.width = Math.min(cart*20,100)+"%";
  if(txt) txt.innerText = `Incrível! Você já compensou ${cart*0.8}kg de CO2 e apoia agricultura familiar.`;
  if(co2) co2.innerText = (cart*0.8).toFixed(1)+"kg";
}

// Tema
const themeToggle = document.getElementById('themeToggle');
if(themeToggle) {
  themeToggle.onclick = () =>{
    document.body.classList.toggle('dark');
    themeToggle.innerText = document.body.classList.contains('dark') ? "🌙" : "☀️";
  }
}

// Quiz
function openQuiz(){ const q = document.getElementById('quizModal'); if(q) q.style.display='flex'; }
function closeQuiz(){ const q = document.getElementById('quizModal'); if(q) q.style.display='none'; }
function answerQuiz(tipo){
  let res = document.getElementById('quizResult');
  if(!res) return;
  if(tipo==="energia") res.innerText="Recomendamos: Chá Energy + Grão Vivo Quinoa";
  if(tipo==="calma") res.innerText="Recomendamos: Chá Calm + Suplemento Ashwagandha";
  if(tipo==="foco") res.innerText="Recomendamos: Suplemento Green Clorella + Lentilha Orgânica";
}

// ==========================================
// LÓGICA DA COMPRA FICTÍCIA
// ==========================================
function simularCompra(nomeDoProduto) {
  const modalCompra = document.getElementById('modal-compra');
  const telaProcessando = document.getElementById('compra-processando');
  const telaSucesso = document.getElementById('compra-sucesso');
  const nomeProdutoModal = document.getElementById('nome-produto-modal');
  const somCaixa = document.getElementById('som-caixa');

  if(nomeProdutoModal) nomeProdutoModal.innerText = nomeDoProduto;
  if(modalCompra) modalCompra.style.display = 'flex';
  if(telaProcessando) telaProcessando.style.display = 'block';
  if(telaSucesso) telaSucesso.style.display = 'none';

  addCart();

  setTimeout(() => {
    if(telaProcessando) telaProcessando.style.display = 'none';
    if(telaSucesso) telaSucesso.style.display = 'block';
    
    if(somCaixa) {
      somCaixa.play().catch(erro => console.log("Áudio bloqueado:", erro));
    }
  }, 2000);
}

// Evento para fechar o modal
document.addEventListener('click', (e) => {
  if(e.target && e.target.id === 'btn-fechar-modal') {
    const modalCompra = document.getElementById('modal-compra');
    if(modalCompra) modalCompra.style.display = 'none';
  }
});
