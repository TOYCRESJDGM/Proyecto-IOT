from src.adapters.mysql_adapter import create_db
from apscheduler.schedulers.background import BackgroundScheduler
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from src.routes import user, node, data
from src.utils.cron import Cron
import uvicorn
from src.utils.settings import (
    APP_PORT
)

app = FastAPI()

@app.get("/")
def home():
    return {"message": "Hello World from docker"}


# add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
    allow_credentials=True,
)


# @app.on_event("shutdown")
# def shutdown_event():
#     """
#     Drop the database
#     :return:
#     """
#     drop_db()


@app.on_event("startup")
def startup_event():
    """
    Create the database
    :return:
    """
    create_db()


app.include_router(
    user.router,
    prefix="/user",
    tags=["users"],
    responses={404: {"description": "Not found"}},
)

app.include_router(
    node.router,
    prefix="/node",
    tags=["node"],
    responses={404: {"description": "Not found"}},
)

app.include_router(
    data.router,
    prefix="/data",
    tags=["data"],
    responses={404: {"description": "Not found"}},
)

scheduler = BackgroundScheduler()
# Agregar la tarea repetitiva al Scheduler
scheduler.add_job(Cron.send_alerts, 'interval', minutes=1)  # Ejecutar cada minuto
# Iniciar el Scheduler en segundo plano
scheduler.start()
# Mantener el programa en ejecución

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=5000)

