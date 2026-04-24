from fastapi import APIRouter

router = APIRouter()
tarefas = []

@router.post("/tarefas")
def criar_tarefa(titulo: str, materia: str, prazo: str):
    tarefa = {
        "id": len(tarefas) + 1,
        "titulo": titulo,
        "materia": materia,
        "prazo": prazo,
        "concluida": False
    }
    tarefas.append(tarefa)
    return tarefa

@router.get("/tarefas")
def listar_tarefas():
    return tarefas

@router.put("/tarefas/{id}")
def concluir_tarefa(id: int):
    for tarefa in tarefas:
        if tarefa["id"] == id:
            tarefa["concluida"] = True
            return tarefa
    return {"erro": "n encontrada"}

@router.put("/tarefas/{id}/editar")
def editar_tarefa(id: int, titulo: str = None, materia: str = None, prazo: str = None):
    for tarefa in tarefas:
        if tarefa["id"] == id:
            if titulo is not None:
                tarefa["titulo"] = titulo
            if materia is not None:
                tarefa["materia"] = materia
            if prazo is not None:
                tarefa["prazo"] = prazo
            return tarefa
    return {"erro": "n encontrada"}

@router.delete("/tarefas/{id}")
def deletar_tarefa(id: int):
    for tarefa in tarefas:
        if tarefa["id"] == id:
            tarefas.remove(tarefa)
            return {"msg": "removida"}
    return {"erro": "n encontrada"}
