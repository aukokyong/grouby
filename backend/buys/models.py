from django.db import models
from django.db.models.deletion import CASCADE

# Create your models here.


class Buy(models.Model):
    title = models.CharField(max_length=100, blank=False)
    description = models.CharField(max_length=1000, blank=False)
    closing_date = models.DateField()
    collection_date = models.DateField()
    created = models.DateTimeField(auto_now_add=True)
    host = models.ForeignKey(
        'auth.User', related_name='buys', on_delete=models.CASCADE)

    def __str__(self):
        return f"Buy ID {self.id}"


class Item(models.Model):
    title = models.CharField(max_length=100, blank=False)
    description = models.CharField(max_length=1000, blank=False)
    sku = models.CharField(max_length=50)
    price = models.IntegerField()
    created = models.DateTimeField(auto_now_add=True)
    buy = models.ForeignKey(
        Buy, related_name='items', on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.title}"


class Order(models.Model):
    buyer_name = models.CharField(max_length=100, blank=False)
    buyer_contact = models.IntegerField(blank=False)
    buy = models.ForeignKey(Buy, related_name="orders",
                            on_delete=models.CASCADE)
    paid = models.BooleanField()
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Order ID {self.id}"


class OrderItem(models.Model):
    order = models.ForeignKey(
        Order, related_name='order_items', on_delete=models.CASCADE)
    item = models.ForeignKey(
        Item, related_name='orders', on_delete=models.CASCADE)
    quantity = models.IntegerField()
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.order}: {self.item}"
