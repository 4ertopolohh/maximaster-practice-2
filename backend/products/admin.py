from django import forms
from django.contrib import admin
from django.core.exceptions import ValidationError

from config.admin import admin_site

from .models import Product, ProductCharacteristic, ProductImage


class ProductImageInlineFormSet(forms.BaseInlineFormSet):
    def clean(self):
        super().clean()
        preview_count = 0

        for form in self.forms:
            cleaned_data = getattr(form, "cleaned_data", None)
            if not cleaned_data or cleaned_data.get("DELETE", False):
                continue

            if cleaned_data.get("is_preview", False):
                preview_count += 1

        if preview_count > 1:
            raise ValidationError("У товара может быть только одно превью-изображение.")


class ProductImageInline(admin.TabularInline):
    model = ProductImage
    extra = 1
    formset = ProductImageInlineFormSet
    fields = ("image", "alt_text", "is_preview")
    verbose_name = "Изображение"
    verbose_name_plural = "Изображения"

    def has_view_permission(self, request, obj=None):
        return True

    def has_add_permission(self, request, obj=None):
        return True

    def has_change_permission(self, request, obj=None):
        return True

    def has_delete_permission(self, request, obj=None):
        return True


class ProductCharacteristicInline(admin.TabularInline):
    model = ProductCharacteristic
    extra = 1
    fields = ("parameter", "value")
    verbose_name = "Характеристика"
    verbose_name_plural = "Характеристики"

    def has_view_permission(self, request, obj=None):
        return True

    def has_add_permission(self, request, obj=None):
        return True

    def has_change_permission(self, request, obj=None):
        return True

    def has_delete_permission(self, request, obj=None):
        return True


@admin.register(Product, site=admin_site)
class ProductAdmin(admin.ModelAdmin):
    list_display = ("title", "price", "in_stock", "sku", "brand")
    list_filter = ("in_stock", "brand")
    search_fields = ("title", "sku", "brand")
    inlines = (ProductImageInline, ProductCharacteristicInline)

    def has_module_permission(self, request):
        return True

    def has_view_permission(self, request, obj=None):
        return True

    def has_add_permission(self, request):
        return True

    def has_change_permission(self, request, obj=None):
        return True

    def has_delete_permission(self, request, obj=None):
        return True

    # In open-admin mode requests are anonymous, so django_admin_log cannot
    # store user_id. Disable admin action logging for this model.
    def log_addition(self, request, obj, message):
        return None

    def log_change(self, request, obj, message):
        return None

    def log_deletions(self, request, queryset):
        return None
