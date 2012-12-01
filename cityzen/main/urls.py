from django.conf.urls import patterns, url

urlpatterns = patterns(
    'main.views',
    url(r'^$', 'home', name='home'),
    url(r'^message', 'message', name='message'),
)
