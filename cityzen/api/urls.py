from django.conf.urls import patterns, url

urlpatterns = patterns(
    'api.views',
    url(r'^$', 'get_data', name='get_data'),
)