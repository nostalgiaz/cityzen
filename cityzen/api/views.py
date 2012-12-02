from main.models import Ticket
from ajaxutils.decorators import ajax
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from main.helpers import send_push_notification
from .helpers import save_image
import json


@csrf_exempt
@ajax(require_POST=True)
def get_data(request):
    """ Extract data from POST and save into a Ticket
        instance. If exist, save the image
    """
    #   import pdb;pdb.set_trace()

    data = json.loads(request.POST['data'])
    print data
    address = data['address']
    city = data['city']
    country = data['country']
    description = data['description']
    image = data.get('image')
    ticket = Ticket()
    ticket.city = city
    ticket.address = address
    ticket.country = country
    ticket.description = description
    ticket.save()
    if image:
        save_image(ticket, image)

    send_push_notification(ticket)
    return HttpResponse(status=200)


@ajax(require_GET=True)
def tickets(request):
    tickets = Ticket.objects.all()
    return {'object': [ticket.to_dict() for ticket in tickets]}
