from django.contrib import admin
from django.urls import path, include, re_path
from rest_framework import routers
from django.views.generic import TemplateView
from backend.users import views

router = routers.DefaultRouter()
router.register(r'users', views.UserViewSet)
router.register(r'groups', views.GroupViewSet)

urlpatterns = [
    path('admin', admin.site.urls),
    path('account/', include(router.urls)),
    path('auth/', include('backend.users.urls')),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('data/', include('backend.buys.urls')),
    re_path('.*', TemplateView.as_view(template_name='index.html')),
]
