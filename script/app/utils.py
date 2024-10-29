import pickle
import re
import string

LABEL = ['Real News', 'Fake News']

# Load the model and vectorizer
def load_model():
  with open("model/model.pkl", "rb") as model_file:
    model = pickle.load(model_file)

  with open("model/vectorizer.pkl", "rb") as vec_file:
    vectorizer = pickle.load(vec_file)

  return model, vectorizer

# Preprocess the input text
def preprocess_text(text):
  text = text.lower()
  text = re.sub(r'\[.*?\]', '', text)
  text = re.sub(r"\\W", " ", text)
  text = re.sub(r'https?://\S+|www\.\S+', '', text)
  text = re.sub(r'<.*?>+', '', text)
  text = re.sub(r'[%s]' % re.escape(string.punctuation), '', text)
  text = re.sub(r'\n', '', text)
  text = re.sub(r'\w*\d\w*', '', text)
  return text