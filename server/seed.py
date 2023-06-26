from app import app
from models import db, Gunpla, Collection, Theme, User, Wishlist
import pickle
import os
import ipdb
import json


def clear_tables():
    db.session.query(Gunpla).delete()
    db.session.query(Collection).delete()
    db.session.query(Theme).delete()
    db.session.query(User).delete()
    db.session.query(Wishlist).delete()
    db.session.commit()

def create_backup():
    gunpla_list = []

    all_gunplas = Gunpla.query.all()

    for gunpla in all_gunplas:
        gunpla_list.append(gunpla)

    with open('gunpla_backup.pkl', 'wb') as f:
        pickle.dump(gunpla_list, f)

def view_pickle_structure(filename):
    with open(filename, 'rb') as f:
        data = pickle.load(f)
    
    # Print the structure of the data
    print(data)

def restore_backup(filename):
    with open(filename, 'rb') as f:
        gunpla_list = pickle.load(f)
    
    # Clear the Gunpla table
    db.session.query(Gunpla).delete()
    db.session.commit()

    # Insert the restored Gunpla objects into the database
    for gunpla_data in gunpla_list:
        gunpla = Gunpla(
            model_img=gunpla_data.model_img,
            grade=gunpla_data.grade,
            model=gunpla_data.model,
            model_num=gunpla_data.model_num,
            series=gunpla_data.series,
            price=gunpla_data.price,
            release_date=gunpla_data.release_date,
            notes=gunpla_data.notes
        )
        db.session.add(gunpla)
    
    db.session.commit()

if __name__ == "__main__":
    with app.app_context():
        # create_backup()
        # view_pickle_structure('gunpla_backup.pkl')
        # restore_backup('gunpla_backup.pkl')
        # ipdb.set_trace()
        pass
