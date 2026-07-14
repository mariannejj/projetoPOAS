import Tarefa from "./Tarefa";

export default function ListaTarefas({
  tarefas,
  totalTarefas,
  materias,
  filtroMateria,
  setFiltroMateria,
  filtroStatus,
  setFiltroStatus,
  iniciarEdicao,
  removerTarefa,
  marcarComoConcluida,
}) {
  return (
    <div className="cartao">
      <div className="titulo-lista">
        <h3>Tarefas</h3>
        <span>{totalTarefas} tarefas</span>
      </div>

      <div className="campo">
        <label htmlFor="filtroMateria">Filtrar por matéria</label>

        <select
          id="filtroMateria"
          value={filtroMateria}
          onChange={(evento) => setFiltroMateria(evento.target.value)}
        >
          <option value="">Todas as matérias</option>

          {materias.map((materia) => (
            <option key={materia} value={materia}>
              {materia}
            </option>
          ))}
        </select>
      </div>

      <div className="campo">
        <label htmlFor="filtroStatus">Filtrar por status</label>

        <select
          id="filtroStatus"
          value={filtroStatus}
          onChange={(evento) => setFiltroStatus(evento.target.value)}
        >
          <option value="todas">Todas</option>
          <option value="pendentes">Pendentes</option>
          <option value="concluidas">Concluídas</option>
        </select>
      </div>

      <div className="lista">
        {tarefas.length === 0 ? (
          <p>Nenhuma tarefa encontrada.</p>
        ) : (
          tarefas.map((tarefa) => (
            <Tarefa
              key={tarefa.id}
              tarefa={tarefa}
              iniciarEdicao={iniciarEdicao}
              removerTarefa={removerTarefa}
              marcarComoConcluida={marcarComoConcluida}
            />
          ))
        )}
      </div>
    </div>
  );
}