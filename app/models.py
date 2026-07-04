from datetime import date
from pydantic import BaseModel

class Tarefa(BaseModel):
    id: int
    titulo: str
    materia: str
    prazo: date
    concluida: bool = False