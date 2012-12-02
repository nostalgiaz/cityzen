from cityzen import settings
import pusher
from django.shortcuts import render

def home(request):
    pusher.key = settings.pusher_key
    return render(request, 'main/index.html', {'pusher_key': pusher.key})
