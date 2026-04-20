from fastapi import FastAPI
from app.routes import tarefas

app = FastAPI()
app.include_router(tarefas.router)

@app.get("/")
def home():
    return {"mensagem": "API Estuda+ funcionando"}