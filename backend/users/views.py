from django.contrib.auth.models import User, Group
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from rest_auth.views import (LoginView, LogoutView, PasswordChangeView)


from backend.users.serializers import UserSerializer, GroupSerializer


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
