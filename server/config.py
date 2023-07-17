from sqlalchemy import MetaData
from flask_sqlalchemy import SQLAlchemy
from flask_restful import Api, Resource
from flask_migrate import Migrate
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from flask import Flask, render_template
import os
from dotenv import load_dotenv
load_dotenv()

app = Flask(__name__, static_url_path='',
            static_folder='../client/dist', template_folder='../client/dist')
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URI')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False
app.secret_key = os.environ.get('SESSION_KEY')

metadata = MetaData(naming_convention={
    "ix": "ix_%(column_0_label)s",
    "uq": "uq_%(table_name)s_%(column_0_name)s",
    "ck": "ck_%(table_name)s_%(constraint_name)s",
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
    "pk": "pk_%(table_name)s",
})

db = SQLAlchemy(metadata=metadata)
migrate = Migrate(app, db)
db.init_app(app)

bcrypt = Bcrypt(app)


@app.route('/')
@app.route('/database')
@app.route('/database/:grade')
@app.route('/profile')
@app.route('/profile')
@app.route('/login')
@app.route('/signup')
def index(id=0):
    return render_template("index.html")


api = Api(app)
CORS(app)
