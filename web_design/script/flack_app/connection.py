from lib2to3.pytree import type_repr
from multiprocessing.dummy import active_children
from os import stat
from unittest import result
from MySQLdb import _mysql
import time
from selenium import webdriver
from selenium.webdriver.common.by import By
options = webdriver.ChromeOptions()
options.add_argument("headless")
import json
import requests

#initial database configuration
host = "localhost"
username = "root"
password = "110333789"
database = "taipei_facility"

#Start connection
conn = _mysql.connect(host, username, password, database)

def address():
    conn.query("""SELECT zipcode, district from `taipei_city_district`""")
    result = conn.store_result().fetch_row(0, 1)

    conn.query("""SELECT street from `taipei_city_street` WHERE district_id = 1""")
    result1 = conn.store_result().fetch_row(0, 1)

    conn.query("""SELECT street from `taipei_city_street` WHERE district_id = 2""")
    result2 = conn.store_result().fetch_row(0, 1)

    conn.query("""SELECT street from `taipei_city_street` WHERE district_id = 3""")
    result3 = conn.store_result().fetch_row(0, 1)

    conn.query("""SELECT street from `taipei_city_street` WHERE district_id = 4""")
    result4 = conn.store_result().fetch_row(0, 1)

    conn.query("""SELECT street from `taipei_city_street` WHERE district_id = 5""")
    result5 = conn.store_result().fetch_row(0, 1)

    conn.query("""SELECT street from `taipei_city_street` WHERE district_id = 6""")
    result6 = conn.store_result().fetch_row(0, 1)

    conn.query("""SELECT street from `taipei_city_street` WHERE district_id = 7""")
    result7 = conn.store_result().fetch_row(0, 1)

    conn.query("""SELECT street from `taipei_city_street` WHERE district_id = 8""")
    result8 = conn.store_result().fetch_row(0, 1)

    conn.query("""SELECT street from `taipei_city_street` WHERE district_id = 9""")
    result9 = conn.store_result().fetch_row(0, 1)

    conn.query("""SELECT street from `taipei_city_street` WHERE district_id = 10""")
    result10 = conn.store_result().fetch_row(0, 1)

    conn.query("""SELECT street from `taipei_city_street` WHERE district_id = 11""")
    result11 = conn.store_result().fetch_row(0, 1)

    conn.query("""SELECT street from `taipei_city_street` WHERE district_id = 12""")
    result12 = conn.store_result().fetch_row(0, 1)

    address_result = [[dicts[value].decode("utf-8") for value in dicts.keys()] for dicts in result]
    address_result1 = [[dicts[value].decode("utf-8") for value in dicts.keys()] for dicts in result1]
    address_result2 = [[dicts[value].decode("utf-8") for value in dicts.keys()] for dicts in result2]
    address_result3 = [[dicts[value].decode("utf-8") for value in dicts.keys()] for dicts in result3]
    address_result4 = [[dicts[value].decode("utf-8") for value in dicts.keys()] for dicts in result4]
    address_result5 = [[dicts[value].decode("utf-8") for value in dicts.keys()] for dicts in result5]
    address_result6 = [[dicts[value].decode("utf-8") for value in dicts.keys()] for dicts in result6]
    address_result7 = [[dicts[value].decode("utf-8") for value in dicts.keys()] for dicts in result7]
    address_result8 = [[dicts[value].decode("utf-8") for value in dicts.keys()] for dicts in result8]
    address_result9 = [[dicts[value].decode("utf-8") for value in dicts.keys()] for dicts in result9]
    address_result10 = [[dicts[value].decode("utf-8") for value in dicts.keys()] for dicts in result10]
    address_result11 = [[dicts[value].decode("utf-8") for value in dicts.keys()] for dicts in result11]
    address_result12 = [[dicts[value].decode("utf-8") for value in dicts.keys()] for dicts in result12]

    address = {
        "district": address_result,
        "street": [address_result1, address_result2, address_result3, address_result4, address_result5, address_result6, address_result7, address_result8, address_result9, address_result10, address_result11, address_result12]
    }

    return json.dumps(address, ensure_ascii=False)

def facility():
    conn.query("""SELECT facility from `facility`""")
    result = conn.store_result().fetch_row(0, 1)
    facility_result = [[dicts[value].decode("utf-8") for value in dicts.keys()] for dicts in result]

    return json.dumps(facility_result, ensure_ascii=False)


def getCoordinates(address):
    url = "https://maps.googleapis.com/maps/api/geocode/json?address="+address+'&key='+"AIzaSyBglsbKI_-4idv_WoI0DPXN20TnyHHCL-s"
    response = requests.get(url)
    result_in_DICT = response.json()
    lat = result_in_DICT["results"][0]["geometry"]["location"]["lat"]
    lng = result_in_DICT["results"][0]["geometry"]["location"]["lng"]

    return [lat, lng]
    
def queryAllResult(district, street, range, filter, filter_type):
    coordinate = getCoordinates(f"臺北市{district}{street}號")
    user_lat = coordinate[0]
    user_lng = coordinate[1]

    print(user_lng, user_lat)

    try:
        _mysql.connection.ping(conn)
    except Exception as e:
        conn = _mysql.connect(host, username, password, database)

    if (filter == "district"):
        entertain_result = queryEntertainment(range, user_lat, user_lng, filter_type)
        traffic_result = queryTraffic(range, user_lat, user_lng, filter_type)
        sport_result = querySport(range, user_lat, user_lng, filter_type)
        catering_result = queryCatering(range, user_lat,user_lng, filter_type)
        medical_result = queryMedical(range, user_lat, user_lng, filter_type)
        pet_result = queryPatFriendly(range, user_lat, user_lng, filter_type)
        secuity_result = querySecuity(range, user_lat, user_lng, filter_type)
        enviorment_result = queryGreenEnviroment(range, user_lat, user_lng, filter_type)
        garbageCar_result = queryGarbageCar(range, user_lat, user_lng, filter_type)
        totalCount = queryTotal()
    elif (filter == "facility"):
        if (filter_type == "消費與娛樂"):
            entertain_result = queryEntertainment(range, user_lat, user_lng)
        elif (filter_type == "交通"):
            traffic_result = queryTraffic(range, user_lat, user_lng)
        elif (filter_type == "運動場所"):
            sport_result = querySport(range, user_lat, user_lng)
        elif (filter_type == "醫療場所"):
            medical_result = queryMedical(range, user_lat, user_lng)
        elif (filter_type == "餐飲"):
            catering_result = queryCatering(range, user_lat,user_lng)
        elif (filter_type == "寵物友善"):
            pet_result = queryPatFriendly(range, user_lat, user_lng)
        elif (filter_type == "綠色環境"):
            enviorment_result = queryGreenEnviroment(range, user_lat, user_lng)
        elif (filter_type == "治安"):
            secuity_result = querySecuity(range, user_lat, user_lng)
        elif (filter_type == "垃圾車站點"):
            garbageCar_result = queryGarbageCar(range, user_lat, user_lng)
        else:
            print("cant pass utf-8 chinese")
    #update 06/26

    totalCount = queryTotal()

    #conn.close()

    all_result = [entertain_result, traffic_result, sport_result, catering_result, medical_result, pet_result, enviorment_result, secuity_result, garbageCar_result, totalCount]
    
    return json.dumps(all_result, ensure_ascii=False)

def querySport(range, user_lat, user_lng):

    sport_gymroom_statement = f"""SELECT district, gym_name, street, phone, business_hr, ST_distance_sphere( point({user_lng}, {user_lat}), point(`longitude`, `latitude`) )/1000 
    AS distance_in_KM FROM (SELECT * FROM `sport_gym` NATURAL JOIN `sport_gym_brand`) AS temptable HAVING distance_in_KM <= {range} ORDER BY `distance_in_KM` ASC"""
    
    sport_activity_center_statement = f"""SELECT district, name, street, ST_distance_sphere( point({user_lng}, {user_lat}), point(`longitude`, `latitude`) )/1000 
    AS distance_in_KM FROM (SELECT * FROM `sport_activity_center`) AS temptable HAVING distance_in_KM <= {range} ORDER BY `distance_in_KM` ASC"""

    sport_riverside_park_statement = f"""SELECT district, name, river, parkinglot, ST_distance_sphere( point({user_lng}, {user_lat}), point(`longitude`, `latitude`) )/1000 
    AS distance_in_KM FROM (SELECT * FROM `sport_riverside_park` NATURAL JOIN `river`) AS temptable HAVING distance_in_KM <= {range} ORDER BY `distance_in_KM` ASC"""
    
    conn.query(sport_gymroom_statement)
    sport_gymroom_result = conn.store_result().fetch_row(0, 1)

    conn.query(sport_activity_center_statement)
    sport_activity_center_result = conn.store_result().fetch_row(0, 1)

    conn.query(sport_riverside_park_statement)
    sport_riverside_park_result = conn.store_result().fetch_row(0, 1)

    #gymroom_result_keys = [key for key in sport_gymroom_result[0]]
    #activity_center_result_keys = [key for key in sport_activity_center_result[0]]
    #riverside_park_results_keys = [key for key in sport_riverside_park_result[0]]


    sport_gymroom = [[dicts[value].decode("utf-8") for value in dicts.keys()] for dicts in sport_gymroom_result]
    sport_activity_center = [[dicts[value].decode("utf-8") for value in dicts.keys()] for dicts in sport_activity_center_result]
    sport_riverside_park = [[dicts[value].decode("utf-8") for value in dicts.keys()] for dicts in sport_riverside_park_result]

    """
    gymroom_result_values.insert(0, gymroom_result_keys)
    activity_center_result_values.insert(0, activity_center_result_keys)
    riverside_park_results_values.insert(0, riverside_park_results_keys)
    """

    sport_result = {
        "gymroom": sport_gymroom,
        "activity_center": sport_activity_center,
        "riverside_park": sport_riverside_park
        }

    #sport_result_inJSON = json.dumps(sport_result, ensure_ascii=False)

    return sport_result


def querySecuity(range, user_lat, user_lng):

    crime_bike_statement = f"""SELECT district, type, street, date, time, ST_distance_sphere( point({user_lng}, {user_lat}), point(`longitude`, `latitude`) )/1000 AS distance_in_KM 
    FROM (SELECT * FROM `case_location` NATURAL JOIN `case_type` WHERE type = "自行車竊盜") AS temptable HAVING distance_in_KM <= {range} ORDER BY `distance_in_KM` ASC"""

    crime_motor_statement = f"""SELECT district, type, street, date, time, ST_distance_sphere( point({user_lng}, {user_lat}), point(`longitude`, `latitude`) )/1000 AS distance_in_KM 
    FROM (SELECT * FROM `case_location` NATURAL JOIN `case_type` WHERE type = "機車竊盜") AS temptable HAVING distance_in_KM <= {range} ORDER BY `distance_in_KM` ASC"""

    crime_car_statement = f"""SELECT district, type, street, date, time, ST_distance_sphere( point({user_lng}, {user_lat}), point(`longitude`, `latitude`) )/1000 AS distance_in_KM 
    FROM (SELECT * FROM `case_location` NATURAL JOIN `case_type` WHERE type = "汽車竊盜") AS temptable HAVING distance_in_KM <= {range} ORDER BY `distance_in_KM` ASC"""
    
    crime_house_burglary_statement = f"""SELECT district, type, street, date, time, ST_distance_sphere( point({user_lng}, {user_lat}), point(`longitude`, `latitude`) )/1000 AS distance_in_KM 
    FROM (SELECT * FROM `case_location` NATURAL JOIN `case_type` WHERE type = "住宅竊盜") AS temptable HAVING distance_in_KM <= {range} ORDER BY `distance_in_KM` ASC"""
    
    crime_robbery_statement = f"""SELECT district, type, street, date, time, ST_distance_sphere( point({user_lng}, {user_lat}), point(`longitude`, `latitude`) )/1000 AS distance_in_KM 
    FROM (SELECT * FROM `case_location` NATURAL JOIN `case_type` WHERE type = "隨機強盜") AS temptable HAVING distance_in_KM <= {range} ORDER BY `distance_in_KM` ASC"""
    
    crime_burglary_statement = f"""SELECT district, type, street, date, time, ST_distance_sphere( point({user_lng}, {user_lat}), point(`longitude`, `latitude`) )/1000 AS distance_in_KM 
    FROM (SELECT * FROM `case_location` NATURAL JOIN `case_type` WHERE type = "隨機搶奪") AS temptable HAVING distance_in_KM <= {range} ORDER BY `distance_in_KM` ASC"""
    
    conn.query(crime_bike_statement)
    crime_bike_result = conn.store_result().fetch_row(0, 1)

    conn.query(crime_motor_statement)
    crime_motor_result = conn.store_result().fetch_row(0, 1)
    
    conn.query(crime_car_statement)
    crime_car_result = conn.store_result().fetch_row(0, 1)

    conn.query(crime_house_burglary_statement)
    crime_house_burglary_result = conn.store_result().fetch_row(0, 1)

    conn.query(crime_robbery_statement)
    crime_robbery_result = conn.store_result().fetch_row(0, 1)

    conn.query(crime_burglary_statement)
    crime_burglary_result = conn.store_result().fetch_row(0, 1)

    #bike_result_keys = [key for key in crime_bike_result[0]]
    #motor_result_keys = [key for key in crime_motor_result[0]]
    #car_result_keys = [key for key in crime_car_result[0]]
    #house_burglary_result_keys = [key for key in crime_house_burglary_result[0]]
    #robbery_result_keys = [key for key in crime_robbery_result[0]]
    #burglary_result_keys = [key for key in crime_burglary_result[0]]

    crime_bike = [[dicts[value].decode("utf-8") for value in dicts.keys()] for dicts in crime_bike_result]
    crime_motor = [[dicts[value].decode("utf-8") for value in dicts.keys()] for dicts in crime_motor_result]
    crime_car = [[dicts[value].decode("utf-8") for value in dicts.keys()] for dicts in crime_car_result]
    crime_house_burglary = [[dicts[value].decode("utf-8") for value in dicts.keys()] for dicts in crime_house_burglary_result]
    crime_robbery = [[dicts[value].decode("utf-8") for value in dicts.keys()] for dicts in crime_robbery_result]
    crime_burglary = [[dicts[value].decode("utf-8") for value in dicts.keys()] for dicts in crime_burglary_result]

    """
    bike_result_values.insert(0, bike_result_keys)
    motor_result_values.insert(0, motor_result_keys)
    car_result_values.insert(0, car_result_keys)
    house_burglary_result_values.insert(0, house_burglary_result_keys)
    robbery_result_values.insert(0, robbery_result_keys)
    burglary_result_values.insert(0, burglary_result_keys)
    """

    crime_result = {
        "bike": crime_bike,
        "motor": crime_motor,
        "car": crime_car,
        "house_burglary": crime_house_burglary,
        "robbery": crime_robbery,
        "burglary": crime_burglary
        }

    #crime_result_inJSON = json.dumps(crime_result, ensure_ascii=False)

    return crime_result

def queryMedical(range, user_lat, user_lng):
    medical_hospital_statement = f"""SELECT district, name, street, ST_distance_sphere( point({user_lng}, {user_lat}), point(`longitude`, `latitude`) )/1000
    AS distance_in_KM FROM (SELECT * FROM `medical_hospital`) AS temptable HAVING distance_in_KM <= {range} ORDER BY `distance_in_KM` ASC"""

    medical_ALLclinic_statement = f"""SELECT district, name, street, category, ST_distance_sphere( point({user_lng}, {user_lat}), point(`longitude`, `latitude`) )/1000 
    AS distance_in_KM FROM (SELECT * FROM `medical_clinic_info` NATURAL JOIN `medical_clinic_category`) AS temptable HAVING distance_in_KM <= {range} ORDER BY `distance_in_KM` ASC"""

    medical_clinic_plastic_surgery = f"""SELECT COUNT(*) AS 整形外科診所 FROM (SELECT *, ST_distance_sphere( point({user_lng}, {user_lat}), point(`longitude`, `latitude`) )/1000 
    AS distance_in_KM FROM (SELECT * FROM `medical_clinic_info` NATURAL JOIN `medical_clinic_category` WHERE category = "整形外科") AS temptable HAVING distance_in_KM <= {range} ORDER BY `distance_in_KM` ASC) AS result"""

    medical_clinic_dermatology = f"""SELECT COUNT(*) AS 皮膚科診所 FROM (SELECT *, ST_distance_sphere( point({user_lng}, {user_lat}), point(`longitude`, `latitude`) )/1000 
    AS distance_in_KM FROM (SELECT * FROM `medical_clinic_info` NATURAL JOIN `medical_clinic_category` WHERE category = "皮膚科") AS temptable HAVING distance_in_KM <= {range} ORDER BY `distance_in_KM` ASC) AS result"""

    medical_clinic_dentistry = f"""SELECT COUNT(*) AS 牙科診所 FROM (SELECT *, ST_distance_sphere( point({user_lng}, {user_lat}), point(`longitude`, `latitude`) )/1000 
    AS distance_in_KM FROM (SELECT * FROM `medical_clinic_info` NATURAL JOIN `medical_clinic_category` WHERE category = "牙科") AS temptable HAVING distance_in_KM <= {range} ORDER BY `distance_in_KM` ASC) AS result"""

    medical_clinic_chinese_medicine = f"""SELECT COUNT(*) AS 中醫診所 FROM (SELECT *, ST_distance_sphere( point({user_lng}, {user_lat}), point(`longitude`, `latitude`) )/1000 
    AS distance_in_KM FROM (SELECT * FROM `medical_clinic_info` NATURAL JOIN `medical_clinic_category` WHERE category = "中醫") AS temptable HAVING distance_in_KM <= {range} ORDER BY `distance_in_KM` ASC) AS result"""

    medical_clinic_ENT = f"""SELECT COUNT(*) AS 耳鼻喉科診所 FROM (SELECT *, ST_distance_sphere( point({user_lng}, {user_lat}), point(`longitude`, `latitude`) )/1000 
    AS distance_in_KM FROM (SELECT * FROM `medical_clinic_info` NATURAL JOIN `medical_clinic_category` WHERE category = "耳鼻喉科") AS temptable HAVING distance_in_KM <= {range} ORDER BY `distance_in_KM` ASC) AS result"""

    medical_clinic_psychiatry = f"""SELECT COUNT(*) AS 精神科診所 FROM (SELECT *, ST_distance_sphere( point({user_lng}, {user_lat}), point(`longitude`, `latitude`) )/1000 
    AS distance_in_KM FROM (SELECT * FROM `medical_clinic_info` NATURAL JOIN `medical_clinic_category` WHERE category = "精神科") AS temptable HAVING distance_in_KM <= {range} ORDER BY `distance_in_KM` ASC) AS result"""

    medical_clinic_obstetrics_gynecology = f"""SELECT COUNT(*) AS 婦產科診所 FROM (SELECT *, ST_distance_sphere( point({user_lng}, {user_lat}), point(`longitude`, `latitude`) )/1000 
    AS distance_in_KM FROM (SELECT * FROM `medical_clinic_info` NATURAL JOIN `medical_clinic_category` WHERE category = "婦產科") AS temptable HAVING distance_in_KM <= {range} ORDER BY `distance_in_KM` ASC) AS result"""

    medical_clinic_pediatrics = f"""SELECT COUNT(*) AS 兒科診所 FROM (SELECT *, ST_distance_sphere( point({user_lng}, {user_lat}), point(`longitude`, `latitude`) )/1000 
    AS distance_in_KM FROM (SELECT * FROM `medical_clinic_info` NATURAL JOIN `medical_clinic_category` WHERE category = "兒科") AS temptable HAVING distance_in_KM <= {range} ORDER BY `distance_in_KM` ASC) AS result"""

    medical_clinic = f"""SELECT COUNT(*) AS 一般診所數量 FROM (SELECT *, ST_distance_sphere( point({user_lng}, {user_lat}), point(`longitude`, `latitude`) )/1000 
    AS distance_in_KM FROM (SELECT * FROM `medical_clinic_info` NATURAL JOIN `medical_clinic_category` WHERE category = "一般診所") AS temptable HAVING distance_in_KM <= {range} ORDER BY `distance_in_KM` ASC) AS result"""

    conn.query(medical_hospital_statement)
    medical_hospital_result = conn.store_result().fetch_row(0, 1)

    conn.query(medical_ALLclinic_statement)
    medical_ALLclinic_result = conn.store_result().fetch_row(0, 1)

    #hospital_result_keys = [key for key in medical_hospital_result[0]]
    #ALLclinic_result_keys = [key for key in medical_ALLclinic_result[0]]

    #hospital_result_values = [value.decode("utf-8") for value in dicts.values() for dicts in medical_hospital_result]
    #ALLclinic_result_values = [[value.decode("utf-8") for value in dicts.values()] for dicts in medical_ALLclinic_result]
    medical_hospital = [[dicts[value].decode("utf-8") for value in dicts.keys()] for dicts in medical_hospital_result]
    medical_ALLclinic = [[dicts[value].decode("utf-8") for value in dicts.keys()] for dicts in medical_ALLclinic_result]

    """
    hospital_result_values.insert(0, hospital_result_keys)
    ALLclinic_result_values.insert(0, ALLclinic_result_keys)
    """

    medical_result = {
        "hospital": medical_hospital,
        "ALLclinic": medical_ALLclinic
        }

    #medical_result_inJSON = json.dumps(medical_result, ensure_ascii=False)

    return medical_result

def queryTraffic(range, user_lat, user_lng):

    traffic_youbike_statement = f"""SELECT district, name, street, ST_distance_sphere( point({user_lng}, {user_lat}), point(`longitude`, `latitude`) )/1000 
    AS distance_in_KM FROM (SELECT * FROM `traffic_youbike_station`) AS temptable HAVING distance_in_KM <= {range} ORDER BY `distance_in_KM` ASC"""

    traffic_metro_statement = f"""SELECT district, name, street, route_name, ST_distance_sphere( point({user_lng}, {user_lat}), point(`longitude`, `latitude`) )/1000 
    AS distance_in_KM FROM (SELECT * FROM `traffic_metro_station_info` NATURAL JOIN `traffic_metro_route` NATURAL JOIN `traffic_metro_station_route`) AS temptable HAVING distance_in_KM <= {range} ORDER BY `distance_in_KM` ASC"""

    traffic_train_statement = f"""SELECT district, name, street, ST_distance_sphere( point({user_lng}, {user_lat}), point(`longitude`, `latitude`) )/1000 
    AS distance_in_KM FROM (SELECT * FROM `traffic_train_station`) AS temptable HAVING distance_in_KM <= {range} ORDER BY `distance_in_KM` ASC"""

    traffic_highSpeedRail_statement = f"""SELECT district, name, street, ST_distance_sphere( point({user_lng}, {user_lat}), point(`longitude`, `latitude`) )/1000 
    AS distance_in_KM FROM (SELECT * FROM `traffic_highspeedrail_station`) AS temptable HAVING distance_in_KM <= {range} ORDER BY `distance_in_KM` ASC"""

    traffic_busstop_statement = f"""SELECT name, ST_distance_sphere( point({user_lng}, {user_lat}), point(`longitude`, `latitude`) )/1000 
    AS distance_in_KM FROM (SELECT * FROM `traffic_busstop`) AS temptable HAVING distance_in_KM <= {range} ORDER BY `distance_in_KM` ASC"""

    conn.query(traffic_youbike_statement)
    traffic_youbike_result = conn.store_result().fetch_row(0, 1)

    conn.query(traffic_metro_statement)
    traffic_metro_result = conn.store_result().fetch_row(0, 1)

    conn.query(traffic_train_statement)
    traffic_train_result = conn.store_result().fetch_row(0, 1)

    conn.query(traffic_highSpeedRail_statement)
    traffic_highSpeedRail_result = conn.store_result().fetch_row(0, 1)

    conn.query(traffic_busstop_statement)
    traffic_busstop_result = conn.store_result().fetch_row(0, 1)

    #youbike_result_keys = [key for key in traffic_youbike_result[0]]
    #busstop_result_keys = [key for key in traffic_busstop_result[0]]
    #metro_result_keys = [key for key in traffic_metro_result[0]]
    #train_result_keys = [key for key in traffic_train_result[0]]
    #highSpeedRail_result_keys = [key for key in traffic_highSpeedRail_result[0]]

    traffic_youbike = [[dicts[value].decode("utf-8") for value in dicts.keys()] for dicts in traffic_youbike_result]
    traffic_busstop = [[dicts[value].decode("utf-8") for value in dicts.keys()] for dicts in traffic_busstop_result]
    traffic_metro = [[dicts[value].decode("utf-8") for value in dicts.keys()] for dicts in traffic_metro_result]
    traffic_train = [[dicts[value].decode("utf-8") for value in dicts.keys()] for dicts in traffic_train_result]
    traffic_highSpeedRail = [[dicts[value].decode("utf-8") for value in dicts.keys()] for dicts in traffic_highSpeedRail_result]

    """
    youbike_result_values.insert(0, youbike_result_keys)
    busstop_result_values.insert(0, busstop_result_keys)
    metro_result_values.insert(0, metro_result_keys)
    train_result_values.insert(0, train_result_keys)
    highSpeedRail_result_values.insert(0, highSpeedRail_result_keys)
    """
    
    traffic_result = {
        "YouBike": traffic_youbike,
        "bus_stop": traffic_busstop,
        "metro": traffic_metro,
        "train": traffic_train,
        "high_speed_rail": traffic_highSpeedRail
        }

    #traffic_result_inJSON = json.dumps(traffic_result, ensure_ascii=False)

    return traffic_result

def queryCatering(range, user_lat, user_lng):

    catering_green_resteruant_statement = f"""SELECT district, name, street, tel, ST_distance_sphere( point({user_lng}, {user_lat}), point(`longitude`, `latitude`) )/1000 
    AS distance_in_KM FROM (SELECT * FROM `meal_green_resteruant` NATURAL JOIN `meal_green_resteruant_phone`) AS temptable HAVING distance_in_KM <= {range} ORDER BY `distance_in_KM` ASC"""

    catering_night_market_statement = f"""SELECT district, name, street, ST_distance_sphere( point({user_lng}, {user_lat}), point(`longitude`, `latitude`) )/1000 
    AS distance_in_KM FROM (SELECT * FROM `meal_night_market`) AS temptable HAVING distance_in_KM <= {range} ORDER BY `distance_in_KM` ASC"""

    conn.query(catering_green_resteruant_statement)
    catering_green_resteruant_result = conn.store_result().fetch_row(0, 1)

    conn.query(catering_night_market_statement)
    catering_night_market_result = conn.store_result().fetch_row(0, 1)

    #green_resteruant_result_keys = [key for key in catering_green_resteruant_result[0]]
    #night_market_result_keys = [key for key in catering_night_market_result[0]]

    catering_green_resteruant = [[dicts[value].decode("utf-8") for value in dicts.keys()] for dicts in catering_green_resteruant_result]
    catering_night_market = [[dicts[value].decode("utf-8") for value in dicts.keys()] for dicts in catering_night_market_result]

    """
    green_resteruant_result_values.insert(0, green_resteruant_result_keys)
    night_market_result_values.insert(0, night_market_result_keys)
    """

    catering_result = {
        "green_resteruant": catering_green_resteruant,
        "night_market": catering_night_market
    }

    #catering_result_inJSON = json.dumps(catering_result, ensure_ascii=False)

    return catering_result

def queryGreenEnviroment(range, user_lat, user_lng):

    enviorment_park_statement = f"""SELECT district, name, street, ST_distance_sphere( point({user_lng}, {user_lat}), point(`longitude`, `latitude`) )/1000 
    AS distance_in_KM FROM (SELECT * FROM `enviorment_park`) AS temptable HAVING distance_in_KM <= {range} ORDER BY `distance_in_KM` ASC"""
    
    enviorment_sidewalk_tree_statement = f"""SELECT district, tree_id, street, ST_distance_sphere( point({user_lng}, {user_lat}), point(`longitude`, `latitude`) )/1000 
    AS distance_in_KM FROM (SELECT * FROM `enviorment_sidewalk_tree`) AS temptable HAVING distance_in_KM <= {range} ORDER BY `distance_in_KM` ASC"""

    conn.query(enviorment_park_statement)
    enviorment_park_result = conn.store_result().fetch_row(0, 1)
    
    conn.query(enviorment_sidewalk_tree_statement)
    enviorment_sidewalk_tree_result = conn.store_result().fetch_row(0, 1)

    #ark_result_keys = [key for key in enviorment_park_result[0]]
    #sidewalk_tree_result_keys = [key for key in enviorment_sidewalk_tree_result[0]]

    enviorment_park = [[dicts[value].decode("utf-8") for value in dicts.keys()] for dicts in enviorment_park_result]
    enviorment_sidewalk_tree = [[dicts[value].decode("utf-8") for value in dicts.keys()] for dicts in enviorment_sidewalk_tree_result]

    """
    park_result_values.insert(0, park_result_keys)
    sidewalk_tree_result_values.insert(0, sidewalk_tree_result_keys)
    """

    enviorment_result = {
        "park": enviorment_park,
        "sidewalk_tree": enviorment_sidewalk_tree
        }

    #enviorment_result_inJSON = json.dumps(enviorment_result, ensure_ascii=False)

    return enviorment_result

def queryEntertainment(range, user_lat, user_lng):

    entertain_shopping_mall_statement = f"""SELECT district, name, street, type, ST_distance_sphere( point({user_lng}, {user_lat}), point(`longitude`, `latitude`) )/1000 
    AS distance_in_KM FROM (SELECT * FROM `entertain_shopping_mall` NATURAL JOIN `entertain_shopping_mall_type`) AS temptable HAVING distance_in_KM <= {range} ORDER BY `distance_in_KM` ASC"""

    entertain_market_statement = f"""SELECT district, name, street, type, ST_distance_sphere( point({user_lng}, {user_lat}), point(`longitude`, `latitude`) )/1000 
    AS distance_in_KM FROM (SELECT * FROM `entertain_market` NATURAL JOIN `entertain_market_type`) AS temptable HAVING distance_in_KM <= {range} ORDER BY `distance_in_KM` ASC"""

    entertain_business_district_statement = f"""SELECT district, name, street, ST_distance_sphere( point({user_lng}, {user_lat}), point(`longitude`, `latitude`) )/1000 
    AS distance_in_KM FROM (SELECT * FROM `entertain_business_district`) AS temptable HAVING distance_in_KM <= {range} ORDER BY `distance_in_KM` ASC"""

    entertain_underground_market_statement = f"""SELECT district, name, street,  ST_distance_sphere( point({user_lng}, {user_lat}), point(`longitude`, `latitude`) )/1000 
    AS distance_in_KM FROM (SELECT * FROM `entertain_underground_market`) AS temptable HAVING distance_in_KM <= {range} ORDER BY `distance_in_KM` ASC"""

    conn.query(entertain_shopping_mall_statement)
    entertain_shopping_mall_result = conn.store_result().fetch_row(0, 1)

    conn.query(entertain_market_statement)
    entertain_market_result = conn.store_result().fetch_row(0, 1)

    conn.query(entertain_business_district_statement)
    entertain_business_district_result = conn.store_result().fetch_row(0, 1)

    conn.query(entertain_underground_market_statement)
    entertain_underground_market_result = conn.store_result().fetch_row(0, 1)

    #shopping_mall_result_keys = [key for key in entertain_shopping_mall_result[0]]
    #outlet_center_result_keys = [key for key in entertain_outlet_center_result[0]]
    #business_district_result_keys = [key for key in entertain_business_district_result[0]]
    #underground_market_result_keys = [key for key in entertain_underground_market_result[0]]
    #supermarket_result_keys = [key for key in entertain_supermarket_result[0]]

    entertain_shopping_mall = [[dicts[value].decode("utf-8") for value in dicts.keys()] for dicts in entertain_shopping_mall_result]
    entertain_market = [[dicts[value].decode("utf-8") for value in dicts.keys()] for dicts in entertain_market_result]
    entertain_business_district = [[dicts[value].decode("utf-8") for value in dicts.keys()] for dicts in entertain_business_district_result]
    entertain_underground_market = [[dicts[value].decode("utf-8") for value in dicts.keys()] for dicts in entertain_underground_market_result]

    """
    shopping_mall_result_values.insert(0, shopping_mall_result_keys)
    outlet_center_result_values.insert(0, outlet_center_result_keys)
    business_district_result_values.insert(0, business_district_result_keys)
    underground_market_result_values.insert(0, underground_market_result_keys)
    supermarket_result_values.insert(0, supermarket_result_keys)
    """
    entertain_result = {
        "shopping_mall": entertain_shopping_mall,
        "outlet": entertain_market,
        "business_district": entertain_business_district,
        "underground_market": entertain_underground_market,
        }
    
    #entertain_result_inJSON = json.dumps(entertain_result, ensure_ascii=False)

    return entertain_result


def queryPatFriendly(range, user_lat, user_lng):
    pet_clinic_statement = f"""SELECT district, name, street, ST_distance_sphere( point({user_lng}, {user_lat}), point(`longitude`, `latitude`) )/1000 
    AS distance_in_KM FROM (SELECT * FROM `pet_clinic`) AS temptable HAVING distance_in_KM <= {range} ORDER BY `distance_in_KM` ASC"""

    pet_hospital_statement = f"""SELECT district, name, street, ST_distance_sphere( point({user_lng}, {user_lat}), point(`longitude`, `latitude`) )/1000 
    AS distance_in_KM FROM (SELECT * FROM `pet_hospital`) AS temptable HAVING distance_in_KM <= {range} ORDER BY `distance_in_KM` ASC"""

    pet_park_statement = f"""SELECT district, name, street, ST_distance_sphere( point({user_lng}, {user_lat}), point(`longitude`, `latitude`) )/1000 
    AS distance_in_KM FROM (SELECT * FROM `pet_park`) AS temptable HAVING distance_in_KM <= {range} ORDER BY `distance_in_KM` ASC"""

    pet_resteruant_statement = f"""SELECT district, name, street, ST_distance_sphere( point({user_lng}, {user_lat}), point(`longitude`, `latitude`) )/1000 
    AS distance_in_KM FROM (SELECT * FROM `pet_resteruant`) AS temptable HAVING distance_in_KM <= {range} ORDER BY `distance_in_KM` ASC"""

    conn.query(pet_clinic_statement)
    pet_clinic_result = conn.store_result().fetch_row(0, 1)

    conn.query(pet_hospital_statement)
    pet_hospital_result = conn.store_result().fetch_row(0,1)

    conn.query(pet_park_statement)
    pet_park_result = conn.store_result().fetch_row(0, 1)

    conn.query(pet_resteruant_statement)
    pet_resteruant_result = conn.store_result().fetch_row(0, 1)

    #pet_clinic_result_keys = [key for key in pet_clinic_result[0]]
    #pet_park_result_keys = [key for key in pet_park_result[0]]
    #pet_resteruant_result_keys = [key for key in pet_resteruant_result[0]]

    pet_clinic = [[dicts[value].decode("utf-8") for value in dicts.keys()] for dicts in pet_clinic_result]
    pet_hospital = [[dicts[value].decode("utf-8") for value in dicts.keys()] for dicts in pet_hospital_result]
    pet_park = [[dicts[value].decode("utf-8") for value in dicts.keys()] for dicts in pet_park_result]
    pet_resteruant = [[dicts[value].decode("utf-8") for value in dicts.keys()] for dicts in pet_resteruant_result]

    """
    pet_clinic_result_values.insert(0, pet_clinic_result_keys)
    pet_park_result_values.insert(0, pet_park_result_keys)
    pet_resteruant_result_values.insert(0, pet_resteruant_result_keys)
    """

    pet_result = {
        "pet_park": pet_park,
        "pet_hospital": pet_hospital,
        "pet_clinic": pet_clinic,
        "pet_resteruant": pet_resteruant
        }

    #pet_result_inJSON = json.dumps(pet_result, ensure_ascii=False)

    return pet_result

def queryGarbageCar(range, user_lat, user_lng):
    statement = f"""SELECT village, time_arrived, time_depart, location, ST_distance_sphere( point({user_lng}, {user_lat}), point(`longitude`, `latitude`) )/1000 
    AS distance_in_KM FROM (SELECT * FROM `garbage_truck` NATURAL JOIN `garbage_truck_location`) AS temptable HAVING distance_in_KM <= {range} ORDER BY `distance_in_KM` ASC"""

    conn.query(statement)
    result = conn.store_result().fetch_row(0, 1)

    garbageCar = [[dicts[value].decode("utf-8") for value in dicts.keys()] for dicts in result]

    garbageCar_result = {
        "garbage_car": garbageCar
    }

    return garbageCar_result

def queryTotal():
    entertain_statement = f"""SELECT SUM(market*2 + mall*4 + business*3 + under*1) AS total FROM (SELECT 
	(SELECT COUNT(*) FROM `entertain_market`) AS market,
    (SELECT COUNT(*) FROM `entertain_shopping_mall`) AS mall,
    (SELECT COUNT(*) FROM `entertain_business_district`) AS business,
    (SELECT COUNT(*) FROM `entertain_underground_market`) AS under) as result"""

    traffic_statement = f"""SELECT SUM(busstop*0.5 + youbike*1.5 + metro*2 + train*3 + rail*3) AS total FROM (SELECT 
	(SELECT COUNT(*) FROM `traffic_busstop`) AS busstop,
    (SELECT COUNT(*) FROM `traffic_youbike_station`) AS youbike,
    (SELECT COUNT(*) FROM `traffic_metro_station_info`) AS metro,
    (SELECT COUNT(*) FROM `traffic_train_station`) AS train,
    (SELECT COUNT(*) FROM `traffic_highspeedrail_station`) AS rail) as result"""

    activity_statement = f"""SELECT SUM(center*2 + gym*4 + park*4) AS total FROM (SELECT 
	(SELECT COUNT(*) FROM `sport_activity_center`) AS center,
    (SELECT COUNT(*) FROM `sport_gym`) AS gym,
    (SELECT COUNT(*) FROM `sport_riverside_park`) AS park) as result"""

    catering_statement = f"""SELECT SUM(green*3 + night*7) AS total FROM (SELECT 
	(SELECT COUNT(*) FROM `meal_green_resteruant`) AS green,
    (SELECT COUNT(*) FROM `meal_night_market`) AS night) as result"""

    enviorment_statement = f"""SELECT SUM(park*8 + tree*2) AS total FROM (SELECT 
	(SELECT COUNT(*) FROM `enviorment_park`) AS park,
    (SELECT COUNT(*) FROM `enviorment_sidewalk_tree`) AS tree) as result"""

    medical_statement = f"""SELECT SUM(clinic*0.5 + hospital*6) AS total FROM (SELECT 
    (SELECT COUNT(*) FROM `medical_clinic_info`) AS clinic, 
    (SELECT COUNT(*) FROM `medical_hospital`) AS hospital) as result"""

    pet_statement = f"""SELECT SUM(clinic*5 + park*3) AS total FROM (SELECT 
	(SELECT COUNT(*) FROM `pet_clinic`) AS clinic,
    (SELECT COUNT(*) FROM `pet_park`) AS park) as result"""

    secuity_statement = f"""SELECT COUNT(*) AS total FROM `case_location`"""

    conn.query(entertain_statement)
    entertain_result = conn.store_result().fetch_row()

    conn.query(traffic_statement)
    traffic_result = conn.store_result().fetch_row()

    conn.query(catering_statement)
    catering_result = conn.store_result().fetch_row()

    conn.query(activity_statement)
    activity_result = conn.store_result().fetch_row()

    conn.query(enviorment_statement)
    enviorment_result = conn.store_result().fetch_row()

    conn.query(medical_statement)
    medical_result = conn.store_result().fetch_row()

    conn.query(pet_statement)
    pet_result = conn.store_result().fetch_row()

    conn.query(secuity_statement)
    secuity_result = conn.store_result().fetch_row()

    entertain_count = ""
    traffic_count = ""
    catering_count = ""
    activity_count = ""
    enviorment_count = ""
    medical_count = ""
    pet_count = ""
    secuity_count = ""

    for value in entertain_result:
        entertain_count = value[0].decode("utf-8")
    
    for value in traffic_result:
        traffic_count = value[0].decode("utf-8")
    
    for value in catering_result:
        catering_count = value[0].decode("utf-8")
    
    for value in activity_result:
        activity_count = value[0].decode("utf-8")
    
    for value in enviorment_result:
        enviorment_count = value[0].decode("utf-8")

    for value in medical_result:
        medical_count = value[0].decode("utf-8")
    
    for value in pet_result:
        pet_count = value[0].decode("utf-8")

    for value in secuity_result:
        secuity_count = value[0].decode("utf-8")

    return {
        "entertain": entertain_count,
        "traffic": traffic_count,
        "catering": catering_count,
        "activity": activity_count,
        "enviorment": enviorment_count,
        "medical": medical_count,
        "pet": pet_count,
        "security": secuity_count
        }

def report(district, category, type, address, remark_with_underline):
    remark = remark_with_underline.replace("_", " ")

    statement = f"""INSERT INTO `report` VALUES (
        NULL, '{district}', '{category}', '{type}', '{address}', '{remark}', CURRENT_TIMESTAMP)"""

    conn.query(statement)

def getReport_old(category, type):
    all_statement = f"""SELECT * FROM `report`"""
    category_statement = f"""SELECT * FROM `report` WHERE category = {category}"""
    type_statement = f"""SELECT * FROM `report` WHERE type = {type}"""
    advice_statement = f"""SELECT * FROM `report` WHERE category = {category} AND type {type}"""    

    if category and type:
        conn.query(advice_statement)
        result = conn.store_result().fetch_row(0, 1)
    elif category and not type:
        conn.query(category_statement)
        result = conn.store_result().fetch_row(0, 1)
    elif not category and type:
        conn.query(type_statement)
        result = conn.store_result().fetch_row(0, 1)
    else:
        conn.query(all_statement)
        conn.store_result().fetch_row(0, 1)
    
    report_result = []
    
    for value in result:
        report_result.append(value[0].decode("utf-8"))
    
    return report_result

def getReport():
    all_statement = f"""SELECT * FROM `report`"""

    conn.query(all_statement)
    result = conn.store_result().fetch_row(0, 1)
    
    report_result = [[dicts[value].decode("utf-8") for value in dicts.keys()] for dicts in result]
    
    return json.dumps(report_result, ensure_ascii=False)

def modifyDB(type, primary_key):
    if type == "report":
        statement = f"""DELETE FROM `report` WHERE `report`.`id` = '{primary_key}'"""
        conn.query(statement)

def add(type, category, district, street, name):
    conn.query("SELECT *, ST_distance_sphere( point(121.4929509, 25.0352578), point(`longitude`, `latitude`) )/1000 AS distance_in_KM FROM (SELECT * FROM `medical_clinic_info` NATURAL JOIN `medical_clinic_category` WHERE category = '中醫') AS temptable HAVING distance_in_KM <= 1.00")
    result = conn.store_result().fetch_row(0, 1)

    test_result = [[dicts[value].decode("utf-8") for value in dicts.keys()] for dicts in result]

    return json.dumps([len(test_result)], ensure_ascii=False)

def modify(type, category, district, street, name):
    if (category == "traffic"):
        if (type == "busstop"):
            statement = f"""INSERT INTO `traffic_busstop` VALUES (
                '{name}', NULL, NULL"""
        elif (type == "metro"):
            statement = f"""INSERT INTO `traffic_metro_station_info` VALUES (
                NULL, '{name}', NULL, NULL, '{street}', '{district}'"""
        elif (type == "train"):
            statement = f"""INSERT INTO `traffic_train_station` VALUES (
                NULL, '{name}', '{district}', NULL, NULL, '{street}'"""
        elif (type == "highspeedrail"):
            statement = f"""INSERT INTO `traffic_highspeedrail` VALUES (
                NULL, '{name}', '{district}', NULL, NULL, '{street}'"""
        elif (type == "YouBike"):
            statement = f"""INSERT INTO `traffic_youbike_station` VALUES (
                NULL, '{name}', '{district}', NULL, NULL, '{street}'"""
    elif (category == "catering"):
        if (type == "green_resteruant"):
            statement = f"""INSERT INTO `meal_green_resteruant` VALUES (
                NULL, '{name}', NULL, NULL, '{district}', '{street}'"""
        elif (type == "night_market"):
            statement
    elif (category == "medical"):
        if (type == "hospital"):
            statement = f"""INSERT INTO `medical_hospital` VALUES (
                NULL, '{name}', NULL, NULL, '{district}', '{street}'"""
        elif (type == "clinic"):
            statement = f"""INSERT INTO `medical_clinic_info` VALUES (
                NULL, '{name}', {street}, '{district}', NULL, NULL"""
    elif (category == "enviorment"):
        statement = f"""INSERT INTO `enviorment_park` VALUES (
            NULL, '{name}', NULL, NULL, '{district}', '{street}'"""
        conn.query(statement)

def delete(type, category, district, street, name):
    conn.query()
    return




"""
pet_clinic_result_values = []
    pet_park_result_values = []
    pet_resteruant_result_values = []

    for dicts in pet_clinic_result:
        for value in dicts.values():
            pet_clinic_result_values.append(value.decode("utf-8"))

    for dicts in pet_park_result:
        for value in dicts.values():
            pet_park_result_values.append(value.decode("utf-8"))
    
    for dicts in pet_resteruant_result:
        for value in dicts.values():
            pet_resteruant_result_values.append(value.decode("utf-8"))
"""