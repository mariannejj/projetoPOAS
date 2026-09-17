"use client";

import "./auth.css";
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
      // 1. FAZ O CADASTRO
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

      // Se o cadastro der erro
      if (!resposta.ok) {
        const erro = Array.isArray(dados.detail)
          ? dados.detail.map((item) => item.msg).join(", ")
          : dados.detail;

        setMensagem(erro || "Não foi possível cadastrar.");
        return;
      }

      // 2. FAZ LOGIN AUTOMATICAMENTE
      const respostaLogin = await fetch(
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

      const dadosLogin = await respostaLogin.json();

      // Se o login der erro
      if (!respostaLogin.ok) {
        setMensagem(
          "Cadastro realizado, mas não foi possível entrar automaticamente."
        );
        return;
      }

      // 3. SALVA O TOKEN
      localStorage.setItem(
        "token",
        dadosLogin.access_token
      );

      // 4. SALVA O NOME
      localStorage.setItem(
        "nome",
        dadosLogin.nome
      );

      setMensagem("Cadastro realizado com sucesso!");

      // 5. VAI PARA O DASHBOARD
      router.push("/dashboard");

    } catch {
      setMensagem(
        "Não foi possível conectar ao servidor."
      );
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
            onChange={(evento) =>
              setNome(evento.target.value)
            }
            required
          />

          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(evento) =>
              setEmail(evento.target.value)
            }
            required
          />

          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(evento) =>
              setSenha(evento.target.value)
            }
            required
          />

          <button type="submit">
            Cadastrar
          </button>
        </form>

        {mensagem && (
          <p>{mensagem}</p>
        )}

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