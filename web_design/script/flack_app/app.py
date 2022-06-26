import flask
from flask import request, render_template, request_started, url_for
from flask_cors import cross_origin
import connection
import json

app = flask.Flask(__name__)
app.config["DEBUG"] = True
app.config["JSON_AS_ASCII"] = False
#temp
ALLOWED_EXTENSIONS = set(["png", "jpg","jpeg"])

app.config["UPLOAD_FOLDER"] = "./image"
app.config["MAX_CONTENT_LENGTH"] = 16 * 1024 * 1024

@app.route("/index", methods=["GET"])
def homepage():
    return render_template("index.html")

@app.route("/report", methods=["GET"])
def reportPage():
    return render_template("report.html")

@app.route("/admin", methods=["GET"])
def adminPage():
    return render_template("admin.html")

@app.route("/receive", methods=["GET"])
@cross_origin(allow_headers=["content-type"]) #"authentication"
def receive():
    if "district" in request.args:
        district = request.args["district"]
    else:
        return "Error: incorrect district."
    
    if "category" in request.args:
        category = request.args["category"]
    else:
        return "Error, incorrect category"

    if "type" in request.args:
        type = request.args["type"]
    else: 
        return "Error, incorrect type."
    
    if "address" in request.args:
        address = request.args["address"]
    else:
        return "Error, incorrect address."

    if "remark" in request.args:
        remark = request.args["remark"]
    else:
        return "Error, incorrect remark."
    
    connection.report(district, category, type, address, remark)

    return "request accepted"

@app.route("/getreport", methods=["GET"])
@cross_origin(allow_headers=["content-type"]) #"authentication"
def sendReport():
    result = connection.getReport()

    return result

@app.route("/modify1", methods=["GET"])
@cross_origin(allow_headers=["content-type"]) #"authentication"
def modify1():
    if "type" in request.args:
        connection.modifyDB("report", request.args["rowID"])
        return "request accepted"
    else:
        return "Error, incorrect report."

@app.route("/query", methods=["GET"])
@cross_origin(allow_headers=["content-type"]) #"authentication"
def query():
    if "district" in request.args:
        district = request.args["district"]
    else:
        return "Error: incorrect district, please enter again."
    
    if "street" in request.args:
        street = request.args["street"]
    else:
        return "Error: incorrect street, please enter again."
    
    if "number" in request.args:
        number = request.args["number"]
    else:
        return "Error: incorrect district, please enter again."
    
    if "range" in request.args:
        range = request.args["range"]
    else:
        return "Error: incorrect range, please enter again."

    if "village" in request.args:
        village = request.args["village"]
    
    if "type_filter" in request.args:
        filter = request.args["filter"]
        if "filter_district" in request.args:
            filter_district = request.args["filter_district"]
            result = connection.queryResult(district, street+number, range, filter, filter_district)
        elif "filter_facility" in request.args:
            filter_facility = request.args["filter_facility"]
            result = connection.queryResult(district, street+number, range, filter, filter_facility)

    return result

@app.route("/query/getall", methods=["GET"])
@cross_origin(allow_headers=["content-type"]) #"authentication"
def queryGetAll():
    if "district" in request.args:
        district = request.args["district"]
    else:
        return "Error: incorrect district, please enter again."
    
    if "street" in request.args:
        street = request.args["street"]
    else:
        return "Error: incorrect street, please enter again."
    
    if "number" in request.args:
        number = request.args["number"]
    else:
        return "Error: incorrect district, please enter again."
    
    if "range" in request.args:
        range = request.args["range"]
    else:
        return "Error: incorrect range, please enter again."
    
    result = connection.queryAllResult(district, street+number, range)

    return result

@app.route("/query/address", methods=["GET"])
@cross_origin(allow_headers=["content-type"]) #"authentication"
def address():
    result = connection.address()
    return result

@app.route("/query/facility", methods=["GET"])
@cross_origin(allow_headers=["content-type"]) #"authentication"
def facility():
    result = connection.facility()
    return result


@app.route("/query/add", methods=["GET"])
def add():
    if "district" in request.args:
        district = request.args["district"]
    
    if "street" in request.args:
        street = request.args["street"]
    
    if "name" in request.args:
        name = request.args["name"]

    if "type" in request.args:
        type = request.args["type"]

    connection.add(type, district, street, name)

    print("Flag")

    return "done"

@app.route("/query/modify", methods=["GET"])
def modify():
    if "district" in request.args:
        district = request.args["district"]
    
    if "street" in request.args:
        street = request.args["street"]
    
    if "name" in request.args:
        name = request.args["name"]

    if "type" in request.args:
        type = request.args["type"]

    connection.modify(type, district, street, name)

    return "done"

@app.route("/query/delete", methods=["GET"])
def delete():
    if "district" in request.args:
        district = request.args["district"]
    
    if "street" in request.args:
        street = request.args["street"]
    
    if "name" in request.args:
        name = request.args["name"]

    if "type" in request.args:
        type = request.args["type"]

    connection.delete(type, district, street, name)

    return "done"

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=80, debug=True)