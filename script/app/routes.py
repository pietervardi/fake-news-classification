from flask import Blueprint, request, jsonify, render_template
from app.utils import load_model, wordopt, LABEL

main = Blueprint('main', __name__)

model, vectorizer = load_model()

@main.route('/')
def home():
  return render_template('index.html')

@main.route('/predict', methods=['POST'])
def predict():
  news_text = request.form.get('news')
  if not news_text:
    return jsonify({"error": "No news text provided"}), 400

  processed_text = wordopt(news_text)
  test_vector = vectorizer.transform([processed_text])
  prediction = model.predict(test_vector)
  result = LABEL[prediction[0]]

  return jsonify({
    "prediction": result,
    "status": "SUCCESS"
  }), 200