from flask import Flask, jsonify, request, send_from_directory
import csv
from datetime import datetime
import os

app = Flask(__name__, static_url_path="/", static_folder="experiment")


@app.route("/save-data", methods=["POST"])
def save_data():
    data = request.json  # Get the JSON data sent by the client

    try:
        os.mkdir("data")
    except:
        pass

    with open(os.path.join("data", data['filename']), "w") as f:
        # print(data)
        # writer = csv.writer(f)
        # writer.writerows(data)
        f.writelines(data['data'])

    return jsonify(success=True)


@app.route("/")
def experiment():
    return send_from_directory("experiment", "index.html")


# @app.route('')

if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0', port=3000)
