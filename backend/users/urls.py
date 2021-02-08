from django.urls import path
from backend.users import views

urlpatterns = [
    path('login', views.APILoginView.as_view(), name='login'),
    path('logout', views.APILogoutView.as_view(), name='logout'),
    path('updatepassword', views.APIPasswordUpdateView.as_view(),
         name='updatepassword'),
]
