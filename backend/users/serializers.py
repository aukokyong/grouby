from django.contrib.auth.models import User, Group
from rest_framework import serializers
from backend.buys.serializers import BuySerializer


class UserSerializer(serializers.HyperlinkedModelSerializer):
    # buys = serializers.HyperlinkedRelatedField(
    #     many=True, view_name='buy-detail', read_only=True)

    buys = BuySerializer(
        many=True, read_only=True)

    class Meta:
        model = User
        fields = ['url', 'id', 'username', 'buys']


class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ['url', 'name']
