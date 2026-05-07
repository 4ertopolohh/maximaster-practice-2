from rest_framework import serializers

from .models import Product, ProductCharacteristic, ProductImage


class ProductImageSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()
    alt_text = serializers.SerializerMethodField()

    class Meta:
        model = ProductImage
        fields = ("id", "image", "alt_text", "is_preview")

    def get_image(self, obj: ProductImage):
        request = self.context.get("request")
        if request:
            return request.build_absolute_uri(obj.image.url)
        return obj.image.url

    def get_alt_text(self, obj: ProductImage):
        if obj.alt_text:
            return obj.alt_text
        return f"Фото товара {obj.product.name}"


class ProductCharacteristicSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductCharacteristic
        fields = ("id", "parameter", "value")


class ProductListSerializer(serializers.ModelSerializer):
    name = serializers.CharField(source="title", read_only=True)
    preview_image = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = ("id", "name", "price", "in_stock", "preview_image")

    def get_preview_image(self, obj: Product):
        preview = obj.preview_image
        if not preview:
            return None

        request = self.context.get("request")
        if request:
            return request.build_absolute_uri(preview.image.url)
        return preview.image.url


class ProductDetailSerializer(serializers.ModelSerializer):
    name = serializers.CharField(source="title", read_only=True)
    preview_image = serializers.SerializerMethodField()
    images = ProductImageSerializer(many=True, read_only=True)
    characteristics = ProductCharacteristicSerializer(many=True, read_only=True)

    class Meta:
        model = Product
        fields = (
            "id",
            "name",
            "description",
            "price",
            "in_stock",
            "sku",
            "brand",
            "preview_image",
            "images",
            "characteristics",
        )

    def get_preview_image(self, obj: Product):
        preview = obj.preview_image
        if not preview:
            return None

        request = self.context.get("request")
        if request:
            return request.build_absolute_uri(preview.image.url)
        return preview.image.url

