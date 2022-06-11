from MySQLdb import _mysql
from MySQLdb import Error
import time
from selenium import webdriver
from selenium.webdriver.common.by import By
options = webdriver.ChromeOptions()
options.add_argument("headless")

hosptial = {
    "name": "",
    "districk": "",
    "street": "",
    "longitude": 0,
    "latitude": 0
}
clinic = {
    "name": "",
    "category": "",
    "districk": "",
    "street": "",
    "longitude": 0,
    "latitude": 0
}
pat_hospital = {
    "name": "",
    "districk": "",
    "street": "",
    "longitude": 0,
    "latitude": 0
}
metro_station = {
    "name": "",
    "line": "",
    "districk": "",
    "street": "",
    "longitude": 0,
    "latitude": 0
}
train_station = {
    "name": "",
    "districk": "",
    "street": "",
    "longitude": 0,
    "latitude": 0
}
highSpeedRail_station = {
    "name": "",
    "districk": "",
    "street": "",
    "longitude": 0,
    "latitude": 0
}
youbike_station = {
    "name": "",
    "district": "",
    "street": "",
    "longitude": 0,
    "latitude": 0
}
carpark = {
    "name": "",
    "district": "",
    "street": "",
    "longitude": 0,
    "latitude": 0
}
park = {
    "name": "",
    "district": "",
    "street": "",
    "longitude": 0,
    "latitude": 0
}
sidewalk_tree = {
    "id": "",
    "district": "",
    "street": "",
    "longitude": 0,
    "latitude": 0
}
resteruant = {
    "name": "",
    "district": "",
    "street": "",
    "longitude": 0,
    "latitude": 0,
    "tel": ""
}
night_market = {
    "name": "",
    "district": "",
    "street": "",
    "longitude": 0,
    "latitude": 0
}
green_resteruant = {
    "name": "",
    "district": "",
    "street": "",
    "longitude": 0,
    "latitude": 0,
    "tel": ""
}
shopping_mall = {
    "name": "",
    "district": "",
    "street": "",
    "longitude": 0,
    "latitude": 0,
}
police_station = {
    "name": "",
    "district": "",
    "street": "",
    "longitude": 0,
    "latitude": 0,
    "tel": ""
}
crime_scene_location = {
    "id": 0,
    "category": "",
    "data": 0,
    "time": 0,
    "district": "",
    "street": "",
    "longitude": 0,
    "latitude": 0
}
gymroom = {
    "name": "",
    "district": "",
    "street": "",
    "longitude": 0,
    "latitude": 0,
    "work_hour": "",
    "remark": ""
}
activity_center = {
    "name": "",
    "district": "",
    "street": "",
    "longitude": 0,
    "latitude": 0,
}
riverside_park = {
    "name": "",
    "district": "",
    "street": "",
    "longitude": 0,
    "latitude": 0,
    "river": "",
    "carpark": True
}
garbageCar_station = {
    "car_id": "",
    "district": "",
    "street": "",
    "longitude": 0,
    "latitude": 0,
}

def db_connection(district, street, range):
    center = get_url_coordinate("臺北市{district}{street}")
    statement = "select * from "
    " all tables "
    "where 緯度 = "

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

from math import sin, cos, asin, sqrt, radians

def haversine(lon1, lat1, lon2, lat2, range):
    """
    Calculate the great circle distance between two points 
    on the earth (specified in decimal degrees)
    """
    # convert decimal degrees to radians 
    #lon1, lat1, lon2, lat2 = map(radians, [lon1, lat1, lon2, lat2])

    # haversine formula 
    c = 2 * asin(sqrt(sin((radians(lat2) - radians(lat1))/2)**2 + cos(radians(lat1)) * cos(radians(lat2)) * sin((radians(lon2) - radians(lon1))/2)**2))
    r = 6371 # Radius of earth in kilometers. Use 3956 for miles
    
    print("distance: ", c * r)
    print("Inside the circle" if c * r <= range else "Outside the {range} radians of a circle.")

lat1, lon1 = 25.034811972639968, 121.38981784635551
lat2, lon2 = 25.027027845532494, 121.38205091306521

print(haversine(lon1, lat1, lon2, lat2, 3.00))