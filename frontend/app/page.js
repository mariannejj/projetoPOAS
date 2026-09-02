import "./inicial.css";


export default function Home() {
  return (
    <main className="home-page">
      <div className="home-container">

        <a href="/" className="logo">
          Estuda+
        </a>

        <section className="home-content">

          <p className="home-subtitle">
            ORGANIZAÇÃO DE ESTUDOS
          </p>

          <h1>
            Tenha mais controle
            <br />
            sobre suas atividades.
          </h1>

          <p className="home-description">
            Cadastre tarefas, acompanhe os prazos
            <br />
            e marque as atividades concluídas.
          </p>

          <div className="home-buttons">

            <a href="/cadastro" className="btn-register">
              Cadastrar
            </a>

            <a href="/login" className="btn-login">
              Fazer login
            </a>

          </div>

        </section>

      </div>
    </main>
  );
}
