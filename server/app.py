from flask_migrate import Migrate
from flask import Flask

from config import app, db, api
from models import Gunpla, User, Collection, Wishlist, Theme

migrate = Migrate(app, db)

if __name__ == '__main__':
    app.run(port=5555, debug=True)
