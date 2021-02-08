from django.contrib.auth.models import User
from rest_framework import serializers
from backend.buys.models import Buy, Item


class BuySerializer(serializers.HyperlinkedModelSerializer):
    host = serializers.ReadOnlyField(source='host.username')

    class Meta:
        model = Buy
        fields = ['url', 'id', 'host', 'title', 'description',
                  'closing_date', 'collection_date', 'created']


class ItemSerializer(serializers.HyperlinkedModelSerializer):
    buy = serializers.ReadOnlyField(source='buy.id')

    class Meta:
        model = Item
        fields = ['url', 'id', 'buy', 'title', 'description',
                  'sku', 'price', 'created']
