# Generated by Django 5.1.3 on 2025-02-14 05:29

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('inventory', '0002_remove_product_id_remove_product_price_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='product',
            old_name='nickName',
            new_name='nick_name',
        ),
    ]
