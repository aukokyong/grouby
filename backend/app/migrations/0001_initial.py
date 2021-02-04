# Generated by Django 3.1.6 on 2021-02-04 04:44

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Host',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
                ('mobile_num', models.IntegerField(max_length=8)),
                ('email', models.EmailField(max_length=100)),
            ],
        ),
    ]
