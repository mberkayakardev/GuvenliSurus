# Generated by Django 3.1.3 on 2020-12-18 23:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('anket', '0014_auto_20201219_0204'),
    ]

    operations = [
        migrations.AlterField(
            model_name='anket',
            name='boylam',
            field=models.FloatField(),
        ),
        migrations.AlterField(
            model_name='anket',
            name='enlem',
            field=models.FloatField(),
        ),
    ]
