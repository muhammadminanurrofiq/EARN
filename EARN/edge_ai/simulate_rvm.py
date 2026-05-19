import paho.mqtt.client as mqtt
import json
import time
import random

# Configuration
MQTT_BROKER = "localhost"
MQTT_PORT = 1883
TOPIC_TEMPLATE = "earn/rvm/{id_mesin}/transaction"

# Mock Data
MESIN_ID = "M001"
USERS = ["USR-001"] # Budi Santoso (already seeded in backend)

def on_connect(client, userdata, flags, rc):
    if rc == 0:
        print("[CONNECTED] Successful connection to MQTT broker.")
    else:
        print(f"[ERROR] Connection failed with code {rc}")

def simulate():
    # Initialize Paho MQTT Client (v1 callback API version fallback compatible with modern systems)
    client = mqtt.Client(callback_api_version=mqtt.CallbackAPIVersion.VERSION1)
    client.on_connect = on_connect
    
    print(f"Connecting to MQTT Broker at {MQTT_BROKER}:{MQTT_PORT}...")
    try:
        client.connect(MQTT_BROKER, MQTT_PORT, 60)
    except Exception as e:
        print(f"[FATAL] Could not connect to MQTT Broker: {e}")
        print("Make sure Eclipse Mosquitto is running in Docker/WSL!")
        return

    # Start loop in background
    client.loop_start()
    
    print("\n--- Project EARN - Edge AI RVM Simulator Started ---")
    print("Simulating bottle insertions... (Press Ctrl+C to exit)\n")
    
    try:
        while True:
            # Sleep for random duration between 6 to 12 seconds
            sleep_time = random.randint(6, 12)
            time.sleep(sleep_time)
            
            # Simulate Edge AI Object Detection
            classes = ["Plastic PET Bottle", "Aluminum Can", "Glass Bottle"]
            detected_class = random.choices(classes, weights=[0.7, 0.2, 0.1])[0]
            jumlah_botol = random.randint(1, 3)
            poin_per_botol = 10 if detected_class == "Plastic PET Bottle" else (15 if detected_class == "Aluminum Can" else 5)
            poin = jumlah_botol * poin_per_botol
            
            print(f"[EDGE AI] Detected: {detected_class} x {jumlah_botol}")
            print(f"[ACTUATOR] Sorting item, opening RVM slot...")
            time.sleep(1.5)
            
            # Form transaction payload
            payload = {
                "id_mesin": MESIN_ID,
                "id_user": random.choice(USERS),
                "jumlah_botol": jumlah_botol,
                "poin": poin
            }
            
            topic = TOPIC_TEMPLATE.format(id_mesin=MESIN_ID)
            
            print(f"[MQTT] Publishing transaction to topic '{topic}':")
            print(f"       {json.dumps(payload)}")
            
            client.publish(topic, json.stringify(payload) if hasattr(json, "stringify") else json.dumps(payload))
            print("[SUCCESS] Transaction sent successfully.\n")
            
    except KeyboardInterrupt:
        print("\nStopping Edge AI RVM Simulator...")
    finally:
        client.loop_stop()
        client.disconnect()
        print("Simulator stopped.")

if __name__ == "__main__":
    simulate()