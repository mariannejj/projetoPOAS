"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mensagem, setMensagem] = useState("");

  async function entrar(evento) {
    evento.preventDefault();
    setMensagem("");

    try {
      const resposta = await fetch(
        "http://127.0.0.1:8000/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            senha,
          }),
        }
      );

      const dados = await resposta.json();

      if (!resposta.ok) {
        setMensagem(dados.detail || "Não foi possível entrar.");
        return;
      }

      localStorage.setItem("token", dados.access_token);
      localStorage.setItem("nome", dados.nome);

      router.push("/");
    } catch {
      setMensagem("Não foi possível conectar ao servidor.");
    }
  }

  return (
    <main className="pagina-login">
      <div className="caixa-login">
        <h1>Estuda+</h1>
        <h2>Entrar</h2>

        <form onSubmit={entrar}>
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

          <button type="submit">Entrar</button>
        </form>

        {mensagem && <p>{mensagem}</p>}

        <button
          type="button"
          onClick={() => router.push("/cadastro")}
        >
          Criar uma conta
        </button>
      </div>
    </main>
  );
}