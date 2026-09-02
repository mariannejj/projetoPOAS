"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Formulario from "../components/Formulario";
import ListaTarefas from "../components/ListaTarefas";

import {
  buscarTarefas,
  criarTarefa,
  editarTarefa,
  excluirTarefa,
  concluirTarefa,
} from "../services/api";

export default function Home() {
  const router = useRouter();
  const [nomeUsuario, setNomeUsuario] = useState("");

  const [titulo, setTitulo] = useState("");
  const [materia, setMateria] = useState("");
  const [prazo, setPrazo] = useState("");

  const [tarefas, setTarefas] = useState([]);

  const [idEdicao, setIdEdicao] = useState(null);

  const [filtroMateria, setFiltroMateria] = useState("");
  const [filtroStatus, setFiltroStatus] = useState("todas");

  const [mensagem, setMensagem] = useState("");
  const [erro, setErro] = useState("");

  async function listarTarefas() {
    try {
      const dados = await buscarTarefas();
      setTarefas(dados);
    } catch {
      setErro("Não foi possível carregar as tarefas.");
    }
  }

  function limparFormulario() {
    setTitulo("");
    setMateria("");
    setPrazo("");
    setIdEdicao(null);
  }

  async function salvarTarefa(evento) {
    evento.preventDefault();

    setMensagem("");
    setErro("");

    if (!titulo.trim() || !materia.trim() || !prazo) {
      setErro("Preencha todos os campos.");
      return;
    }

    const dadosTarefa = {
      titulo: titulo.trim(),
      materia: materia.trim(),
      prazo: prazo,
    };

    try {
      if (idEdicao !== null) {
        await editarTarefa(idEdicao, dadosTarefa);
        setMensagem("Tarefa editada com sucesso.");
      } else {
        await criarTarefa(dadosTarefa);
        setMensagem("Tarefa cadastrada com sucesso.");
      }

      limparFormulario();
      listarTarefas();
    } catch {
      setErro("Não foi possível salvar a tarefa.");
    }
  }

  function iniciarEdicao(tarefa) {
    setTitulo(tarefa.titulo);
    setMateria(tarefa.materia);
    setPrazo(tarefa.prazo);
    setIdEdicao(tarefa.id);

    setMensagem("");
    setErro("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  function cancelarEdicao() {
    limparFormulario();
    setMensagem("");
    setErro("");
  }

  async function removerTarefa(id) {
    const confirmou = window.confirm(
      "Tem certeza que deseja excluir esta tarefa?"
    );

    if (!confirmou) {
      return;
    }

    try {
      await excluirTarefa(id);
      setMensagem("Tarefa excluída com sucesso.");
      setErro("");

      if (idEdicao === id) {
        limparFormulario();
      }

      listarTarefas();
    } catch {
      setErro("Não foi possível excluir a tarefa.");
    }
  }

  async function marcarComoConcluida(id, concluidaAtual) {
    try {
      await concluirTarefa(id, !concluidaAtual);

      setMensagem(
        concluidaAtual
          ? "Tarefa marcada como pendente."
          : "Tarefa marcada como concluída."
      );

      setErro("");
      listarTarefas();
    } catch {
      setErro("Não foi possível alterar o status da tarefa.");
    }
  }

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
      return;
    }

    const nome = localStorage.getItem("nome");

    if (nome) {
      setNomeUsuario(nome);
    }

    listarTarefas();
  }, [router]);

  const materias = [
    ...new Set(tarefas.map((tarefa) => tarefa.materia)),
  ].sort();

  const tarefasFiltradas = tarefas.filter((tarefa) => {
    const correspondeMateria =
      filtroMateria === "" || tarefa.materia === filtroMateria;

    const correspondeStatus =
      filtroStatus === "todas" ||
      (filtroStatus === "pendentes" && !tarefa.concluida) ||
      (filtroStatus === "concluidas" && tarefa.concluida);

    return correspondeMateria && correspondeStatus;
  });
  
  function sair() {
    localStorage.removeItem("token");
    localStorage.removeItem("nome");

    router.push("/login");
  }
  return (
    <main className="pagina">
      <header className="cabecalho">
        <div>
          <h1>Estuda+</h1>
          <p>Organize suas tarefas escolares</p>
        </div>

        <div className="usuario-logado">
          <span>Olá, {nomeUsuario}</span>

          <button type="button" onClick={sair}>
            Sair
          </button>
        </div>
      </header>

      <section className="apresentacao">
        <span className="etiqueta">Organização de estudos</span>

        <h2>Tenha mais controle sobre suas atividades.</h2>

        <p>
          Cadastre tarefas, acompanhe os prazos e marque as atividades
          concluídas.
        </p>
      </section>

      {mensagem && (
        <p className="mensagem-sucesso">
          {mensagem}
        </p>
      )}

      {erro && (
        <p className="mensagem-erro">
          {erro}
        </p>
      )}

      <section className="conteudo">
        <Formulario
          titulo={titulo}
          setTitulo={setTitulo}
          materia={materia}
          setMateria={setMateria}
          prazo={prazo}
          setPrazo={setPrazo}
          salvarTarefa={salvarTarefa}
          editando={idEdicao !== null}
          cancelarEdicao={cancelarEdicao}
        />

        <ListaTarefas
          tarefas={tarefasFiltradas}
          totalTarefas={tarefas.length}
          materias={materias}
          filtroMateria={filtroMateria}
          setFiltroMateria={setFiltroMateria}
          filtroStatus={filtroStatus}
          setFiltroStatus={setFiltroStatus}
          iniciarEdicao={iniciarEdicao}
          removerTarefa={removerTarefa}
          marcarComoConcluida={marcarComoConcluida}
        />
      </section>
    </main>
  );
}