from flask import Flask, jsonify, request
from flask_cors import CORS
import requests
import json
import paho.mqtt.client as mqtt
from datetime import datetime
import threading
import time

# --- CONFIGURAÇÕES ---
FIREBASE_URL = "https://testehortafinal-default-rtdb.firebaseio.com"
FIREBASE_SECRET = "oXJ67LMLeJFheeBzvlgH0GaCoiKGvCSMT7q3a8ej"  

MQTT_BROKER = "5d2386885b58464880cb25cbb9cfc3db.s1.eu.hivemq.cloud"
MQTT_PORT = 8883
MQTT_USERNAME = "hivemq.webclient.1761588864998"
MQTT_PASSWORD = "uL#10v4N*8b,x!PWnhIA"
MQTT_TOPIC_COMANDO = "panc/mcc/comando"

# --- FLASK ---
app = Flask(__name__)
CORS(app)  # permite chamadas do Next.js sem erro de CORS

# --- MQTT ---
mqtt_client = mqtt.Client(mqtt.CallbackAPIVersion.VERSION2)
mqtt_client.username_pw_set(MQTT_USERNAME, MQTT_PASSWORD)
mqtt_client.tls_set()
mqtt_client.connect(MQTT_BROKER, MQTT_PORT, 60)
mqtt_client.loop_start()

# --- FUNÇÕES FIREBASE ---
def ler_dados_dht11():
    url = f"{FIREBASE_URL}/sensores/dht11.json?auth={FIREBASE_SECRET}"
    try:
        response = requests.get(url)
        dados = response.json()
        if not dados:
            return None
        ultima = list(dados.values())[-1]
        return ultima
    except Exception as e:
        print("Erro ao ler DHT11:", e)
        return None

def ler_dados_umidade_solo():
    url = f"{FIREBASE_URL}/sensores/umidade_solo.json?auth={FIREBASE_SECRET}"
    try:
        response = requests.get(url)
        dados = response.json()
        if not dados:
            return None
        ultima = list(dados.values())[-1]
        return ultima
    except Exception as e:
        print("Erro ao ler solo:", e)
        return None

def publicar_comando_bomba(valor):
    if valor not in ["L", "D"]:
        return {"erro": "Comando inválido"}
    try:
        mqtt_client.publish(MQTT_TOPIC_COMANDO, valor)
        print(f"Comando publicado no MQTT: {valor}")
        return {"status": "comando enviado", "valor": valor}
    except Exception as e:
        print("Erro ao publicar no MQTT:", e)
        return {"erro": str(e)}
        
def escutar_comando_console():
    while True:
        comando = input("\nDigite 'L' para ligar ou 'D' para desligar a bomba: ").strip().upper()
        if comando in ["L", "D"]:
            publicar_comando_bomba(comando)
        else:
            print("Comando inválido. Use apenas 'L' ou 'D'.")


# --- ROTAS FLASK ---
@app.route("/sensor/dht11", methods=["GET"])
def rota_dht11():
    dados = ler_dados_dht11()
    if dados:
        return jsonify(dados)
    return jsonify({"erro": "Sem dados"}), 404

@app.route("/sensor/solo", methods=["GET"])
def rota_solo():
    dados = ler_dados_umidade_solo()
    if dados:
        return jsonify(dados)
    return jsonify({"erro": "Sem dados"}), 404

@app.route("/comando/bomba", methods=["POST"])
def rota_comando_bomba():
    body = request.get_json()
    valor = body.get("ligar")
    resultado = publicar_comando_bomba(valor)
    return jsonify(resultado)

# --- LOOP DE LEITURA A CADA 1 MINUTO ---
def loop_leitura_periodica():
    while True:
        print("\nLeitura periódica a cada 1 minuto:")
        
        dht11 = ler_dados_dht11()
        solo = ler_dados_umidade_solo()

        if dht11:
            print("DHT11:")
            print(f"  Temperatura: {dht11.get('temperatura')}°C")
            print(f"  Umidade: {dht11.get('umidade')}%")
            print(f"  Timestamp: {dht11.get('timestamp')}")
        else:
            print("Nenhum dado DHT11 encontrado.")

        if solo:
            print("Solo:")
            print(f"  Umidade: {solo.get('umidade')}%")
            print(f"  Timestamp: {solo.get('timestamp')}")
        else:
            print("Nenhum dado de solo encontrado.")

        time.sleep(10)

# --- EXECUÇÃO ---
if __name__ == "__main__":
    print("Backend iniciado com leitura periódica a cada 1 minuto")
    threading.Thread(target=loop_leitura_periodica, daemon=True).start()
    threading.Thread(target=escutar_comando_console, daemon=True).start()
    app.run(debug=True, port=5000)
