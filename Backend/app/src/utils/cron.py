from apscheduler.schedulers.background import BackgroundScheduler
def f():
    print("Cada dos segundos send alert whatsapp.")
scheduler = BackgroundScheduler(f)
scheduler.add(2, 0, f)  # Agregar una tarea.
while True:
    scheduler.run()

