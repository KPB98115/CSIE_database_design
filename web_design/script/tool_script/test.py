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

result = get_url_coordinate("台北市士林區格致路62號")
lat = result[0]
log = result[1]
print(str(lat)+" "+str(log))



#initiate database configuration
host = 'localhost'
username = 'root'
password = '12345678'
database = 'test'

table = "location"
primary_key_atr = "truck_no"
row_count = 10
conn = _mysql.connect(host, username, password, database)


#fetch data from databse
conn.query(f"SELECT *, ST_distance_sphere( point(121.4989118, 25.0264558), point(`longitude`, `latitude`) )/1000 AS distance FROM `{table}` HAVING distance <= 3.00")
result = conn.store_result().fetch_row(0, 1)

print(result[0])

sql_result_keys = [key for key in result[0]]

print(sql_result_keys)