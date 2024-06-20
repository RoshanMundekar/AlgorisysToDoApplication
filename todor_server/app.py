from flask import Flask,request,jsonify
import pymysql
from flask_cors import CORS
from werkzeug.utils import secure_filename
import os
import json
from datetime import datetime 
from werkzeug.security import generate_password_hash
import random
import threading
lock = threading.Lock()



app = Flask(__name__)

UPLOAD_FOLDER = 'static/files/'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

CORS(app)
app.secret_key = 'any random string'

def dbConnection():
    try:
        connection = pymysql.connect(host="localhost", user="root", password="root", database="todoer")
        return connection
    except:
        print("Something went wrong in database Connection")

def dbClose():
    try:
        dbConnection().close()
    except:
        print("Something went wrong in Close DB Connection")

con = dbConnection()
cursor = con.cursor()

"----------------------------------------------------------------------------------------------------"

@app.route('/userRegister', methods=['GET', 'POST'])
def userRegister():
    print("----------------")
    if request.method == 'POST':
        data = request.get_json()
        # print(data)
        email = data.get('email')
        username = data.get('username')
        password = data.get('password')
        
        # Generate hash of password
        hashed_password = generate_password_hash(password)
        # print(hashed_password)
        # print(email)
        # print(username)
        # print(password)
     
        cursor.execute('SELECT * FROM register WHERE Username = %s AND email = %s', (username,email))
        count = cursor.rowcount
        if count == 1:        
            return "fail"
        else:
            sql1 = "INSERT INTO register(Username, email, password,password_hash) VALUES (%s, %s, %s, %s);"
            val1 = (username, email,password, hashed_password)
            cursor.execute(sql1,val1)
            con.commit()
            return "success"
    return "fail"

@app.route('/userLogin', methods=['GET', 'POST'])
def userLogin():
    if request.method == 'POST':
        data = request.get_json()
        
        email = data.get('email')
        password = data.get('password')
        
        lock.acquire()
        cursor.execute('SELECT * FROM register WHERE email = %s AND password = %s ', (email, password))
        count = cursor.rowcount
        lock.release()
        if count > 0:    
            row = cursor.fetchone()      
            jsonObj = json.dumps(row)
            
            print(type(jsonObj))
            return jsonObj
            
        else:
            return "fail"
    return "fail"


@app.route('/addtodo', methods=['GET', 'POST'])
def addtodo():
    if request.method == 'POST':
        data = request.get_json()
        print(data)
        input_todo = data.get('input_todo')
        input_user_id = data.get('input_user')
        bookmarked = False
        status = "In-progress"
        category_id = random.randint(100, 1000)
        
        cursor.execute('SELECT * FROM todolist WHERE title = %s', (input_todo))
        count = cursor.rowcount
        if count == 1:        
            return "fail"
        else:
            sql1 = "INSERT INTO todolist(User_id, category_id, title,status,bookmarked) VALUES (%s, %s, %s, %s, %s);"
            val1 = (input_user_id, category_id,input_todo, status,bookmarked)
            cursor.execute(sql1,val1)
            con.commit()
            return "success"
    return "fail"


@app.route('/gettodos/user', methods=['GET'])
def gettodos():
    user_id = request.args.get('user_id')
    cursor.execute('SELECT * FROM todolist WHERE User_id = %s', (user_id))
    rows = cursor.fetchall()
    print(rows)
    jsonObj = json.dumps(rows)
    print(type(jsonObj))
    return jsonObj
  
@app.route('/deleteTodo', methods=['GET', 'POST'])
def deleteTodo():
    if request.method == 'POST':
        data = request.get_json()
        
        idoftodo = data.get('idoftodo')   

        sql11 = 'DELETE FROM todolist WHERE Id = %s;'
        val11 = (idoftodo)
        cursor.execute(sql11,val11)
        con.commit() 
        return "success"    
    return "fail"

@app.route('/changeStatusTodo', methods=['GET', 'POST'])
def changeStatusTodo():
    if request.method == 'POST':
        data = request.get_json()
        
        idoftodo = data.get('idoftodo')
        status = data.get('status')   

        sql11 = 'UPDATE todolist SET status = %s WHERE id = %s;'
        val11 = (status,idoftodo)
        cursor.execute(sql11,val11)
        con.commit() 
        return "success"    
    return "fail"

@app.route('/update_todo', methods=['PUT'])
def update_todo():
    data = request.get_json()
    todo_id = data['id']
    new_status = data['status']
    
    with con.connect() as connection:
       result = connection.execute(("SELECT * FROM todolist WHERE Id = :id"), {'Id': todo_id})
       todo = result.fetchone()

       if not todo:
           return jsonify({'error': 'Todo not found'}), 404

       connection.execute(("UPDATE todolist SET status = :status WHERE id = :id"),
           {'status': new_status, 'id': todo_id}
       )
    
    return jsonify({'message': 'Todo status updated successfully'})


    
# @app.route('/favtodo', methods=['GET', 'POST'])
# def favtodo():
#     if request.method == 'POST':
#         data = request.get_json()
        
#         idoftodo = data.get('idoftodo')
#         bookmarked = True
    

#         sql11 = 'UPDATE todolist SET bookmarked = %s WHERE id = %s;'
#         val11 = (bookmarked,idoftodo)
#         cursor.execute(sql11,val11)
#         con.commit() 
#         return "success"    
#     return "fail"
 

@app.route('/favtodo', methods=['POST'])
def favtodo():
    if request.method == 'POST':
        data = request.get_json()
        idoftodo = data.get('idoftodo')
        
        # Retrieve the current bookmarked status
        cursor.execute('SELECT bookmarked FROM todolist WHERE id = %s;', (idoftodo,))
        result = cursor.fetchone()
        
        if result is None:
            return jsonify({"error": "Todo item not found"}), 404
        
        current_status = result[0]
        
        # Toggle the bookmarked status
        new_status = not current_status
        
        # Update the new status in the database
        cursor.execute('UPDATE todolist SET bookmarked = %s WHERE id = %s;', (new_status, idoftodo))
        con.commit()
        
        return "success"    
    return "fail"

@app.route('/getfav/user', methods=['GET'])
def getfav():
    user_id = request.args.get('user_id')
    bookmarked =True
    cursor.execute('SELECT * FROM todolist WHERE User_id = %s and bookmarked = %s', (user_id,bookmarked))
    rows = cursor.fetchall()
    print(rows)
    jsonObj = json.dumps(rows)
    print(type(jsonObj))
    return jsonObj


@app.route('/addcategory', methods=['POST'])
def addcategory():
    if request.method == 'POST':
        name = request.form.get('name')
        newtask = request.form.get('newtask')
        category_id = request.form.get('Categoryid')
        user_id = request.form.get('Userid')
        todo_id = request.form.get('todo_id')
        print(name)
        print(category_id)
        status = "In-progress"
        cursor.execute('SELECT * FROM subtask WHERE newtask = %s', (newtask))
        count = cursor.rowcount
        if count == 1:        
            return "fail"
        
        else:
            sql1 = "INSERT INTO subtask(user_id,todo_id, category_id, title,newtask,staus) VALUES (%s, %s, %s, %s, %s, %s);"
            val1 = (user_id,todo_id, category_id,name,newtask, status)
            cursor.execute(sql1,val1)
            con.commit()
            return "success"
        return "fail"
    
    
@app.route('/getcatgory/user', methods=['GET'])
def getcatgory():
    userId = request.args.get('user_id')
    todoid = request.args.get('todoid')
    categoryId = request.args.get('categoryId')
    
    print(userId)
    print(categoryId)
    
    cursor.execute('SELECT * FROM subtask WHERE user_id = %s and category_id = %s and todo_id = %s', (int(userId),int(categoryId),int(todoid)))
    rows = cursor.fetchall()
    
    print(rows)

    jsonObj = json.dumps(rows)
    print(type(jsonObj))
    return jsonObj
    
  
@app.route('/deleteTodocat', methods=['GET', 'POST'])
def deleteTodocat():
    if request.method == 'POST':
        data = request.get_json()
        
        idoftodo = data.get('idoftodo')   

        sql11 = 'DELETE FROM subtask WHERE id = %s;'
        val11 = (idoftodo)
        cursor.execute(sql11,val11)
        con.commit() 
        return "success"    
    return "fail"

@app.route('/changeTodocat', methods=['GET', 'POST'])
def changeTodocat():
    if request.method == 'POST':
        data = request.get_json()
        
        idoftodo = data.get('idoftodo')
        status = data.get('status')   
        print(idoftodo)
        print(status)

        sql11 = 'UPDATE subtask SET staus = %s WHERE id = %s;'
        val11 = (status,idoftodo)
        cursor.execute(sql11,val11)
        con.commit() 
        return "success"    
    return "fail"


    

if __name__ == "__main__":
    app.run("0.0.0.0")
    
    
