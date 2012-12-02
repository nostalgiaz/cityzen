import hashlib
import base64
from main.models import Ticket
from django.core.files.base import ContentFile


def save_image(ticket, img):
    """ Save image in ticket's photo field
    """
    image = base64.decodestring(img.replace(' ','+'))
    sha1 = hashlib.sha1(image).hexdigest()
    ticket.photo.save(sha1 + ".jpg", ContentFile(image))

