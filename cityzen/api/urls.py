from django.conf.urls import patterns, url

urlpatterns = patterns(
    'api.views',
    url(r'^$', 'get_data', name='get_data'),
    url(r'^tickets/$', 'tickets', name='tickets'),
    url(r'^categories/$', 'get_categories', name='get_categories')
)
