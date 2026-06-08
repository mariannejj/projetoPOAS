from fastapi import FastAPI
from pydantic import BaseModel
from app.routes import tarefas, auth

app = FastAPI()
app.include_router(tarefas.router)
app.include_router(auth.router)

@app.get("/")
def home():
    return {"mensagem": "API Estuda+ funcionando"}