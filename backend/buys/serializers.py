from django.contrib.auth.models import User
from rest_framework import serializers
from backend.buys.models import Buy, Item


class ItemSerializer(serializers.HyperlinkedModelSerializer):
    # buy = serializers.ForeignKeyField(source='buy.id')

    class Meta:
        model = Item
        fields = ['url', 'id', 'buy', 'title',
                  'description', 'sku', 'price', 'created']


class BuySerializer(serializers.HyperlinkedModelSerializer):
    host = serializers.ReadOnlyField(source='host.username')
    items = serializers.HyperlinkedRelatedField(
        many=True, read_only=True, view_name='item-detail')

    class Meta:
        model = Buy
        fields = ['url', 'id', 'host', 'title', 'description',
                  'closing_date', 'collection_date', 'items', 'created', ]
