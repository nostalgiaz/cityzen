from django.db import models
import json
from cityzen.settings import MEDIA_PREFIX

class Ticket(models.Model):
    """ ticket model for cityzen project
    """
    description = models.CharField(max_length=300)
    city = models.CharField(max_length=100)
    country = models.CharField(max_length=100)
    address = models.CharField(max_length=100)
    photo = models.ImageField(upload_to='images', blank=True, null=True)


    def get_absolute_image_url(self):
        return '%s%s' % (MEDIA_PREFIX, self.photo.url) if self.photo else None
    

    def to_dict(self):
        return {
            'address': self.address +", " + self.city + ", "+ self.country,
            'photo': self.get_absolute_image_url(),
            'description': self.description
        }
