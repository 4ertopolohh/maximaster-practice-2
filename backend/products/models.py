from django.db import models
from django.db.models import Q


class Product(models.Model):
    title = models.CharField("Название", max_length=255)
    description = models.TextField("Описание", blank=True)
    price = models.DecimalField("Цена", max_digits=10, decimal_places=2)
    in_stock = models.BooleanField("В наличии", default=True)
    sku = models.CharField("Артикул", max_length=64, unique=True)
    brand = models.CharField("Бренд", max_length=128, blank=True)

    class Meta:
        verbose_name = "Товар"
        verbose_name_plural = "Товары"
        ordering = ("id",)

    def __str__(self) -> str:
        return self.title

    @property
    def name(self) -> str:
        return self.title

    @property
    def preview_image(self):
        preview = self.images.filter(is_preview=True).first()
        if preview:
            return preview
        return self.images.first()


class ProductImage(models.Model):
    product = models.ForeignKey(
        Product,
        on_delete=models.CASCADE,
        related_name="images",
        verbose_name="Товар",
    )
    image = models.ImageField("Изображение", upload_to="products/")
    alt_text = models.CharField("Alt текст", max_length=255, blank=True)
    is_preview = models.BooleanField("Превью", default=False)

    class Meta:
        verbose_name = "Изображение товара"
        verbose_name_plural = "Изображения товаров"
        ordering = ("id",)
        constraints = [
            models.UniqueConstraint(
                fields=("product",),
                condition=Q(is_preview=True),
                name="unique_preview_image_per_product",
                violation_error_message="У товара может быть только одно превью-изображение.",
            )
        ]

    def __str__(self) -> str:
        return f"{self.product.name} - изображение"


class ProductCharacteristic(models.Model):
    product = models.ForeignKey(
        Product,
        on_delete=models.CASCADE,
        related_name="characteristics",
        verbose_name="Товар",
    )
    parameter = models.CharField("Параметр", max_length=100)
    value = models.CharField("Значение", max_length=255)

    class Meta:
        verbose_name = "Характеристика"
        verbose_name_plural = "Характеристики"
        ordering = ("id",)

    def __str__(self) -> str:
        return f"{self.parameter}: {self.value}"

