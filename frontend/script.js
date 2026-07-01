const API = "http://127.0.0.1:8000";

let token = "";

const form = document.getElementById("formTarefa");
const lista = document.getElementById("listaTarefas");
const filtroMateria = document.getElementById("filtroMateria");

let tarefasSalvas = [];

// LOGIN AUTOMÁTICO
async function fazerLogin() {

  const resposta = await fetch(`${API}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      usuario: "admin",
      senha: "123"
    })
  });

  const dados = await resposta.json();

  token = dados.access_token;

  console.log("Login realizado!");
}

// CARREGAR TAREFAS
async function carregarTarefas() {

  const resposta = await fetch(`${API}/tarefas`, {
    headers: {
      Authorization: token
    }
  });

  tarefasSalvas = await resposta.json();

  mostrarTarefas(tarefasSalvas);
}

// MOSTRAR TAREFAS
function mostrarTarefas(tarefas) {

  lista.innerHTML = "";

  tarefas.forEach(tarefa => {

    const item = document.createElement("li");

    if (tarefa.concluida) {
      item.classList.add("concluida");
    }

    item.innerHTML = `
      <div>
        <strong>${tarefa.titulo}</strong><br>
        Matéria: ${tarefa.materia}<br>
        Prazo: ${tarefa.prazo}<br>
        Status:
        ${tarefa.concluida ? "✅ Concluída" : "⏳ Pendente"}
      </div>

      <div class="botoes">
        <button class="btn-concluir"
          onclick="concluirTarefa(${tarefa.id})">
          Concluir
        </button>

        <button class="btn-editar"
          onclick="editarTarefa(${tarefa.id})">
          Editar
        </button>

        <button class="btn-excluir"
          onclick="excluirTarefa(${tarefa.id})">
          Excluir
        </button>
      </div>
    `;

    lista.appendChild(item);
  });
}

// FILTRO
filtroMateria.addEventListener("input", () => {

  const texto = filtroMateria.value.toLowerCase();

  const filtradas = tarefasSalvas.filter(tarefa =>
    tarefa.materia.toLowerCase().includes(texto)
  );

  mostrarTarefas(filtradas);
});

// ADICIONAR TAREFA
form.addEventListener("submit", async (e) => {

  e.preventDefault();

  const tarefa = {
    titulo: document.getElementById("titulo").value,
    materia: document.getElementById("materia").value,
    prazo: document.getElementById("prazo").value
  };

  await fetch(`${API}/tarefas`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token
    },
    body: JSON.stringify(tarefa)
  });

  form.reset();

  carregarTarefas();
});

// EXCLUIR
async function excluirTarefa(id) {

  await fetch(`${API}/tarefas/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: token
    }
  });

  carregarTarefas();
}

// CONCLUIR
async function concluirTarefa(id) {

  await fetch(`${API}/tarefas/${id}`, {
    method: "PUT",
    headers: {
      Authorization: token
    }
  });

  carregarTarefas();
}

// EDITAR
async function editarTarefa(id) {

  const novoTitulo = prompt("Novo título:");

  if (!novoTitulo) return;

  await fetch(`${API}/tarefas/${id}/editar`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: token
    },
    body: JSON.stringify({
      titulo: novoTitulo
    })
  });

  carregarTarefas();
}

// INICIAR SISTEMA
(async () => {
  await fazerLogin();
  await carregarTarefas();
})();