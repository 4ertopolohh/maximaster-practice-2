from rest_framework.generics import ListAPIView, RetrieveAPIView

from .models import Product
from .serializers import ProductDetailSerializer, ProductListSerializer


class ProductListView(ListAPIView):
    queryset = Product.objects.prefetch_related("images")
    serializer_class = ProductListSerializer


class ProductDetailView(RetrieveAPIView):
    queryset = Product.objects.prefetch_related("images", "characteristics")
    serializer_class = ProductDetailSerializer

