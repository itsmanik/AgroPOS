from django.urls import path
from .views import CreateProductView, ListProductsView

urlpatterns = [
    path('products/create/', CreateProductView.as_view(), name='create-product'),
    path('products/', ListProductsView.as_view(), name='list-product'),
]   

