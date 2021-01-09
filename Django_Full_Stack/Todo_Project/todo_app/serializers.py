from  rest_framework import  serializers
from .models import User,ToDoModel

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('userId', 'user_firstname','user_lastname',
                  'user_email','user_password')
        extra_kwargs = {'user_password': {'write_only': True}}

class ToDoSerializer(serializers.ModelSerializer):
    class Meta:
        model = ToDoModel
        fields = ['toDoId','toDo','timing']
