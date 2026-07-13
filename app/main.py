from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import auth, tarefas

app = FastAPI(
    title="Estuda+ API",
    description="API para gerenciamento de tarefas escolares",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(tarefas.router)
app.include_router(auth.router)


@app.get("/", tags=["Início"])
def home():
    return {
        "mensagem": "API Estuda+ funcionando"
    }