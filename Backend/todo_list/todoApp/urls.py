from django.urls import path
from todoApp import views
from django.urls import re_path
from django.views.generic import TemplateView

urlpatterns = [
    path('user_login', views.user_login, name='user_login'),
    path('user_add', views.user_add, name='user_add'),
    path('reset_password', views.reset_password, name='reset_password'),
    path('user_todo', views.get_todo_list, name='user_todo'),
    path('add_todo', views.add_todo, name='add_todo'),
    path('remove_todo', views.remove_todo, name='remove_todo'),
    re_path(r'^$',TemplateView.as_view(template_name='index.html')),
]