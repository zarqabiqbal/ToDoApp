from .models import User,ToDoModel
from .serializers import UserSerializer , ToDoSerializer

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
        return {"error": "no friends of this user"}
    todo_list=list()
    for to_do in todo:
        todo_list.append(ToDoSerializer(to_do).data)
    return todo_list
