const API = "http://127.0.0.1:8000";

let token = localStorage.getItem("token") || "";

const form = document.getElementById("formTarefa");
const lista = document.getElementById("listaTarefas");
const filtroMateria = document.getElementById("filtroMateria");

let tarefasSalvas = [];


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

  localStorage.setItem("token", token);

  console.log("Login realizado!");
}


function headers() {
  return {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`
  };
}


async function carregarTarefas() {

  const resposta = await fetch(`${API}/tarefas`, {
    headers: headers()
  });

  tarefasSalvas = await resposta.json();

  mostrarTarefas(tarefasSalvas);
}


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
        ${tarefa.concluida ? "Concluída" : "Pendente"}
      </div>

      <div class="botoes">

        <button onclick="concluirTarefa(${tarefa.id})">
          Concluir
        </button>

        <button onclick="editarTarefa(${tarefa.id})">
          Editar
        </button>

        <button onclick="excluirTarefa(${tarefa.id})">
          Excluir
        </button>

      </div>
    `;

    lista.appendChild(item);

  });
}

filtroMateria.addEventListener("input", () => {

  const texto = filtroMateria.value.toLowerCase();

  const filtradas = tarefasSalvas.filter(tarefa =>
    tarefa.materia.toLowerCase().includes(texto)
  );

  mostrarTarefas(filtradas);

});

form.addEventListener("submit", async (e) => {

  e.preventDefault();


  const tarefa = {

    titulo: document.getElementById("titulo").value,

    materia: document.getElementById("materia").value,

    prazo: document.getElementById("prazo").value

  };


  await fetch(`${API}/tarefas`, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify(tarefa)
  });
  form.reset();
  carregarTarefas();
});


async function excluirTarefa(id) {
  await fetch(`${API}/tarefas/${id}`, {
    method: "DELETE",
    headers: headers()
  });
  carregarTarefas();
}

async function concluirTarefa(id) {
  await fetch(`${API}/tarefas/${id}`, {
    method: "PUT",
    headers: headers()
  });
  carregarTarefas();
}

async function editarTarefa(id) {
  const novoTitulo = prompt("Novo título:");
  if (!novoTitulo) return;
  await fetch(`${API}/tarefas/${id}/editar`, {
    method: "PUT",
    headers: headers(),
    body: JSON.stringify({
      titulo: novoTitulo
    })
  });
  carregarTarefas();
}

(async () => {
  if (!token) {
    await fazerLogin();
  }
  await carregarTarefas();

})();