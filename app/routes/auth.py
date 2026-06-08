from fastapi import APIRouter
from pydantic import BaseModel
from jose import jwt

router = APIRouter()

SECRET_KEY = "estudamais"

usuarios = [
    {
        "usuario": "admin",
        "senha": "123"
    }
]
class Login(BaseModel):
    usuario: str
    senha: str

@router.post("/login")
def login(dados: Login):

    for usuario in usuarios:

        if (
            usuario["usuario"] == dados.usuario
            and usuario["senha"] == dados.senha
        ):

            token = jwt.encode(
                {"sub": dados.usuario},
                SECRET_KEY,
                algorithm="HS256"
            )

            return {"access_token": token}

    return {"erro": "credenciais inválidas"}