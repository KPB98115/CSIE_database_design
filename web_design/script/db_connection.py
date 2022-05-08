from MySQLdb import _mysql

host = 'localhost'
username = 'root'
password = '12345678'
database = 'test'

conn = _mysql.connect(host, username, password, database)

conn.query("""select * from `table 1`""")
result = conn.use_result().fetch_row()
print(result[0][0].decode("UTF-8"))