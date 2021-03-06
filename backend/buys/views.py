from backend.buys import serializers
from backend.buys.models import Buy, Item, Order, OrderItem
from backend.buys.serializers import BuySerializer, ItemSerializer, OrderSerializer, OrderItemSerializer
from rest_framework import generics, permissions, renderers, authentication
from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.reverse import reverse
from django.http import HttpResponse, HttpResponseNotFound
from django.views import generic


class Assets(viewsets.ViewSet):
    def get(self, _request, filename):
        path = os.path.join(os.path.dirname(__file__), 'static', filename)
        if os.path.isfile(path):
            with open(path, 'rb') as file:
                return HttpResponse(file.read(), content_type='application/javascript')
        else:
            return HttpResponseNotFound()


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

    # def perform_create(self, serializer):
    #     serializer.save(host=self.request.user)


class ItemDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]


class OrderList(generics.ListCreateAPIView):
    # queryset = Order.objects.all()
    serializer_class = OrderSerializer

    def get_queryset(self):
        queryset = Order.objects.all()
        contact = self.request.query_params.get('contact', None)
        if contact is not None:
            queryset = queryset.filter(
                buyer_contact=contact)
        return queryset


class BuyerOrders(generics.ListAPIView):
    serializer_class = OrderSerializer

    def get_queryset(self):
        contact = self.request.query_params.get('contact', None)
        queryset = Order.objects.filter(
            buyer_contact=contact).values('buy__title')
        return queryset


class OrderDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]


class OrderItemList(generics.ListCreateAPIView):
    queryset = OrderItem.objects.all()
    serializer_class = OrderItemSerializer


class OrderItemDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = OrderItem.objects.all()
    serializer_class = OrderItemSerializer
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]


class HostedBuys(generics.ListAPIView):
    serializer_class = BuySerializer

    def get_queryset(self):
        user = self.request.user
        return Buy.objects.filter(host=user)


# class BuyerOrders(generics.ListAPIView):
#     serializer_class = OrderSerializer
