from django.db import models
import json
from cityzen.settings import MEDIA_PREFIX


TicketCategories = (
    (0, "Barriere Architettoniche"),
    (1, "Incivilta'"),
    )

TicketStatus = (
    (0, "Default"),
    (1, "Locked"),
    (2, "Solved")
    )



class Ticket(models.Model):
    """ ticket model for cityzen project
    """
    description = models.CharField(max_length=300)
    city = models.CharField(max_length=100)
    country = models.CharField(max_length=100)
    address = models.CharField(max_length=100)
    photo = models.ImageField(upload_to='images', blank=True, null=True)
    category = models.IntegerField(choices=TicketCategories)
    status = models.IntegerField(choices=TicketStatus,default=0)


    def get_absolute_image_url(self):
        return '%s%s' % (MEDIA_PREFIX, self.photo.url) if self.photo else None
    

    def to_dict(self):
        return {
            'address': self.address +", " + self.city + ", "+ self.country,
            'photo': self.get_absolute_image_url(),
            'description': self.description,
            'category':self.category,
            'status':self.status
        }


