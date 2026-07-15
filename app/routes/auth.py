from fastapi import APIRouter, HTTPException, status
from jose import jwt
from pydantic import BaseModel, EmailStr


router = APIRouter(
    prefix="/auth",
    tags=["Autenticação"]
)


SECRET_KEY = "estudamais"
ALGORITHM = "HS256"

usuarios = []


class UsuarioCadastro(BaseModel):
    nome: str
    email: EmailStr
    senha: str


class UsuarioLogin(BaseModel):
    email: EmailStr
    senha: str


@router.post(
    "/cadastro",
    status_code=status.HTTP_201_CREATED
)
def cadastrar_usuario(dados: UsuarioCadastro):
    for usuario_cadastrado in usuarios:
        if usuario_cadastrado["email"] == dados.email:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Este e-mail já está cadastrado"
            )

    novo_usuario = {
        "id": len(usuarios) + 1,
        "nome": dados.nome,
        "email": dados.email,
        "senha": dados.senha
    }

    usuarios.append(novo_usuario)

    return {
        "mensagem": "Usuário cadastrado com sucesso"
    }


@router.post("/login")
def login(dados: UsuarioLogin):
    for usuario_cadastrado in usuarios:
        email_correto = usuario_cadastrado["email"] == dados.email
        senha_correta = usuario_cadastrado["senha"] == dados.senha

        if email_correto and senha_correta:
            token = jwt.encode(
                {
                    "sub": dados.email,
                    "nome": usuario_cadastrado["nome"]
                },
                SECRET_KEY,
                algorithm=ALGORITHM
            )

            return {
                "access_token": token,
                "token_type": "bearer",
                "nome": usuario_cadastrado["nome"]
            }

    raise HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="E-mail ou senha inválidos"
    )