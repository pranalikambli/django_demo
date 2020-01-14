from django.urls import path

from .views import *
from .shodan import *

urlpatterns = [
    # site
    path('', Login.as_view(), name='login'),
    path('home', home, name='home'),
    path('logout/', logout, name='logout'),
    path('shodan_network_alerts/', get_shodan_network_alert, name='shodan_network_alerts'),
    path('shodan_alerts_list/', get_shodan_created_alerts, name='shodan_alerts_list'),
    path('shodan_notifier/', get_shodan_notifier, name='shodan_notifier'),
    path('shodan_triggers/', get_shodan_triggers, name='shodan_triggers'),
    path('post_api/', PostApi.as_view(), name='post_api'),
]