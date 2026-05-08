import shutil
import tempfile

from django.core.files.uploadedfile import SimpleUploadedFile
from django.test import TestCase, override_settings

from products.models import Product, ProductCharacteristic, ProductImage


class ProductApiTests(TestCase):
    @classmethod
    def setUpClass(cls):
        cls.temp_media_root = tempfile.mkdtemp()
        cls.override = override_settings(MEDIA_ROOT=cls.temp_media_root)
        cls.override.enable()
        super().setUpClass()

    @classmethod
    def tearDownClass(cls):
        super().tearDownClass()
        cls.override.disable()
        shutil.rmtree(cls.temp_media_root, ignore_errors=True)

    def setUp(self):
        self.product_with_preview = Product.objects.create(
            title="Product One",
            description="Description one",
            price="10.00",
            in_stock=True,
            sku="SKU-001",
            brand="Brand A",
        )
        self.product_without_preview = Product.objects.create(
            title="Product Two",
            description="Description two",
            price="20.00",
            in_stock=False,
            sku="SKU-002",
            brand="Brand B",
        )

        self.non_preview_image = ProductImage.objects.create(
            product=self.product_with_preview,
            image=SimpleUploadedFile("one.jpg", b"img-1", content_type="image/jpeg"),
            alt_text="",
            is_preview=False,
        )
        self.preview_image = ProductImage.objects.create(
            product=self.product_with_preview,
            image=SimpleUploadedFile("one-preview.jpg", b"img-2", content_type="image/jpeg"),
            alt_text="Preview image",
            is_preview=True,
        )
        self.first_image_for_second_product = ProductImage.objects.create(
            product=self.product_without_preview,
            image=SimpleUploadedFile("two.jpg", b"img-3", content_type="image/jpeg"),
            alt_text="",
            is_preview=False,
        )

        ProductCharacteristic.objects.create(
            product=self.product_with_preview,
            parameter="Color",
            value="Black",
        )

    def test_product_list_returns_expected_fields(self):
        response = self.client.get("/api/products/")
        self.assertEqual(response.status_code, 200)

        data = response.json()
        self.assertEqual(len(data), 2)

        item = data[0]
        self.assertSetEqual(
            set(item.keys()),
            {"id", "name", "price", "in_stock", "preview_image"},
        )

    def test_preview_image_falls_back_to_first_image_without_marked_preview(self):
        response = self.client.get("/api/products/")
        self.assertEqual(response.status_code, 200)

        data = response.json()
        target = next(
            item for item in data if item["id"] == self.product_without_preview.id
        )
        self.assertIsNotNone(target["preview_image"])
        self.assertIn("two.jpg", target["preview_image"])

    def test_product_detail_returns_images_characteristics_and_alt_fallback(self):
        response = self.client.get(f"/api/products/{self.product_with_preview.id}/")
        self.assertEqual(response.status_code, 200)

        data = response.json()
        self.assertSetEqual(
            set(data.keys()),
            {
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
            },
        )
        self.assertGreaterEqual(len(data["images"]), 2)
        self.assertEqual(len(data["characteristics"]), 1)
        self.assertTrue(data["images"][0]["alt_text"].endswith(self.product_with_preview.title))
