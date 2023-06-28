from flask_sqlalchemy import SQLAlchemy
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy import MetaData
from sqlalchemy.orm import validates
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.hybrid import hybrid_property
from collections import OrderedDict
from flask_login import UserMixin, LoginManager

from config import db, bcrypt

################## Models Below####################


class Gunpla(db.Model, SerializerMixin):
    __tablename__ = 'gunplas'

    # columns
    id = db.Column(db.Integer, primary_key=True)
    model_img = db.Column(db.String)
    grade = db.Column(db.String)
    model = db.Column(db.String)
    model_num = db.Column(db.String)
    series = db.Column(db.String)
    price = db.Column(db.String)
    release_date = db.Column(db.String)
    notes = db.Column(db.String)

    # relationships
    collections = db.relationship('Collection', back_populates='gunpla')
    wishlists = db.relationship('Wishlist', back_populates='gunpla')

    # serialize rules
    serialize_rules = ('-collections', '-wishlists')

    # representation


class User(db.Model, SerializerMixin, UserMixin):
    __tablename__ = 'users'

    # columns
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, unique=True)
    _password_hash = db.Column(db.String)
    name = db.Column(db.String)
    email = db.Column(db.String, unique=True)
    theme_id = db.Column(db.Integer, db.ForeignKey('themes.id'))
    profile_pic = db.Column(db.String)

    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    # relationships
    collections = db.relationship(
        'Collection', back_populates='user', cascade="all, delete-orphan")
    wishlists = db.relationship(
        'Wishlist', back_populates='user', cascade="all, delete-orphan")

    # serialization
    serialize_rules = ('-collections.user', '-wishlists.user')

    # password hashing
    @hybrid_property
    def password_hash(self):
        raise Exception('Password hashes may not be viewed.')

    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(
            password.encode('utf-8'))
        self._password_hash = password_hash.decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(
            self._password_hash, password.encode('utf-8'))

    # representation
    def __repr__(self):
        return f'''ID: {self.id}, 
        Username: {self.username}, 
        Name: {self.name}, 
        Email: {self.email},
        Theme_id: {self.theme_id} '''


class Collection(db.Model, SerializerMixin):
    __tablename__ = 'collections'

    # columns
    id = db.Column(db.Integer, primary_key=True)
    custom_img = db.Column(db.String)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    gunpla_id = db.Column(db.Integer, db.ForeignKey('gunplas.id'))

    # relationships
    user = db.relationship('User', back_populates='collections')
    gunpla = db.relationship('Gunpla', back_populates='collections')

    # serialization
    serialize_rules = ('-user', '-gunpla')

    # representation
    def __repr__(self):
        return f'''ID: {self.id}, 
        Custom Image: {self.custom_img}, 
        User ID: {self.user.id}, 
        Gunpla ID: {self.gunpla.id} 
        '''


class Wishlist(db.Model, SerializerMixin):
    __tablename__ = 'wishlists'

    # columns
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    gunpla_id = db.Column(db.Integer, db.ForeignKey('gunplas.id'))

    # relationships
    user = db.relationship('User', back_populates='wishlists')
    gunpla = db.relationship('Gunpla', back_populates='wishlists')

    # serialization rules
    serialize_rules = ('-user', '-gunpla')

    # representation
    def __repr__(self):
        return f'''ID: {self.id}, User_ID: {self.user_id}, Gunpla_ID: {self.gunpla_id} '''


class Theme(db.Model, SerializerMixin):
    __tablename__ = 'themes'

    # columns
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)

    # relationships

    # serialization rules

    # representation
    def __repr__(self):
        return f'''ID: {self.id}, Name: {self.name}'''
