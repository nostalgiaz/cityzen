from django.db import models

# Create your models here.
class Ticket(models.Model):
    """ ticket model for cityzen project
    """
    description = models.CharField(max_length=300)
    city = models.CharField(max_length=100)
    address = models.CharField(max_length=100)
    photo = models.ImageField(upload_to='images', blank=True, null=True)
