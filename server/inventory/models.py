from django.db import models

# Create your models here.
class Product(models.Model):
    name = models.CharField(max_length=255, unique=True, primary_key=True)
    nick_name = models.CharField(max_length=255, default="")
    brand_name = models.CharField(max_length=255, default="")
    category = models.CharField(max_length=255, default="")
    unit = models.CharField(max_length=255, default="")
    mrp = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    selling_price = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    cgst = models.DecimalField(max_digits=5, decimal_places=2, default=0)
    sgst = models.DecimalField(max_digits=5, decimal_places=2, default=0)
    igst = models.DecimalField(max_digits=5, decimal_places=2, default=0)
    hsn_code = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    image = models.ImageField(upload_to='products/')

    def __str__(self):
        return self.name