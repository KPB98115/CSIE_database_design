#import required module and set configuration
from MySQLdb import _mysql
from MySQLdb import Error
import time
from selenium import webdriver
from selenium.webdriver.common.by import By
options = webdriver.ChromeOptions()
options.add_argument("headless")

def get_url_coordinate(addr):
    browser = webdriver.Chrome(executable_path='G:/GitHub/repositiory/CSIE_database_design/web_design/script/chromedriver',options=options)
    browser.get("https://www.google.com.tw/maps/")
    search = browser.find_element(By.ID, "searchboxinput")
    search.clear()
    search.send_keys(addr)
    browser.find_element(By.ID, "searchbox-searchbutton").click()
    time.sleep(10)
    url = browser.current_url
    lat_strt, lat_end = url.find("@")+1, url.find(",")
    log_strt, log_end = url.find(",")+1, url.rfind(",")
    for i in url:
        lat = ''.join([coor for coor in url])[lat_strt : lat_end]
        log = ''.join([coor for coor in url])[log_strt : log_end]
    
    return (float(lat), float(log))

#initiate database configuration
host = 'localhost'
username = 'root'
password = '12345678'
database = 'test'

table = "垃圾車停靠地點"
primary_key_atr = "truck_no"
row_count = 10

conn = _mysql.connect(host, username, password, database)

#fetch data from databse
conn.query("""SELECT address, truck_no FROM `垃圾車停靠地點` """)
result = conn.store_result().fetch_row(row_count)

#processing data
for row in range(row_count):
    coordinate = get_url_coordinate(result[row][0].decode("UTF-8"))
    lat = coordinate[0]
    log = coordinate[1]
    print(str(lat)+" "+str(log))
    pk = result[row][1].decode("UTF-8")
    print("sql query : "+f"UPDATE `{table}` SET `longitude` = '{log}', `Latitude` = '{lat}' WHERE `{table}`.`{primary_key_atr}` = '{pk}'")
    conn.query(f"UPDATE `{table}` SET `longitude` = '{log}', `Latitude` = '{lat}' WHERE `{table}`.`{primary_key_atr}` = '{pk}'")

conn.close()
