from pydantic import BaseModel

class Tarefa(BaseModel):
    id: int
    titulo: str
    materia: str
    prazo: str
    concluida: bool = False