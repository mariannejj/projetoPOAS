from datetime import date
from typing import Optional

from pydantic import BaseModel, ConfigDict

class TarefaCriar(BaseModel):
    titulo: str
    materia: str
    prazo: date

class TarefaEditar(BaseModel):
    titulo: Optional[str] = None
    materia: Optional[str] = None
    prazo: Optional[date] = None

class TarefaResposta(BaseModel):
    id: int
    titulo: str
    materia: str
    prazo: date
    concluida: bool
    model_config = ConfigDict(from_attributes=True)