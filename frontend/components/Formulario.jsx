export default function Formulario({
  titulo,
  setTitulo,
  materia,
  setMateria,
  prazo,
  setPrazo,
  salvarTarefa,
  editando,
  cancelarEdicao,
}) {
  return (
    <div className="cartao">
      <h3>{editando ? "Editar tarefa" : "Cadastrar tarefa"}</h3>

      <form onSubmit={salvarTarefa}>
        <div className="campo">
          <label htmlFor="titulo">Título</label>

          <input
            id="titulo"
            type="text"
            placeholder="Digite o título da tarefa"
            value={titulo}
            onChange={(evento) => setTitulo(evento.target.value)}
            required
          />
        </div>

        <div className="campo">
          <label htmlFor="materia">Matéria</label>

          <input
            id="materia"
            type="text"
            placeholder="Digite a matéria"
            value={materia}
            onChange={(evento) => setMateria(evento.target.value)}
            required
          />
        </div>

        <div className="campo">
          <label htmlFor="prazo">Prazo</label>

          <input
            id="prazo"
            type="date"
            value={prazo}
            onChange={(evento) => setPrazo(evento.target.value)}
            required
          />
        </div>

        <button type="submit">
          {editando ? "Salvar alterações" : "Cadastrar"}
        </button>

        {editando && (
          <button
            type="button"
            className="botao-cancelar"
            onClick={cancelarEdicao}
          >
            Cancelar
          </button>
        )}
      </form>
    </div>
  );
}