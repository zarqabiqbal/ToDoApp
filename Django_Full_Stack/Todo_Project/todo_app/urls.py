from django.urls import path
from  todo_app import views

urlpatterns = [
    path('',views.LoginHomeView.as_view(),name='home'),
    path('login',views.LoginHomeView.as_view(),name='login'),
    path('signup',views.SignUpView.as_view(),name='signup'),
    path('logout', views.LogoutView.as_view(), name='logout'),
    path('add_todo',views.AddTodoView.as_view(),name='add_todo'),
    path('remove_todo', views.RemoveTodoView.as_view(), name='remove_todo'),
    path('forget_password',views.ForgetPasswordView.as_view(),name='forget_password')
]

