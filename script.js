// Usuários de exemplo
const usuarios = {
  "lucas": "010229",
  "teste": "12345",
  "maria": "abcde"
};

// Função de login
function login() {
  const user = document.getElementById("username").value;
  const pass = document.getElementById("password").value;

  if (usuarios[user] && usuarios[user] === pass) {
    // Redireciona para a página de rendimento
    window.location.href = "rendimento.html"; 
  } else {
    document.getElementById("mensagem").innerHTML =
      `<p style="color:red;">Usuário ou senha incorretos.</p>`;
  }
  return false; // evita recarregar a página
}

// --------------------
// Funções de cálculo
// --------------------
function formatarContabil(valor) {
  return valor.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}

let resumoWhatsApp = "";

// Só adiciona o listener se existir o formulário (ou seja, estamos em rendimento.html)
const form = document.getElementById("formulario");
if (form) {
  form.addEventListener("submit", function(e) {
    e.preventDefault();

    try {
      const pecuarista = document.getElementById("pecuarista").value;
      const fazenda = document.getElementById("fazenda").value;
      const data = document.getElementById("data").value;
      const qtd = parseInt(document.getElementById("qtd").value);
      const entrada = parseFloat(document.getElementById("entrada").value);
      const saida = parseFloat(document.getElementById("saida").value);

      if (entrada <= 0 || saida <= 0 || qtd <= 0) {
        throw "Valores inválidos!";
      }

      const rendimento = (saida / entrada) * 100;
      const mediaEntrada = entrada / qtd;
      const mediaSaida = saida / qtd;
      const mediaEntradaArroba = mediaEntrada / 15;
      const mediaSaidaArroba = mediaSaida / 15;

      const resultado =
        `Pecuarista: ${pecuarista}\n` +
        `Fazenda: ${fazenda}\n` +
        `Data: ${data}\n` +
        `Qtd. Animais: ${qtd}\n` +
        `Peso Fazenda: ${formatarContabil(entrada)} kg\n` +
        `Média Animal Fazenda: ${formatarContabil(mediaEntrada)} kg (${mediaEntradaArroba.toFixed(2)} @)\n` +
        `Peso Frigorifico: ${formatarContabil(saida)} kg\n` +
        `Média Animal Frigorifico: ${formatarContabil(mediaSaida)} kg (${mediaSaidaArroba.toFixed(2)} @)\n` +
        `Rendimento: ${rendimento.toFixed(2)}%`;

      document.getElementById("resultado").textContent = resultado;
      resumoWhatsApp = resultado;
    } catch (err) {
      alert("Erro: " + err);
    }
  });
}

// Função limpar
function limpar() {
  if (document.getElementById("pecuarista")) {
    document.getElementById("pecuarista").value = "";
    document.getElementById("fazenda").value = "";
    document.getElementById("data").value = "";
    document.getElementById("qtd").value = "";
    document.getElementById("entrada").value = "";
    document.getElementById("saida").value = "";
    document.getElementById("resultado").textContent = "";
    resumoWhatsApp = "";
  }
}

// Copiar resumo
function copiarResumo() {
  if (resumoWhatsApp) {
    navigator.clipboard.writeText(resumoWhatsApp).then(() => {
      alert("Resumo copiado! Agora é só colar no WhatsApp 📲");
    });
  } else {
    alert("Nenhum resumo gerado ainda!");
  }

}
