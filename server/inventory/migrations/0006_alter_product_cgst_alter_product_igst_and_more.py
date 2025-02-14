# Generated by Django 5.1.3 on 2025-02-14 05:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('inventory', '0005_rename_cgst_product_cgst'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='CGST',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=5),
        ),
        migrations.AlterField(
            model_name='product',
            name='igst',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=5),
        ),
        migrations.AlterField(
            model_name='product',
            name='sgst',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=5),
        ),
    ]
