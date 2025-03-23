from flask import Flask, request, jsonify
import openai
import os

app = Flask(__name__)

# Установи свой OpenAI API ключ
openai.api_key = os.getenv('OPENAI_API_KEY')

@app.route('/gpt-chat', methods=['POST'])
def gpt_chat():
    user_message = request.json.get('message')
    if not user_message:
        return jsonify({'error': 'No message provided'}), 400
    
    try:
        response = openai.Completion.create(
            model="gpt-4",  # или "gpt-3.5-turbo"
            prompt=user_message,
            max_tokens=150
        )
        return jsonify({'response': response.choices[0].text.strip()})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000)
