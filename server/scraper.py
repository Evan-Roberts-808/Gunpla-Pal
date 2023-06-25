from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from bs4 import BeautifulSoup
from config import app
import os
import urllib.parse
import urllib.request
import ipdb
import requests
import re
import time

from models import db, Gunpla


class Scraper:
    def __init__(self, chrome_driver_path):
        self.chrome_driver_path = chrome_driver_path
        self.gunpla = []
        self.image_directory = ""
        self.script_directory = os.path.dirname(os.path.abspath(__file__))
        self.raw_url = 'https://raw.githubusercontent.com/Evan-Roberts-808/Gunpla-Pal/main/.github/images/gunpla/'

        self.checkpoint_file = "checkpoint.txt"
        self.start_from_checkpoint = False
        self.last_scraped_model_number = None

    def load_checkpoint(self):
        if os.path.exists(self.checkpoint_file):
            with open(self.checkpoint_file, "r") as file:
                self.last_scraped_model_number = file.read().strip()
                self.start_from_checkpoint = True

    def save_checkpoint(self, model_number):
        with open(self.checkpoint_file, "w") as file:
            file.write(model_number)

    def get_page(self, url):
        options = Options()
        options.add_argument("--headless")
        service = Service(self.chrome_driver_path)
        driver = webdriver.Chrome(service=service, options=options)
        driver.get(url)
        page_source = driver.page_source
        driver.quit()
        return page_source

    def download_image(self, url, model_number, model_name):
        # Remove whitespace and slashes from model_number and model_name
        model_number = re.sub(r'\s+|/', '', model_number)
        model_name = re.sub(r'\s+|/', '', model_name)

        filename = f"MG-{model_number}{model_name}.jpg"
        filepath = os.path.join(self.script_directory,
                                self.image_directory, filename)
        response = requests.get(url)
        response.raise_for_status()

        with open(filepath, 'wb') as file:
            file.write(response.content)
        print(f"Image saved: {filename}")

        # Create the raw GitHubusercontent URL
        raw_image_url = f"{self.raw_url}{filename}"
        return raw_image_url

    def get_gunpla(self, url):
        self.load_checkpoint()  # Load the checkpoint file
        page_source = self.get_page(url)
        soup = BeautifulSoup(page_source, 'html.parser')

        divs = soup.find_all('div', class_='tabber wds-tabber')
        for div in divs:
            table = div.find(
                'table', class_='wikitable sortable jquery-tablesorter')
            if table:
                rows = table.find_all('tr')
                for row in rows:
                    columns = row.find_all('td')
                    if len(columns) >= 1:
                        try:
                            model_number = columns[0].text.strip()
                        except AttributeError:
                            model_number = None

                        # Check if the current model_number is the last scraped one
                        if self.start_from_checkpoint and model_number != self.last_scraped_model_number:
                            continue
                        else:
                            self.start_from_checkpoint = False  # Clear the checkpoint

                        anchor = columns[0].find('a', class_='image')
                        if anchor:
                            try:
                                image_url = anchor['href']
                            except KeyError:
                                image_url = None
                        else:
                            try:
                                image_url = columns[0].find('img')['src']
                            except (AttributeError, KeyError):
                                image_url = None

                        try:
                            model_name = columns[1].text.strip()
                        except AttributeError:
                            model_name = None

                        try:
                            series_element = columns[2].find('i')
                            if series_element:
                                series = series_element.text.strip()
                            else:
                                series = None
                        except AttributeError:
                            series = None

                        try:
                            yen_price = columns[3].text.strip()
                        except AttributeError:
                            yen_price = None

                        try:
                            release_date = columns[4].text.strip()
                        except AttributeError:
                            release_date = None

                        try:
                            notes = columns[5].text.strip()
                        except AttributeError:
                            notes = None

                        # Process the extracted data (e.g., save the image, create SQLAlchemy objects, etc.)
                        # ...

                        # Download and save the image
                        git_url = self.download_image(
                            image_url, model_number, model_name)
                        time.sleep(2)
                        # Create Gunpla object and save to database
                        gunpla = Gunpla(
                            grade = 'MG',
                            model = model_name,
                            model_num = model_number,
                            series = series,
                            price = yen_price,
                            release_date = release_date,
                            notes = notes
                        )
                        db.session.add(gunpla)
                        db.session.commit()
                        self.last_scraped_model_number = model_number
                        self.save_checkpoint(model_number)


scraper = Scraper("drivers/chromedriver")
scraper.get_gunpla("https://gundam.fandom.com/wiki/Master_Grade")

# https://raw.githubusercontent.com/Evan-Roberts-808/Gunpla-Pal/main/.github/images/gunpla/
