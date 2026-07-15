"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Cadastro() {
  const router = useRouter();

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mensagem, setMensagem] = useState("");

  async function cadastrar(evento) {
    evento.preventDefault();
    setMensagem("");

    try {
      const resposta = await fetch(
        "http://127.0.0.1:8000/auth/cadastro",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nome,
            email,
            senha,
          }),
        }
      );

      const dados = await resposta.json();

      if (!resposta.ok) {
        setMensagem(dados.detail || "Não foi possível cadastrar.");
        return;
      }

      setMensagem("Cadastro realizado com sucesso.");

      setTimeout(() => {
        router.push("/login");
      }, 1000);
    } catch {
      setMensagem("Não foi possível conectar ao servidor.");
    }
  }

  return (
    <main className="pagina-login">
      <div className="caixa-login">
        <h1>Estuda+</h1>
        <h2>Criar conta</h2>

        <form onSubmit={cadastrar}>
          <input
            type="text"
            placeholder="Nome"
            value={nome}
            onChange={(evento) => setNome(evento.target.value)}
            required
          />

          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(evento) => setEmail(evento.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(evento) => setSenha(evento.target.value)}
            required
          />

          <button type="submit">Cadastrar</button>
        </form>

        {mensagem && <p>{mensagem}</p>}

        <button
          type="button"
          onClick={() => router.push("/login")}
        >
          Já tenho uma conta
        </button>
      </div>
    </main>
  );
}