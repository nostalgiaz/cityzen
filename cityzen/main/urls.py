from django.conf.urls import patterns, url

urlpatterns = patterns(
    'main.views',
    url(r'^$', 'home', name='home')
)

from django.conf import settings

# ... the rest of your URLconf goes here ...

if settings.DEBUG:
    urlpatterns += patterns('',
        url(r'^media/(?P<path>.*)$', 'django.views.static.serve', {
            'document_root': settings.MEDIA_ROOT,
        }),
   )