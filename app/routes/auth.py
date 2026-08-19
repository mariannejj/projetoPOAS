from fastapi import APIRouter, HTTPException, status, Depends
from sqlalchemy.orm import Session
from jose import jwt
from pydantic import BaseModel, EmailStr
import bcrypt

from app.database import get_db
from app.models import Usuario


router = APIRouter(
    prefix="/auth",
    tags=["Autenticação"]
)


SECRET_KEY = "estudamais"
ALGORITHM = "HS256"


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
def cadastrar_usuario(
    dados: UsuarioCadastro,
    db: Session = Depends(get_db)
):
    usuario_existente = db.query(Usuario).filter(
        Usuario.email == dados.email
    ).first()

    if usuario_existente:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Este e-mail já está cadastrado"
        )

    senha_hash = bcrypt.hashpw(
        dados.senha.encode("utf-8"),
        bcrypt.gensalt()
    ).decode("utf-8")

    novo_usuario = Usuario(
        nome=dados.nome,
        email=dados.email,
        senha=senha_hash
    )

    db.add(novo_usuario)
    db.commit()
    db.refresh(novo_usuario)

    return {
        "mensagem": "Usuário cadastrado com sucesso"
    }


@router.post("/login")
def login(
    dados: UsuarioLogin,
    db: Session = Depends(get_db)
):
    usuario_cadastrado = db.query(Usuario).filter(
        Usuario.email == dados.email
    ).first()

    if usuario_cadastrado is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="E-mail ou senha inválidos"
        )

    senha_correta = bcrypt.checkpw(
        dados.senha.encode("utf-8"),
        usuario_cadastrado.senha.encode("utf-8")
    )

    if not senha_correta:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="E-mail ou senha inválidos"
        )

    token = jwt.encode(
        {
            "sub": dados.email,
            "nome": usuario_cadastrado.nome
        },
        SECRET_KEY,
        algorithm=ALGORITHM
    )

    return {
        "access_token": token,
        "token_type": "bearer",
        "nome": usuario_cadastrado.nome
    }