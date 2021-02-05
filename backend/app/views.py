import psycopg2
from psycopg2 import Error

from django.contrib.auth.models import Group, User
# from django.contrib.auth import get_user_model
from .models import Host
from rest_framework import viewsets
from rest_framework import permissions
from backend.app.serializers import UserSerializer, GroupSerializer

## psycopg2 connection
try:
    # Connect to an existing database
    connection = psycopg2.connect(user="",
                                password="",
                                host="127.0.0.1",
                                port="5432",
                                database="grouby")

    # Create a cursor to perform database operations
    cursor = connection.cursor()
    # Print PostgreSQL details
    print("PostgreSQL server information")
    print(connection.get_dsn_parameters(), "\n")
    # Executing a SQL query
    cursor.execute("SELECT version();")
    # Fetch result
    record = cursor.fetchone()
    print("You are connected to - ", record, "\n")

except (Exception, Error) as error:
    print("Error while connecting to PostgreSQL", error)

finally:
    if (connection):
        cursor.close()
        connection.close()
        print("PostgreSQL connection is closed")

# User = get_user_model()
class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
    # permission_classes = [permissions.IsAuthenticated]

class GroupViewSet(viewsets.ModelViewSet):
    queryset = Group.objects.all()
    serializer_class = GroupSerializer
    permission_classes = [permissions.IsAuthenticated]

# class HostViewSet(viewsets.ModelViewSet):
#     queryset = Host.objects.all()
#     serializer_class = HostSerializer
    # permission_classes = [permissions.IsAuthenticated]