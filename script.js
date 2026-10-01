// 1. Sua lista original de produtos apontando para as imagens reais (.jpg)
const produtos = [
  {nome: "Chá de Hibisco Orgânico", cat: "chas", preco: "R\$ 29,90", img: "produto1.jpg", desc: "Antioxidante natural"},
  {nome: "produtos naturais e orgânicos", cat: "todos", preco: "R\$ 24,90", img: "produto3.jpg", desc: "Chás, suplementos, alimentos veganos"},
  {nome: "Curcuma orgânica de pimenta", cat: "todos", preco: "R\$ 27,90", img: "produto9.jpg", desc: "Natural e refrescante"},
  {nome: "Suplemento Vegano", cat: "suplementos", preco: "R\$ 89,90", img: "produto4.jpg", desc: "Vitaminas 100% naturais"},
  {nome: "Proteína Vegetal", cat: "suplementos", preco: "R\$ 119,90", img: "produto5.jpg", desc: "mel natural"},
  {nome: "óleo de omega3", cat: "suplementos", preco: "R\$ 34,90", img: "produto6.jpg", desc: "Com castanhas e mel"},
  {nome: "Sabonete natural", cat: "todos", preco: "R\$ 32,90", img: "produto7.jpg", desc: "Chia, linhaça e girassol"},
  {nome: "produto natural de espirulina", cat: "suplementos", preco: "R\$ 59,90", img: "produto8.jpg", desc: "Pílulas"}
];

const grid = document.getElementById('productGrid');
let cart = 0;

// 2. Função render que reconstrói os seus cards mantendo a tag <div class="product-img">
function render(filtro="todos"){
  if(!grid) return; 
  grid.innerHTML="";
  
  produtos.filter(p => filtro === "todos" || p.cat === filtro || filtro === "todos").forEach(p => {
    grid.innerHTML += `
      <div class="product-card">
        <div class="product-img"><img src="${p.img}" alt="${p.nome}"></div>
        <h3>${p.nome}</h3>
        <p>${p.desc}</p>
        <span class="price">${p.preco}</span>
        <button onclick="simularCompra('${p.nome}')">Comprar</button>
      </div>
    `;
  });
}
render();

// Mantém os filtros funcionando se você tiver os botões com a classe .filter
document.querySelectorAll('.filter').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    render(btn.dataset.filter);
  });
});

function addCart(){
  cart++;
  const cartCount = document.getElementById('cartCount');
  const bar = document.getElementById('progressBar');
  const txt = document.getElementById('impactText');
  const co2 = document.getElementById('co2');

  if(cartCount) cartCount.innerText = cart;
  if(bar) bar.style.width = Math.min(cart * 20, 100) + "%";
  if(txt) txt.innerText = `Incrível! Você já compensou ${cart * 0.8}kg de CO2 e apoia agricultura familiar.`;
  if(co2) co2.innerText = (cart * 0.8).toFixed(1) + "kg";
}

// Tema Escuro/Claro
const themeToggle = document.getElementById('themeToggle');
if(themeToggle) {
  themeToggle.onclick = () => {
    document.body.classList.toggle('dark');
    themeToggle.innerText = document.body.classList.contains('dark') ? "🌙" : "☀️";
  };
}

// Quiz
function openQuiz(){ const q = document.getElementById('quizModal'); if(q) q.style.display = 'flex'; }
function closeQuiz(){ const q = document.getElementById('quizModal'); if(q) q.style.display = 'none'; }
function answerQuiz(tipo){
  let res = document.getElementById('quizResult');
  if(!res) return;
  if(tipo === "energia") res.innerText = "Recomendamos: Chá Energy + Grão Vivo Quinoa";
  if(tipo === "calma") res.innerText = "Recomendamos: Chá Calm + Suplemento Ashwagandha";
  if(tipo === "foco") res.innerText = "Recomendamos: Suplemento Green Clorella + Lentilha Orgânica";
}

// ==========================================
// LÓGICA DA COMPRA FICTÍCIA INTEGRADA
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

  // Roda a lógica do carrinho/CO2 junto com a compra!
  addCart();

  setTimeout(() => {
    if(telaProcessando) telaProcessando.style.display = 'none';
    if(telaSucesso) telaSucesso.style.display = 'block';
    
    if(somCaixa) {
      somCaixa.play().catch(erro => console.log("Áudio bloqueado pelo navegador:", erro));
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
