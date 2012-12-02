from main.models import Ticket, TicketCategories
from ajaxutils.decorators import ajax
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from main.helpers import send_push_notification
from .helpers import save_image
import json
from django.shortcuts import get_object_or_404

@csrf_exempt
@ajax(require_POST=True)
def get_data(request):
    """ Extract data from POST and save into a Ticket
        instance. If exist, save the image
    """

    data = json.loads(request.POST['data'])
    address = data['address']
    city = data['city']
    country = data['country']
    description = data['description']
    category = int(data['category'])
    image = data.get('image')
    ticket = Ticket()
    ticket.city = city
    ticket.address = address
    ticket.country = country
    ticket.description = description
    ticket.category = category
    ticket.save()

    if image:
        save_image(ticket, image)

    send_push_notification(ticket)
    return HttpResponse(status=200)


@ajax(require_GET=True)
def tickets(request):
    tickets = Ticket.objects.filter(status__in=[0, 1])
    return {'object': [ticket.to_dict() for ticket in tickets]}


@ajax(require_GET=True)
def get_categories(request):
    return dict(TicketCategories)


@csrf_exempt
@ajax(require_POST=True)
def update_status(request):
    ticket = get_object_or_404(Ticket, pk=int(request.POST['pk']))
    ticket.status = int(request.POST['status']) + 1
    ticket.save()

    send_push_notification(ticket, "delete")

    return HttpResponse(status=200)
