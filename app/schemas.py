from datetime import date
from pydantic import BaseModel

class TarefaCreate(BaseModel):
    titulo: str
    materia: str
    prazo: date