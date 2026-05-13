const url = "http://127.0.0.1:8000/tarefas";

const lista = document.getElementById("listaTarefas");
const form = document.getElementById("formTarefa");

// mostra as tarefas na tela
function mostrarTarefas(tarefas) {
  lista.innerHTML = "";

  for (let i = 0; i < tarefas.length; i++) {
    const item = document.createElement("li");
    item.innerHTML =
      tarefas[i].titulo +
      ' <button onclick="excluirTarefa(' +
      tarefas[i].id +
      ')">Excluir</button>';
    lista.appendChild(item);
  }
}

// pega as tarefas do back
function carregarTarefas() {
  fetch(url)
    .then(resposta => resposta.json())
    .then(dados => {
      mostrarTarefas(dados);
    });
}

// so qnd envia o form
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const tarefa = {
    titulo: document.getElementById("titulo").value,
    materia: document.getElementById("materia").value,
    prazo: document.getElementById("prazo").value
  };

  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(tarefa)
  })
  .then(() => {
    carregarTarefas(); // atualiza 
    form.reset(); // limpa form
  });
});

// exclui a tarefa
function excluirTarefa(id) {

  fetch(url + "/" + id, {
    method: "DELETE"
  })

  .then(() => {
    carregarTarefas(); // atualiza lista
  });

}

carregarTarefas();