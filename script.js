let cart = 0;

// Lógica de simulação de compra fictícia
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

  // Roda o contador de carrinho e CO2 se existirem na tela
  addCart();

  setTimeout(() => {
    if(telaProcessando) telaProcessando.style.display = 'none';
    if(telaSucesso) telaSucesso.style.display = 'block';
    
    if(somCaixa) {
      somCaixa.play().catch(erro => console.log("Áudio bloqueado pelo navegador:", erro));
    }
  }, 2000);
}

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

// Fechar o modal ao clicar no botão
document.addEventListener('click', (e) => {
  if(e.target && e.target.id === 'btn-fechar-modal') {
    const modalCompra = document.getElementById('modal-compra');
    if(modalCompra) modalCompra.style.display = 'none';
  }
});

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
