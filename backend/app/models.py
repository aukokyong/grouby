from django.db import models

# Create your models here.
class Host(models.Model):
    name = models.CharField(max_length=50)
    mobile_num = models.IntegerField(max_length=8)
    email = models.EmailField(max_length=100)