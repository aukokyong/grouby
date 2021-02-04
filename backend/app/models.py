from django.db import models

# Create your models here.
class Host(models.Model):
    name = models.CharField(max_length=50)
    mobile_num = models.IntegerField()
    email = models.EmailField(max_length=100)
    password=models.CharField(max_length=200)

    def __str__(self):
        return self.name