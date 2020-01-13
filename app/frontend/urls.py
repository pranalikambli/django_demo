from django.urls import path

from .views import *

urlpatterns = [
    # site
    path('', Login.as_view(), name='login'),
    path('home', home, name='home'),
    path('logout/', logout, name='logout'),
]