from backend.buys import serializers
from backend.buys.models import Buy, Item
from backend.buys.serializers import BuySerializer, ItemSerializer
from rest_framework import generics, permissions, renderers, authentication
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.reverse import reverse


class BuyList(generics.ListCreateAPIView):
    queryset = Buy.objects.all()
    serializer_class = BuySerializer
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(host=self.request.user)


class BuyDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Buy.objects.all()
    serializer_class = BuySerializer
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]


class ItemList(generics.ListCreateAPIView):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(host=self.request.user)


class ItemDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
