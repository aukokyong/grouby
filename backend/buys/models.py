from django.db import models

# Create your models here.


class Buy(models.Model):
    title = models.CharField(max_length=100, blank=False)
    description = models.CharField(max_length=1000, blank=False)
    closing_date = models.DateField()
    collection_date = models.DateField()
    created = models.DateTimeField(auto_now_add=True)
    host = models.ForeignKey(
        'auth.User', related_name='buys', on_delete=models.CASCADE)


class Item(models.Model):
    title = models.CharField(max_length=100, blank=False)
    description = models.CharField(max_length=1000, blank=False)
    sku = models.CharField(max_length=50)
    price = models.IntegerField()
    created = models.DateTimeField(auto_now_add=True)
    buy = models.ForeignKey(
        Buy, related_name='items', on_delete=models.CASCADE)
