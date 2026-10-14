
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import jwt, JWTError
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import Usuario

SECRET_KEY = "estudamais"
ALGORITHM = "HS256"

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")


def get_usuario_logado(
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_db)
):
    erro = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Faça login novamente para continuar",
        headers={"WWW-Authenticate": "Bearer"}
    )

    try:
        dados = jwt.decode(
            token,
            SECRET_KEY,
            algorithms=[ALGORITHM]
        )

        email = dados.get("sub")

        if email is None:
            raise erro

    except JWTError:
        raise erro

    usuario = db.query(Usuario).filter(
        Usuario.email == email
    ).first()

    if usuario is None:
        raise erro

    return usuario
