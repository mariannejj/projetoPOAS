const URL_API = "http://127.0.0.1:8000";

export async function buscarTarefas() {
  const resposta = await fetch(`${URL_API}/tarefas`);

  if (!resposta.ok) {
    throw new Error("Não foi possível buscar as tarefas");
  }

  return resposta.json();
}

export async function criarTarefa(tarefa) {
  const resposta = await fetch(`${URL_API}/tarefas`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(tarefa),
  });

  if (!resposta.ok) {
    throw new Error("Não foi possível cadastrar a tarefa");
  }

  return resposta.json();
}

export async function editarTarefa(id, tarefa) {
  const resposta = await fetch(`${URL_API}/tarefas/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(tarefa),
  });

  if (!resposta.ok) {
    throw new Error("Não foi possível editar a tarefa");
  }

  return resposta.json();
}

export async function excluirTarefa(id) {
  const resposta = await fetch(`${URL_API}/tarefas/${id}`, {
    method: "DELETE",
  });

  if (!resposta.ok) {
    throw new Error("Não foi possível excluir a tarefa");
  }
}

export async function concluirTarefa(id, concluida) {
  const resposta = await fetch(`${URL_API}/tarefas/${id}/concluir`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      concluida: concluida,
    }),
  });

  if (!resposta.ok) {
    throw new Error("Não foi possível alterar o status da tarefa");
  }

  return resposta.json();
}