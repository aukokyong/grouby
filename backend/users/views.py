from django.contrib.auth.models import User, Group
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from rest_auth.views import (LoginView, LogoutView, PasswordChangeView)
from django.http import HttpResponse, HttpResponseNotFound
import os

from backend.users.serializers import UserSerializer, GroupSerializer


class Assets(viewsets.View):
    def get(self, _request, filename):
        path = os.path.join(os.path.dirname(__file__), 'static', filename)
        if os.path.isfile(path):
            with open(path, 'rb') as file:
                return HttpResponse(file.read(), content_type='application/javascript')
        else:
            return HttpResponseNotFound()


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]


class GroupViewSet(viewsets.ModelViewSet):
    queryset = Group.objects.all()
    serializer_class = GroupSerializer
    permission_classes = [IsAuthenticated]


class APILogoutView(LogoutView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]


class APILoginView(LoginView):
    pass


class APIPasswordUpdateView(PasswordChangeView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
