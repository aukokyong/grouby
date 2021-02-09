# from django.contrib.auth.models import User
# from django.db.models import fields
from rest_framework import serializers
from backend.buys.models import Buy, Item, Order, OrderItem


class OrderItemSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = OrderItem
        fields = ['url', 'id', 'order', 'item', 'quantity', 'created']


class ItemSerializer(serializers.HyperlinkedModelSerializer):
    # buy = serializers.ForeignKeyField(source='buy.id')

    class Meta:
        model = Item
        fields = ['url', 'id', 'buy', 'title',
                  'description', 'sku', 'price', 'created', ]


class OrderSerializer(serializers.HyperlinkedModelSerializer):
    order_items = OrderItemSerializer(many=True, read_only=True)

    class Meta:
        model = Order
        fields = ['url', 'id', 'buyer_name', 'buyer_contact',
                  'order_items', 'paid', 'created']


class BuySerializer(serializers.HyperlinkedModelSerializer):
    host = serializers.ReadOnlyField(source='host.username')
    # items = serializers.HyperlinkedRelatedField(
    #     many=True, read_only=True, view_name='item-detail')
    items = ItemSerializer(many=True, read_only=True)
    orders = OrderSerializer(many=True, read_only=True)

    class Meta:
        model = Buy
        fields = ['url', 'id', 'host', 'title', 'description',
                  'closing_date', 'collection_date', 'items', 'created', 'orders']
