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
    #use intent classification to classify the user message
    # Use basic text similarity to find most similar query
    max_similarity = 0
    best_match = None
    threshold = 0.2
    
    user_tokens = set(user_message.lower().split())
    
    for data in responseData:
        db_tokens = data['user'].lower().split()
        if data['keywords'] is not None:
            db_tokens.extend(data['keywords'])
        # Calculate Jaccard similarity between user message and database query
        intersection = len(user_tokens.intersection(db_tokens))
        union = len(user_tokens.union(db_tokens))
        similarity = intersection / union if union > 0 else 0
        
        if similarity > max_similarity:
            max_similarity = similarity
            best_match = data
    
    # Return best match if similarity exceeds threshold
    if best_match and max_similarity > threshold:
        if best_match['type'] == 'general':
            return {'type': 'general', 'response': best_match['response']}
        return {
            'type': 'help',
            'response': best_match['response'], 
            'steps': fetch_steps(best_match['steps'])
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