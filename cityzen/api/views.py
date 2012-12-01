from main.models import Ticket
from ajaxutils.decorators import ajax
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
import base64
import hashlib
from django.core.files.base import ContentFile


@csrf_exempt
@ajax(require_POST=True)
def get_data(request):
    """ Extract data from POST and save into a Ticket
        instance. If exist, save the image
    """
    address = request.POST['address']
    city = request.POST['city']
    state = request.POST['state']
    description = request.POST['description']
    image = request.POST.get('image')
    ticket = Ticket()
    ticket.city = city
    ticket.address = address
    ticket.description = description
    ticket.save()
    if image:
        save_image(ticket, image)
    return HttpResponse(status=200)


def save_image(ticket, img):
    """ Save image in ticket's photo field
    """
    image = base64.decodestring(img)
    sha1 = hashlib.sha1(image).hexdigest()
    ticket.photo.save(sha1 + ".jpg", ContentFile(image))
