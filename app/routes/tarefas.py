from datetime import date
from fastapi import APIRouter, Header
from pydantic import BaseModel
from typing import Optional
from jose import jwt

SECRET_KEY = "estudamais"
router = APIRouter()
tarefas = []

def verificar_token(token: str):
    try:
        token = token.replace("Bearer ", "")
        jwt.decode(
            token,
            SECRET_KEY,
            algorithms=["HS256"]
        )
        return True
    except:
        return False


class Tarefa(BaseModel):
    titulo: str
    materia: str
    prazo: str


class EditarTarefa(BaseModel):
    titulo: Optional[str] = None
    materia: Optional[str] = None
    prazo: Optional[date] = None


@router.post("/tarefas")
def criar_tarefa(
    tarefa: Tarefa,
    authorization: str = Header(None)
):

    if not verificar_token(authorization):
        return {"erro": "acesso negado"}

    nova_tarefa = {
        "id": len(tarefas) + 1,
        "titulo": tarefa.titulo,
        "materia": tarefa.materia,
        "prazo": tarefa.prazo,
        "concluida": False
    }

    tarefas.append(nova_tarefa)

    return nova_tarefa


@router.get("/tarefas")
def listar_tarefas(
    authorization: str = Header()
):

    if not verificar_token(authorization):
        return {"erro": "acesso negado"}

    return tarefas


@router.put("/tarefas/{id}")
def concluir_tarefa(
    id: int,
    authorization: str = Header()
):

    if not verificar_token(authorization):
        return {"erro": "acesso negado"}

    for tarefa in tarefas:

        if tarefa["id"] == id:
            tarefa["concluida"] = True
            return tarefa

    return {"erro": "não encontrada"}


@router.put("/tarefas/{id}/editar")
def editar_tarefa(
    id: int,
    dados: EditarTarefa,
    authorization: str = Header()
):

    if not verificar_token(authorization):
        return {"erro": "acesso negado"}

    for tarefa in tarefas:

        if tarefa["id"] == id:

            if dados.titulo is not None:
                tarefa["titulo"] = dados.titulo

            if dados.materia is not None:
                tarefa["materia"] = dados.materia

            if dados.prazo is not None:
                tarefa["prazo"] = dados.prazo

            return tarefa

    return {"erro": "não encontrada"}


@router.delete("/tarefas/{id}")
def deletar_tarefa(
    id: int,
    authorization: str = Header()
):

    if not verificar_token(authorization):
        return {"erro": "acesso negado"}

    for tarefa in tarefas:

        if tarefa["id"] == id:
            tarefas.remove(tarefa)
            return {"msg": "removida"}

    return {"erro": "não encontrada"}