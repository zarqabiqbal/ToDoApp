from django.db import models
# Create your models here.
class User(models.Model):
    userId = models.AutoField(primary_key=True)
    user_firstname = models.CharField(max_length = 50)
    user_lastname = models.CharField(max_length = 50)
    user_email = models.EmailField(max_length = 50,unique=True)
    user_password = models.CharField(max_length=50)
    class Meta:
        unique_together = (('userId','user_email'),)
        db_table = "user_details"

class ToDoModel(models.Model):
    toDoId = models.AutoField(primary_key=True)
    userId = models.CharField(max_length=50)
    toDo = models.CharField(max_length=500)
    timing = models.DateTimeField(auto_now=True)
    class Meta:
        db_table = "user_todo"
