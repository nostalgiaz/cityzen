from cityzen import settings
import pusher
from django.shortcuts import render
from django.contrib.auth.decorators import login_required

@login_required
def home(request):
    pusher.key = settings.pusher_key
    return render(request, 'main/index.html', {'pusher_key': pusher.key})

