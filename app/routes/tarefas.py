from typing import List
from fastapi import APIRouter, HTTPException, status
from app.database import tarefas
from app.schemas import TarefaCriar, TarefaEditar, TarefaResposta


router = APIRouter(
    prefix="/tarefas",
    tags=["Tarefas"]
)

def buscar_tarefa(id_tarefa: int):
    for tarefa in tarefas:
        if tarefa["id"] == id_tarefa:
            return tarefa

    return None

def gerar_novo_id():
    if not tarefas:
        return 1

    return max(tarefa["id"] for tarefa in tarefas) + 1

@router.post(
    "",
    response_model=TarefaResposta,
    status_code=status.HTTP_201_CREATED
)
def criar_tarefa(dados: TarefaCriar):
    nova_tarefa = {
        "id": gerar_novo_id(),
        "titulo": dados.titulo,
        "materia": dados.materia,
        "prazo": dados.prazo,
        "concluida": False
    }

    tarefas.append(nova_tarefa)

    return nova_tarefa

@router.get(
    "",
    response_model=List[TarefaResposta]
)
def listar_tarefas():
    return tarefas

@router.put(
    "/{id_tarefa}/concluir",
    response_model=TarefaResposta
)
def concluir_tarefa(id_tarefa: int):
    tarefa = buscar_tarefa(id_tarefa)

    if tarefa is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Tarefa não encontrada"
        )

    tarefa["concluida"] = not tarefa["concluida"]

    return tarefa

@router.put(
    "/{id_tarefa}",
    response_model=TarefaResposta
)
def editar_tarefa(id_tarefa: int, dados: TarefaEditar):
    tarefa = buscar_tarefa(id_tarefa)

    if tarefa is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Tarefa não encontrada"
        )

    dados_atualizados = dados.model_dump(exclude_unset=True)

    for campo, valor in dados_atualizados.items():
        tarefa[campo] = valor

    return tarefa

@router.delete(
    "/{id_tarefa}",
    status_code=status.HTTP_204_NO_CONTENT
    )
def excluir_tarefa(id_tarefa: int):
    tarefa = buscar_tarefa(id_tarefa)

    if tarefa is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Tarefa não encontrada"
        )
    tarefas.remove(tarefa)
    return None