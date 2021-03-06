# Generated by Django 3.1.5 on 2021-01-05 04:50

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='ToDoModel',
            fields=[
                ('toDoId', models.AutoField(primary_key=True, serialize=False)),
                ('userId', models.CharField(max_length=50)),
                ('toDo', models.CharField(max_length=500)),
                ('timing', models.DateTimeField()),
            ],
            options={
                'db_table': 'user_todo',
            },
        ),
        migrations.CreateModel(
            name='User',
            fields=[
                ('userId', models.AutoField(primary_key=True, serialize=False)),
                ('user_firstname', models.CharField(max_length=50)),
                ('user_lastname', models.CharField(max_length=50)),
                ('user_email', models.EmailField(max_length=50, unique=True)),
                ('user_password', models.CharField(max_length=50)),
            ],
            options={
                'db_table': 'user_details',
                'unique_together': {('userId', 'user_email')},
            },
        ),
    ]
