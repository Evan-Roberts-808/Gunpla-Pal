from flask_sqlalchemy import SQLAlchemy
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy import MetaData
from sqlalchemy.orm import validates
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy_serializer import SerializerMixin
from collections import OrderedDict
from flask_login import UserMixin, LoginManager

from config import db

convention = {
    "ix": "ix_%(column_0_label)s",
    "uq": "uq_%(table_name)s_%(column_0_name)s",
    "ck": "ck_%(table_name)s_%(constraint_name)s",
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
    "pk": "pk_%(table_name)s",
}

metadata = MetaData(naming_convention=convention)

##################Models Below####################
class Gunpla(db.Model, SerializerMixin):
    __tablename__ = 'gunplas'

    # columns
    id = db.Column(db.Integer, primary_key=True)
    grade = db.Column(db.String)
    model = db.Column(db.String)
    model_num = db.Column(db.String)
    series = db.Column(db.String)
    release_date = db.Column(db.String)
    notes = db.Column(db.String)

    # relationships
    collection = db.relationship('Collection', back_populates='gunpla')
    wishlist = db.relationship('Wishlist', back_populates='gunpla')

    # serialize rules
    serialize_rules = ('-collection.gunpla', '-wishlist.gunpla')

    # representation
    def __repr__(self):
        return f'''ID: {self.id}, 
        Grade: {self.grade}, 
        Model: {self.model}, 
        Model_num: {self.model_num},  # Fix the typo here as well
        Series: {self.series},
        Release date: {self.release_date}, 
        Notes: {self.notes} '''

    
class User(db.Model, SerializerMixin, UserMixin):
    __tablename__ = 'users'

    #columns
    id = db.Column(db.Integer, primary_key = True)
    username = db.Column(db.String)
    _password_hash = db.Column(db.String)
    name = db.Column(db.String)
    email = db.Column(db.String)
    theme_id = db.Column(db.Integer, db.ForeignKey('themes.id'))
    profile_pic = db.Column(db.String)

    created_at = db.Column(db.DateTime, server_default = db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    #relationships
    collection = db.relationship('Collection', back_populates = 'user')
    wishlist = db.relationship('Wishlist', back_populates= 'user')

    #serialization
    serialize_rules = ('-collections.user', '-wishlist.user')

    #representation
    def __repr__(self):
        return f'''ID: {self.id}, 
        Username: {self.username}, 
        Name: {self.name}, 
        Email:{self.email},
        Theme_id: {self.theme_id} '''
    
class Collections(db.Model, SerializerMixin):
    __tablename__ = 'collections'

    #columns
    id = db.Column(db.Integer, primary_key = True)
    custom_img = db.Column(db.String)
    user_id = db.Column(db. Integer, db.ForeignKey('users.id'))
    gunpla_id = db.Column(db. Integer, db.ForeignKey('gunplas.id'))

    #relationships
    user = db.relationship('User', back_populates ='collection')
    gunpla = db.relationship('Gunpla', back_populates = 'collection')

    #serialization
    serialize_rules = ('-user.collection', '-gunpla.collection')

    #representation
    def __repr__(self):
        return f'''ID: {self.id}, 
        Custom Image: {self.custom_image}, 
        User ID: {self.user.id}, 
        Gunpla ID: {self.gunpla.id} 
        '''
    
class Wishlist(db.Model, SerializerMixin):
    __tablename__ = 'wishlists'

    #columns
    id = db.Column(db.Integer, primary_key = True)
    user_id = db.Column(db. Integer, db.ForeignKey('users.id'))
    gunpla_id = db.Column(db. Integer, db.ForeignKey('gunplas.id'))

    #relationships
    user = db.relationship('User', back_populates='wishlist')
    gunpla = db.relationship('Gunpla', back_populates='wishlist')

    #serialization rules
    serialize_rules = ('-user.wishlist', '-gunpla.wishlist')

    #representation
    def __repr__(self):
        return f'''ID:{self.id}, User_ID: {self.user_id}, Gunpla_ID: {self.gunpla_id} '''
class Theme(db.Model, SerializerMixin):
    __tablename__ = 'themes'

    #columns
    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String)

    #relationships

    #serialization rules

    #representation
    def __repr__(self):
        return f''' ID: {self.id}, Name: {self.name}'''