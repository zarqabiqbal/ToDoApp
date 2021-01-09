from .extras import checkLogin,getToDoList
from .models import User , ToDoModel
from django.shortcuts import render , redirect
from django.views import View
from django.http import JsonResponse
# Create your views here.

class LoginHomeView(View):
    def post(self,request):
        isLogin, user = checkLogin(request.POST['user_email'], request.POST['user_pass'])
        if isLogin:
            request.session['user_id'] = user.userId
            todo_list = getToDoList(user)
            return render(request, 'user_home.html', {'fname': user.user_firstname, 'todoList': todo_list})
        else:
            return render(request, 'login.html', {'login_color': 'bg-light', 'error': 'user not found'})
    def get(self,request):
        if request.session.get("user_id", "") == "":
            return render(request, 'login.html', {'login_color': 'bg-light'})
        else:
            user = User.objects.get(userId=request.session.get("user_id", ""))
            todo_list = getToDoList(user)
            return render(request, 'user_home.html', {'fname': user.user_firstname, 'todoList': todo_list})


class SignUpView(View):
    def post(self,request):
        user = User(user_firstname=request.POST['user_firstname'], user_lastname=request.POST['user_lastname']
                    , user_email=request.POST['user_email'], user_password=request.POST['user_password'])
        try:
            user.save()
        except:
            return render(request, 'signup.html', {"error": "email already exist"})
        request.session['user_id'] = user.userId
        todo_list = getToDoList(user)
        return render(request, 'user_home.html', {'fname': user.user_firstname, 'todoList': todo_list})

    def get(self,request):
        if request.session.get("user_id", "") == "":
            return render(request, 'signup.html', {'signup_color': 'bg-light'})
        else:
            user = User.objects.get(userId=request.session.get("user_id", ""))
            todo_list = getToDoList(user)
            return render(request, 'user_home.html', {'fname': user.user_firstname, 'todoList': todo_list})


class ForgetPasswordView(View):
    def get(self,request):
        if request.session.get("user_id", "") == "":
            return render(request, 'login.html', {'login_color': 'bg-light'})
        else:
            return render(request,'forget_password.html')
    def post(self,request):
        user = User.objects.get(userId=request.session.get("user_id", ""))
        user.user_password = request.POST['new_password']
        user.save()
        return render(request,'forget_password.html',{'success': 'Password Change Successfully'})


class LogoutView(View):
    def get(self,request):
        if request.session.get("user_id", "") == "":
            return render(request, 'login.html', {'login_color': 'bg-light'})
        else:
            del request.session['user_id']
            return render(request, 'login.html', {'login_color': 'bg-light'})


class AddTodoView(View):
    def post(self,request):
        user = User.objects.get(userId=request.session.get("user_id", ""))
        todo = ToDoModel(userId=user.userId, toDo=request.POST['todo'])
        todo.save()
        todo_list = getToDoList(user)
        return render(request, 'user_home.html', {'fname': user.user_firstname, 'todoList': todo_list})


class RemoveTodoView(View):
    def post(self,request):
        user = User.objects.get(userId=request.session.get("user_id", ""))
        try:
            todo = ToDoModel.objects.get(userId=user.userId, toDoId=request.POST['toDoId'])
            todo.delete()
            todo_list = getToDoList(user)
        except ToDoModel.DoesNotExist:
            todo_list = getToDoList(user)
        return render(request, 'user_home.html', {'fname': user.user_firstname, 'todoList': todo_list})