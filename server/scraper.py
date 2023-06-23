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

# from models import (our models when theyre done)

class Scraper:
    def __init__(self, chrome_driver_path, base_url):
        self.chrome_driver_path = chrome_driver_path
        self.base_url = base_url
        self.gunpla = []
        self.image_directory = ""
        self.script_directory = os.path.dirname(os.path.abspath(__file__))

    def get_page(self, url):
        pass

    def download_image(self, url, filename):
        pass

    def get_gunpla(self, url):
        pass

#have to figure out and add base url
scraper = Scraper("drivers/chromedriver", )
gunpla_list = scraper.get_gunpla()