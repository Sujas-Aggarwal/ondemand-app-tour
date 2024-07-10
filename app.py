from flask import Flask
from flask import render_template
import os
from flask import send_from_directory
from flask import request
from flask import jsonify
import json
app = Flask(__name__)

@app.route("/")
def home():
    return render_template('index.html')

# Load predefined flows from JSON file
with open('data.json', 'r') as f:
    responseData = json.load(f)

# Load predefined flows from JSON file
with open('flows.json', 'r') as f:
    flows = json.load(f)

@app.route('/chatbot', methods=['POST'])
def process_message():
    data = request.json
    print(data)
    user_message = data['message']
    if user_message:
        response = find_matching_response(user_message)
        return jsonify(response)
    return jsonify({'error': 'No user message found in request'}), 400

def find_matching_response(user_message):
    for data in responseData:
        if user_message.lower() in data['user']:
            if data['type'] == 'general':
                return {'type': 'general', 'response': data['response']}
            return {
                'type': 'help',
                'response': data['response'],
                'steps': fetch_steps(data['steps'])
            }
    return {'type': 'general', 'response': 'Sorry, I did not understand your request.'}

def fetch_steps(flow_steps):
    return flows[flow_steps]

#For Static Hosting
@app.route('/images/<path:filename>')
def serve_image(filename):
    return send_from_directory(os.path.join(app.static_folder, 'images'), filename)
@app.route('/css/<path:filename>')
def serve_css(filename):
    return send_from_directory(os.path.join(app.static_folder, 'css'), filename)

@app.route('/js/<path:filename>')
def serve_js(filename):
    return send_from_directory(os.path.join(app.static_folder, 'js'), filename)

if __name__ == '__main__':
    app.run(debug=True)