from MySQLdb import _mysql
from MySQLdb import Error

def localDistrict(addr):
    start = addr.find("市")+1
    end = addr.find("區")+1

    return ''.join([char for char in addr])[start : end]

def localStreet(addr):
    start = addr.find("區")+1
    end = addr.find("號")+1

    return ''.join([char for char in addr])[start : end]

#initiate database configuration
host = 'localhost'
username = 'root'
password = '12345678'
database = 'test'

table = "garbage_truck_location"
primary_key_atr = ["地點","經度","緯度"]
row_count = 4069

conn = _mysql.connect(host, username, password, database)

#fetch data from databse
conn.query("""SELECT 地點, 緯度, 經度 FROM `garbage_truck_location` """)
result = conn.store_result().fetch_row(row_count)

#processing data
for row in range(row_count):
    location = result[row][0].decode("UTF-8")
    lat = result[row][1].decode("UTF-8")
    log = result[row][2].decode("UTF-8")
    #district = localDistrict(location)
    street = localStreet(location)
    conn.query(f"UPDATE `garbage_truck_location` SET `街道` = '{street}' WHERE `garbage_truck_location`.`地點` = '{location}' AND CONCAT(`garbage_truck_location`.`緯度`) = '{lat}' AND CONCAT(`garbage_truck_location`.`經度`) = '{log}'; ")

conn.close()
