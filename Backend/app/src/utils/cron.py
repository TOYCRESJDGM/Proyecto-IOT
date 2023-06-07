import requests
from src.adapters.mysql_adapter import background_task
from src.utils.settings import (
    AUTH_TOKEN,
    ACCOUNT_SID,
    URL_MESSAGES
    
)

class Cron:
   
    @staticmethod
    def send_alerts():
        id_sended = []
        results = background_task()
        
        for result in results:
            if result[0] not in id_sended:
                id_sended.append(result[0])
                Cron().send_notification(result[4], result[3], result[2], result[1], result[0])

        id_sended.clear()


    def send_notification(self, numero: str, name: str, date: str, node: str, id: str):
        token=AUTH_TOKEN
        account_sid=ACCOUNT_SID
        url_messages=URL_MESSAGES
        try:
            messages = 'Hola {}, queremos informarte que tenemos registrado un evento de posible caída en tu nodo {} (ID: {}) el {}. Esperamos que todo esté bien.'.format(name, node, id, date)
            url = url_messages + account_sid + '/messages'
            headers = {
                "Authorization": "Bearer {}".format(token),
                "Content-Type": "application/json"
            }
            data = {
                "messaging_product": "whatsapp",    
                "recipient_type": "individual",
                "to": numero,
                "type": "text",
                "text": {
                    "preview_url": False,
                    "body": messages
                }
            }

            response = requests.post(url, headers=headers, json=data)
            print('response : {} '.format(response.text))
                
            return {"message": "Notificación enviada exitosamente"}
        except Exception as e:
            return {"message": f"Error al enviar la notificación: {str(e)}"}


   

