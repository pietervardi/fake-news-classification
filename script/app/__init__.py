import os
from flask import Flask

def create_app():
  app = Flask(__name__, template_folder=os.path.join(os.pardir, 'templates'), static_folder=os.path.join(os.pardir, 'static'))

  from app.routes import main as main_blueprint
  app.register_blueprint(main_blueprint)

  return app