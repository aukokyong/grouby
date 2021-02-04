from django.contrib.auth.models import User, Group
from .models import Host
from rest_framework import serializers
from django.contrib.auth.hashers import make_password

class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['url', 'username', 'email', 'groups']

class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ['url', 'name']

class HostSerializer(serializers.HyperlinkedModelSerializer):
    password = serializers.CharField(write_only=True)

    # override default create method to add a make_password which hashes the password
    def create(self, validated_data):
        host = Host.objects.create(
            name=validated_data['name'],
            mobile_num=validated_data['mobile_num'],
            email=validated_data['email'],
            password=make_password(validated_data['password'])
        )
        host.save()
        return host

    class Meta:
        model = Host
        fields = ['id', 'url', 'name', 'mobile_num', 'email', 'password']
