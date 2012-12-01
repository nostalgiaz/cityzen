# Create your views here.
from cityzen import settings

from django.http import HttpResponse
from django.shortcuts import render
import pusher

pusher.app_id = settings.pusher_app_id
pusher.key = settings.pusher_key
pusher.secret = settings.pusher_secret

def home(request):
    return render(request, 'main/index.html', {'pusher_key': pusher.key})

p = pusher.Pusher()

def message(request):
    p['cityzen'].trigger('message', {
        'address': request.GET.get('address'),
    })
    return HttpResponse('')