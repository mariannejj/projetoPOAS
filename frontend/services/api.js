const URL_API = "http://127.0.0.1:8000";

function obterToken() {
  if (typeof window === "undefined") {
    return null;
  }

  return localStorage.getItem("token");
}

function obterCabecalhos(json = false) {
  const token = obterToken();

  return {
    ...(json ? { "Content-Type": "application/json" } : {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

export async function buscarTarefas() {
  const resposta = await fetch(`${URL_API}/tarefas`, {
    headers: obterCabecalhos(),
  });

  if (!resposta.ok) {
    throw new Error("Não foi possível buscar as tarefas");
  }

  return resposta.json();
}

export async function criarTarefa(tarefa) {
  const resposta = await fetch(`${URL_API}/tarefas`, {
    method: "POST",
    headers: obterCabecalhos(true),
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
    headers: obterCabecalhos(true),
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
    headers: obterCabecalhos(),
  });

  if (!resposta.ok) {
    throw new Error("Não foi possível excluir a tarefa");
  }
}

export async function concluirTarefa(id, concluida) {
  const resposta = await fetch(`${URL_API}/tarefas/${id}/concluir`, {
    method: "PUT",
    headers: obterCabecalhos(true),
    body: JSON.stringify({
      concluida: concluida,
    }),
  });

  if (!resposta.ok) {
    throw new Error("Não foi possível alterar o status da tarefa");
  }

  return resposta.json();
}
