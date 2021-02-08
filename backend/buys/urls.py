from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from backend.buys import views

# when using class views
# the name in each path allows us to reference the path in hyperlinks, like in views (api root) and serializers
urlpatterns = format_suffix_patterns([
    path('buys',
         views.BuyList.as_view(),
         name='buy-list'),
    path('buys/<int:pk>',
         views.BuyDetail.as_view(),
         name='buy-detail'),
    path('items/<int:pk>', views.ItemDetail.as_view(), name='item-detail'),
    path('items',
         views.ItemList.as_view(),
         name='item-list'),
])
