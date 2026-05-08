from types import SimpleNamespace
from unittest.mock import patch

from django.core.exceptions import ValidationError
from django.forms.models import BaseInlineFormSet
from django.test import TestCase

from config.admin import admin_site
from products.admin import ProductImageInlineFormSet
from products.models import Product


class AdminPanelTests(TestCase):
    def test_admin_index_is_accessible_for_anonymous_user(self):
        response = self.client.get("/admin/")
        self.assertEqual(response.status_code, 200)

    def test_product_model_is_registered_in_custom_admin_site(self):
        self.assertIn(Product, admin_site._registry)


class ProductImageInlineFormSetTests(TestCase):
    def test_clean_raises_error_when_more_than_one_preview_selected(self):
        formset = ProductImageInlineFormSet.__new__(ProductImageInlineFormSet)
        formset.forms = [
            SimpleNamespace(cleaned_data={"is_preview": True}),
            SimpleNamespace(cleaned_data={"is_preview": True}),
        ]

        with patch.object(BaseInlineFormSet, "clean", return_value=None):
            with self.assertRaises(ValidationError):
                ProductImageInlineFormSet.clean(formset)
