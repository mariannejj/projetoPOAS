from fastapi import APIRouter
from pydantic import BaseModel
from typing import Optional

router = APIRouter()
tarefas = []

class Tarefa(BaseModel):
    titulo: str
    materia: str
    prazo: str


class EditarTarefa(BaseModel):
    titulo: Optional[str] = None
    materia: Optional[str] = None
    prazo: Optional[str] = None

@router.post("/tarefas")
def criar_tarefa(tarefa: Tarefa):
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
def listar_tarefas():
    return tarefas

@router.put("/tarefas/{id}")
def concluir_tarefa(id: int):

    for tarefa in tarefas:

        if tarefa["id"] == id:
            tarefa["concluida"] = True
            return tarefa

    return {"erro": "não encontrada"}

@router.put("/tarefas/{id}/editar")
def editar_tarefa(id: int, dados: EditarTarefa):

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
def deletar_tarefa(id: int):

    for tarefa in tarefas:

        if tarefa["id"] == id:
            tarefas.remove(tarefa)
            return {"msg": "removida"}

    return {"erro": "não encontrada"}