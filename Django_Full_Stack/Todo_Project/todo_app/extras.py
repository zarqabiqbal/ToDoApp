from .models import User,ToDoModel
from .serializers import UserSerializer , ToDoSerializer
from dateutil.parser import parse

def checkLogin(email,password):
    try:
        user = User.objects.get(user_email=email, user_password=password)
    except User.DoesNotExist:
        return False,None
    return True,user

def getToDoList(user):
    try:
        todo = list(ToDoModel.objects.filter(userId=user.userId).order_by("-timing").distinct())
    except ToDoModel.DoesNotExist:
        return {"error": "No todo list of this user"}
    todo_list=list()
    for to_do in todo:
        data = ToDoSerializer(to_do).data
        data['timing'] = parse(data.get('timing')).strftime('%d %b, %Y, %H:%M%p')
        todo_list.append(data)
    return todo_list
