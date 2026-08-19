from typing import List

from fastapi import APIRouter, HTTPException, status, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import Tarefa
from app.schemas import TarefaCriar, TarefaEditar, TarefaResposta


router = APIRouter(
    prefix="/tarefas",
    tags=["Tarefas"]
)


@router.post(
    "",
    response_model=TarefaResposta,
    status_code=status.HTTP_201_CREATED
)
def criar_tarefa(
    dados: TarefaCriar,
    db: Session = Depends(get_db)
):
    nova_tarefa = Tarefa(
        titulo=dados.titulo,
        materia=dados.materia,
        prazo=dados.prazo,
        concluida=False
    )

    db.add(nova_tarefa)
    db.commit()
    db.refresh(nova_tarefa)

    return nova_tarefa


@router.get(
    "",
    response_model=List[TarefaResposta]
)
def listar_tarefas(
    db: Session = Depends(get_db)
):
    return db.query(Tarefa).all()


@router.put(
    "/{id_tarefa}/concluir",
    response_model=TarefaResposta
)
def concluir_tarefa(
    id_tarefa: int,
    db: Session = Depends(get_db)
):
    tarefa = db.query(Tarefa).filter(
        Tarefa.id == id_tarefa
    ).first()

    if tarefa is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Tarefa não encontrada"
        )

    tarefa.concluida = not tarefa.concluida

    db.commit()
    db.refresh(tarefa)

    return tarefa


@router.put(
    "/{id_tarefa}",
    response_model=TarefaResposta
)
def editar_tarefa(
    id_tarefa: int,
    dados: TarefaEditar,
    db: Session = Depends(get_db)
):
    tarefa = db.query(Tarefa).filter(
        Tarefa.id == id_tarefa
    ).first()

    if tarefa is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Tarefa não encontrada"
        )

    dados_atualizados = dados.model_dump(
        exclude_unset=True
    )

    for campo, valor in dados_atualizados.items():
        setattr(tarefa, campo, valor)

    db.commit()
    db.refresh(tarefa)

    return tarefa


@router.delete(
    "/{id_tarefa}",
    status_code=status.HTTP_204_NO_CONTENT
)
def excluir_tarefa(
    id_tarefa: int,
    db: Session = Depends(get_db)
):
    tarefa = db.query(Tarefa).filter(
        Tarefa.id == id_tarefa
    ).first()

    if tarefa is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Tarefa não encontrada"
        )

    db.delete(tarefa)
    db.commit()

    return None