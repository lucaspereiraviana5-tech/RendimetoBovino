function formatarContabil(valor) {
  return valor.toLocaleString("pt-BR", {minimumFractionDigits: 2, maximumFractionDigits: 2});
}

let resumoWhatsApp = "";

document.getElementById("formulario").addEventListener("submit", function(e) {
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
      `Peso de entrada: ${formatarContabil(entrada)} kg\n` +
      `Média animal (entrada): ${formatarContabil(mediaEntrada)} kg (${mediaEntradaArroba.toFixed(2)} @)\n` +
      `Peso de saída: ${formatarContabil(saida)} kg\n` +
      `Média animal (saída): ${formatarContabil(mediaSaida)} kg (${mediaSaidaArroba.toFixed(2)} @)\n` +
      `Rendimento: ${rendimento.toFixed(2)}%`;

    document.getElementById("resultado").innerText = resultado;

    resumoWhatsApp =
      `*Resumo do Rendimento*\n\n` +
      `*Pecuarista:* ${pecuarista}\n` +
      `*Fazenda:* ${fazenda}\n` +
      `*Data:* ${data}\n` +
      `*Qtd. Animais:* ${qtd}\n` +
      `*Peso de entrada:* ${formatarContabil(entrada)} kg\n` +
      `*Média animal (entrada):* ${formatarContabil(mediaEntrada)} kg (${mediaEntradaArroba.toFixed(2)} @)\n` +
      `*Peso de saída:* ${formatarContabil(saida)} kg\n` +
      `*Média animal (saída):* ${formatarContabil(mediaSaida)} kg (${mediaSaidaArroba.toFixed(2)} @)\n` +
      `*Rendimento:* ${rendimento.toFixed(2)}%`;
  } catch (err) {
    alert("Erro: " + err);
  }
});

function limpar() {
  document.getElementById("pecuarista").value = "";
  document.getElementById("fazenda").value = "";
  document.getElementById("data").value = new Date().toLocaleDateString("pt-BR");
  document.getElementById("qtd").value = "";
  document.getElementById("entrada").value = "";
  document.getElementById("saida").value = "";
  document.getElementById("resultado").innerText = "";
  resumoWhatsApp = "";
}

function copiarResumo() {
  if (resumoWhatsApp) {
    navigator.clipboard.writeText(resumoWhatsApp).then(() => {
      alert("Resumo copiado! Agora é só colar no WhatsApp 📲");
    });
  } else {
    alert("Nenhum resumo gerado ainda!");
  }
}