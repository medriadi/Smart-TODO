from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

app = Flask(__name__)
app.config.from_object('backend.config.Config')

db = SQLAlchemy(app)
migrate = Migrate(app, db)

from backend.routes import tasks, users  # Ensure these imports are correct

# Register blueprints if using them
app.register_blueprint(tasks.bp)
app.register_blueprint(users.bp)

if __name__ == '__main__':
    app.run()
