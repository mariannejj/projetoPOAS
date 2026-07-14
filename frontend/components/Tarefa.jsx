export default function Tarefa({
  tarefa,
  removerTarefa,
  iniciarEdicao,
  marcarComoConcluida,
}) {
  return (
    <article className={tarefa.concluida ? "tarefa concluida" : "tarefa"}>
      <input
        type="checkbox"
        checked={tarefa.concluida}
        onChange={() => marcarComoConcluida(tarefa.id, tarefa.concluida)
}      />

      <div>
        <h4>{tarefa.titulo}</h4>
        <p>{tarefa.materia}</p>
        <small>Prazo: {tarefa.prazo}</small>
      </div>

      <div className="acoes">
        <button
          type="button"
          onClick={() => iniciarEdicao(tarefa)}
        >
          Editar
        </button>

        <button
          type="button"
          onClick={() => removerTarefa(tarefa.id)}
        >
          Excluir
        </button>
      </div>
    </article>
  );
}