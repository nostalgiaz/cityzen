from django.conf.urls import patterns, url
from django.contrib.auth.views import login, logout


urlpatterns = patterns(
    'main.views',
    url(r'^$', 'home', name='home'),
    url(r'^login/', login, name='login'),
    url(r'^logout/', logout, name='logout'),
)

from django.conf import settings

# ... the rest of your URLconf goes here ...

if settings.DEBUG:
    urlpatterns += patterns('',
        url(r'^media/(?P<path>.*)$', 'django.views.static.serve', {
            'document_root': settings.MEDIA_ROOT,
        }),
   )
