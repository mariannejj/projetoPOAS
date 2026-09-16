import {
  buscarTarefas,
  criarTarefa,
  editarTarefa,
  excluirTarefa,
  concluirTarefa,
} from "./repositories/tarefasRepository";

export async function listarTarefas() {
  return buscarTarefas();
}

export async function cadastrarTarefa(tarefa) {
  return criarTarefa(tarefa);
}

export async function atualizarTarefa(id, tarefa) {
  return editarTarefa(id, tarefa);
}

export async function removerTarefa(id) {
  return excluirTarefa(id);
}

export async function alterarStatusTarefa(id, concluida) {
  return concluirTarefa(id, concluida);
}