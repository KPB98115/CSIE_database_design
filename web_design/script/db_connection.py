#import required module and set configuration
from ast import For
from MySQLdb import _mysql
import requests
import time
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import Select
from bs4 import BeautifulSoup
options = webdriver.ChromeOptions()
options.add_argument("headless")

def get_coordinate(addr):
    browser = webdriver.Chrome(executable_path='G:/GitHub/repositiory/CSIE_database_design/web_design/script/chromedriver',options=options)
    browser.get("http://www.map.com.tw/")
    search = browser.find_element(By.ID, "searchWord")
    search.clear()
    search.send_keys(addr)
    browser.find_element(By.XPATH, "/html/body/form/div[10]/div[2]/img[2]").click()
    time.sleep(2)
    iframe = browser.find_elements(By.TAG_NAME, "iframe")[1]
    print(iframe)
    browser.switch_to.frame(iframe)
    coor_btn = browser.find_element(By.XPATH, "/html/body/form/div[4]/table/tbody/tr[3]/td/table/tbody/tr/td[2]")
    coor_btn.click()
    coor = browser.find_element(By.XPATH, "/html/body/form/div[5]/table/tbody/tr[2]/td")
    coor = coor.text.strip().split(" ")
    lat = coor[-1].split("：")[-1]
    log = coor[0].split("：")[-1]
    browser.quit()
    return (lat, log)

def get_url_coordinate(addr):
    browser = webdriver.Chrome(executable_path='G:/GitHub/repositiory/CSIE_database_design/web_design/script/chromedriver',options=options)
    browser.get("https://www.google.com.tw/maps/")
    search = browser.find_element(By.ID, "searchboxinput")
    search.clear()
    search.send_keys(addr)
    browser.find_element(By.ID, "searchbox-searchbutton").click()
    time.sleep(10)
    url = browser.current_url
    return url

print(get_url_coordinate("台北市大安區羅斯福路四段1號"))

#initiate database configuration
"""host = 'localhost'
username = 'root'
password = '12345678'
database = 'test'

table = "垃圾車停靠地點"
primary_key_atr = "truck_no"
row_count = 10;"""

#conn = _mysql.connect(host, username, password, database)

#fetch data from databse
#conn.query("""SELECT address, truck_no FROM `垃圾車停靠地點` """)
#result = conn.store_result().fetch_row(row_count)

#processing data
"""for row in range(row_count):
    lat = get_coordinate(result[row][0].decode("UTF-8"))[0]
    log = get_coordinate(result[row][0].decode("UTF-8"))[1]
    pk = result[row][1].decode("UTF-8")
    conn.query(f"UPDATE `{table}` SET `longitude` = '{lat}', `Latitude` = '{log}' WHERE `{table}`.`{primary_key_atr}` = '{pk}'")"""