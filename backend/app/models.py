from django.db import models
from django.contrib.auth.models import AbstractUser

from .managers import CustomUserManager

# Create your models here.
class Host(models.Model):
    name = models.CharField(max_length=50)
    mobile_num = models.IntegerField()
    email = models.EmailField(max_length=100)
    password=models.CharField(max_length=200)

    def __str__(self):
        return self.name

# class HostUser(AbstractUser):
#     # this removes the username field:
#     username = None
#     email = models.EmailField(max_length=100, unique=True)

#     USERNAME_FIELD = 'email'
#     REQUIRED_FIELDS = []

#     objects = CustomUserManager()

#     mobile_num = models.IntegerField(unique=True, blank=False)

#     def __str__(self):
        return self.email
