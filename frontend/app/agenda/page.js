"use client";

import { useEffect, useState } from "react";
import styles from "./agenda.module.css";

export default function Agenda() {
  const [atividades, setAtividades] = useState([]);

  const [titulo, setTitulo] = useState("");
  const [materia, setMateria] = useState("");
  const [prazo, setPrazo] = useState("");
  const [status, setStatus] = useState("Pendente");

  useEffect(() => {
    const atividadesSalvas = localStorage.getItem("estudaAgenda");

    if (atividadesSalvas) {
      setAtividades(JSON.parse(atividadesSalvas));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("estudaAgenda", JSON.stringify(atividades));
  }, [atividades]);

  function adicionarAtividade(evento) {
    evento.preventDefault();

    if (!titulo || !materia || !prazo) {
      return;
    }

    const novaAtividade = {
      id: Date.now(),
      titulo,
      materia,
      prazo,
      status,
    };

    setAtividades((listaAtual) => [...listaAtual, novaAtividade]);

    setTitulo("");
    setMateria("");
    setPrazo("");
    setStatus("Pendente");
  }

  function excluirAtividade(id) {
    const novaLista = atividades.filter(
      (atividade) => atividade.id !== id
    );

    setAtividades(novaLista);
  }

  function alterarStatus(id, novoStatus) {
    setAtividades((listaAtual) =>
      listaAtual.map((atividade) =>
        atividade.id === id
          ? { ...atividade, status: novoStatus }
          : atividade
      )
    );
  }

  function formatarData(data) {
    if (!data) {
      return "";
    }

    const partes = data.split("-");

    return `${partes[2]}/${partes[1]}/${partes[0]}`;
  }

  function obterTextoData(data) {
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);

    const dataAtividade = new Date(`${data}T00:00:00`);
    dataAtividade.setHours(0, 0, 0, 0);

    const diferenca =
      (dataAtividade - hoje) / (1000 * 60 * 60 * 24);

    if (diferenca === 0) {
      return `Hoje - ${formatarData(data)}`;
    }

    if (diferenca === 1) {
      return `Amanhã - ${formatarData(data)}`;
    }

    return formatarData(data);
  }

  function obterStatus(atividade) {
    if (atividade.status === "Concluída") {
      return "Concluída";
    }

    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);

    const dataAtividade = new Date(`${atividade.prazo}T00:00:00`);
    dataAtividade.setHours(0, 0, 0, 0);

    if (dataAtividade < hoje) {
      return "Atrasada";
    }

    return atividade.status;
  }

  function classeStatus(statusAtividade) {
    if (statusAtividade === "Concluída") {
      return styles.concluida;
    }

    if (statusAtividade === "Em andamento") {
      return styles.andamento;
    }

    if (statusAtividade === "Atrasada") {
      return styles.atrasada;
    }

    return styles.pendente;
  }

  return (
    <main className={styles.pagina}>
      <aside className={styles.sidebar}>
        <div className={styles.logo}>Estuda+</div>

        <nav className={styles.menu}>
          <a href="/" className={styles.itemMenu}>
            <span>⌂</span>
            Dashboard
          </a>

          <a
            href="/agenda"
            className={`${styles.itemMenu} ${styles.itemAtivo}`}
          >
            <span>▣</span>
            Agenda
          </a>

          <a href="/" className={styles.itemMenu}>
            <span>↪</span>
            Sair
          </a>
        </nav>
      </aside>

      <section className={styles.conteudo}>
        <header className={styles.cabecalho}>
         
          <div className={styles.usuario}>
            <span>Olá, Marianne</span>

            <a href="/" className={styles.botaoSair}>
               &nbsp; Sair
            </a>
          </div>
        </header>

        <div className={styles.areaAgenda}>
          <div className={styles.tituloPagina}>
            <div>
              <h2>Agenda</h2>
              <p>Próximas atividades</p>
            </div>
          </div>

          <div className={styles.layout}>
            {/* FORMULÁRIO */}
            <div className={styles.cardFormulario}>
              <h3>Adicionar atividade</h3>

              <form onSubmit={adicionarAtividade}>
                <div className={styles.campo}>
                  <label htmlFor="titulo">
                    Atividade
                  </label>

                  <input
                    id="titulo"
                    type="text"
                    placeholder="Ex.: Trabalho de Matemática"
                    value={titulo}
                    onChange={(evento) =>
                      setTitulo(evento.target.value)
                    }
                    required
                  />
                </div>

                <div className={styles.campo}>
                  <label htmlFor="materia">
                    Matéria
                  </label>

                  <input
                    id="materia"
                    type="text"
                    placeholder="Ex.: Matemática"
                    value={materia}
                    onChange={(evento) =>
                      setMateria(evento.target.value)
                    }
                    required
                  />
                </div>

                <div className={styles.campo}>
                  <label htmlFor="prazo">
                    Prazo
                  </label>

                  <input
                    id="prazo"
                    type="date"
                    value={prazo}
                    onChange={(evento) =>
                      setPrazo(evento.target.value)
                    }
                    required
                  />
                </div>

                <div className={styles.campo}>
                  <label htmlFor="status">
                    Status
                  </label>

                  <select
                    id="status"
                    value={status}
                    onChange={(evento) =>
                      setStatus(evento.target.value)
                    }
                  >
                    <option value="Pendente">
                      Pendente
                    </option>

                    <option value="Em andamento">
                      Em andamento
                    </option>

                    <option value="Concluída">
                      Concluída
                    </option>
                  </select>
                </div>

                <button
                  type="submit"
                  className={styles.botaoAdicionar}
                >
                  + Adicionar atividade
                </button>
              </form>
            </div>

            {/* AGENDA */}
            <div className={styles.areaLista}>
              {atividades.length === 0 ? (
                <div className={styles.semAtividades}>
                  <h3>Nenhuma atividade cadastrada</h3>

                  <p>
                    Adicione sua primeira atividade usando o
                    formulário ao lado.
                  </p>
                </div>
              ) : (
                <div className={styles.lista}>
                  {atividades.map((atividade) => {
                    const statusAtual =
                      obterStatus(atividade);

                    return (
                      <div
                        key={atividade.id}
                        className={`${styles.atividade} ${
                          classeStatus(statusAtual)
                        }`}
                      >
                        <div className={styles.informacoes}>
                          <div className={styles.data}>
                            {obterTextoData(atividade.prazo)}
                          </div>

                          <h3>{atividade.titulo}</h3>

                          <p>
                            Matéria: {atividade.materia}
                          </p>

                          <p>
                            Prazo:{" "}
                            {formatarData(atividade.prazo)}
                          </p>
                        </div>

                        <div className={styles.acoes}>
                          <select
                            value={statusAtual}
                            onChange={(evento) =>
                              alterarStatus(
                                atividade.id,
                                evento.target.value
                              )
                            }
                          >
                            <option value="Pendente">
                              Pendente
                            </option>

                            <option value="Em andamento">
                              Em andamento
                            </option>

                            <option value="Concluída">
                              Concluída
                            </option>
                          </select>

                          <button
                            type="button"
                            onClick={() =>
                              excluirAtividade(atividade.id)
                            }
                            className={styles.botaoExcluir}
                          >
                            Excluir
                          </button>
                        </div>

                        <div className={styles.status}>
                          <span
                            className={styles.ponto}
                          ></span>

                          {statusAtual}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          <div className={styles.legenda}>
            <div>
              <span
                className={`${styles.ponto} ${styles.pontoVerde}`}
              ></span>
              Concluída
            </div>

            <div>
              <span
                className={`${styles.ponto} ${styles.pontoAmarelo}`}
              ></span>
              Pendente
            </div>

            <div>
              <span
                className={`${styles.ponto} ${styles.pontoAzul}`}
              ></span>
              Em andamento
            </div>

            <div>
              <span
                className={`${styles.ponto} ${styles.pontoVermelho}`}
              ></span>
              Atrasada
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}