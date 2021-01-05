from django.http import JsonResponse
from .extras import checkLogin,getToDoList
from .models import User , ToDoModel
from .serializers import UserSerializer
from rest_framework.decorators import api_view
from dateutil.parser import parse
from datetime import datetime
# Create your views here.

@api_view(['POST'])
def user_add(request):
    try:
        user = User(user_firstname=request.data['user_firstname'],user_lastname=request.data['user_lastname']
                ,user_email=request.data['user_email'],user_password=request.data['user_password'])
    except:
        return JsonResponse({"error":"some field missing"})
    try:
        user.save()
    except:
        return JsonResponse({"error":"email already exist"})
    data=UserSerializer(user)
    return JsonResponse(data.data)

@api_view(['POST'])
def user_login(request):
    try:
        isLogin,user = checkLogin(request.data['user_email'],request.data['user_pass'])
    except:
        return JsonResponse({"error":"give email and password"})
    if isLogin:
        userData = UserSerializer(user)
        return JsonResponse(userData.data)
    else:
        return JsonResponse({"error":"user not found"})

@api_view(['POST'])
def reset_password(request):
    try:
        isLogin,user = checkLogin(request.data['user_email'],request.data['old_pass'])
    except:
        return JsonResponse({"error":"give email and password"})
    if isLogin:
        user.user_password = request.data['new_pass']
        user.save()
        return JsonResponse({'success':'Password Change Successfully'})
    else:
        return JsonResponse({"error":"old email and password wrong"})


@api_view(['POST'])
def get_todo_list(request):
    try:
        isLogin,user = checkLogin(request.data['user_email'],request.data['user_pass'])
    except:
        return JsonResponse({"error":"give email and password"})
    if isLogin:
        todo_list = getToDoList(user)
        if isinstance(todo_list,dict):
            return JsonResponse(todo_list)
        else:
            return JsonResponse(todo_list,safe=False)
    else:
        return JsonResponse({"error":"login first"})


@api_view(['POST'])
def add_todo(request):
    try:
        isLogin,user = checkLogin(request.data['user_email'],request.data['user_pass'])
    except:
        return JsonResponse({"error":"give email and password"})
    if isLogin:
        try:
            todo = ToDoModel(userId=user.userId,toDo=request.data['todo'])
            todo.save()
        except:
            return JsonResponse({"error":" please provide all parameters"})
        return JsonResponse(getToDoList(user),safe=False)
    else:
        return JsonResponse({"error":"user not found"})

@api_view(['POST'])
def remove_todo(request):
    try:
        isLogin,user = checkLogin(request.data['user_email'],request.data['user_pass'])
    except:
        return JsonResponse({"error":"give email and password"})
    if isLogin:
        try:
            todo = ToDoModel.objects.get(userId=user.userId,toDoId=request.data['toDoId'])
            todo.delete()
            todo_list = getToDoList(user)
            if isinstance(todo_list, dict):
                return JsonResponse(todo_list)
            else:
                return JsonResponse(todo_list, safe=False)
        except ToDoModel.DoesNotExist:
           return JsonResponse({"error": "not found or already deleted"})
        except:
            return JsonResponse({"error":"give all parameters please"})
    else:
        return JsonResponse({"error":"user not found"})