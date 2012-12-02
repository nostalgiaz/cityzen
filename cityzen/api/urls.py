from django.conf.urls import patterns, url

urlpatterns = patterns(
    'api.views',
    url(r'^$', 'get_data', name='get_data'),
    url(r'^tickets/$', 'tickets', name='tickets'),
    url(r'^tickets/status/update/$', 'update_status', name='update_status'),
    url(r'^categories/$', 'get_categories', name='get_categories')
)
