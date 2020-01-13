from shodan import Shodan
from django.conf import settings
from django.shortcuts import render

import json

import requests


def get_my_ip():
    try:
        api_url = 'https://api.shodan.io/tools/myip?key={0}'.format(settings.API_KEY)
        custom_headers = {"x-api-key": settings.API_KEY, "Content-Type": "application/json"}
        response = requests.get(api_url, headers=custom_headers)
        if response.status_code == 200:
            return response.json()
    except Exception as e:
        return ''


def create_alert(name, ip, expires):
    myip = get_my_ip()
    api = Shodan(settings.API_KEY)
    if myip != '':
        try:
            create_alert = api.create_alert(name=name, ip=ip,  expires=expires)
            return create_alert
        except Exception as e:
            return ''


def get_shodan_network_alert(request):

    myip = get_my_ip()
    if myip != '':
        try:
            alert_dict = create_alert('home', myip, 0)
            api_url = 'https://api.shodan.io/shodan/alert/{0}/info?key={1}'.format(alert_dict['id'], settings.API_KEY)
            custom_headers = {"x-api-key": settings.API_KEY, "Content-Type": "application/json"}
            response = requests.get(api_url, headers=custom_headers)
            if response.status_code == 200:
                return render(request, 'shodan/shodan_network_alert.html', {'details': response.json()})
            return render(request, 'shodan/shodan_network_alert.html', {'details': {}})
        except Exception as e:
            return {}


def get_shodan_created_alerts(request):

    try:
        api_url = 'https://api.shodan.io/shodan/alert/info?key={0}'.format(settings.API_KEY)
        custom_headers = {"x-api-key": settings.API_KEY, "Content-Type": "application/json"}
        response = requests.get(api_url, headers=custom_headers)
        if response.status_code == 200:
            return render(request, 'shodan/shodan_alert_info.html', {'details': response.json()})
    except Exception as e:
        return {}


def get_shodan_notifier(request):
    myip = get_my_ip()
    try:
        alert_dict = create_alert('home', myip, 0)
        api_url = 'https://api.shodan.io/shodan/alert/{0}/notifier/{1}'.format(alert_dict['id'], any)
        custom_headers = {"x-api-key": settings.API_KEY, "Content-Type": "application/json"}
        response = requests.get(api_url, headers=custom_headers)
        if response.status_code == 200:
            return render(request, 'shodan/shodan_notifier.html', {'details': response.json()})
        return render(request, 'shodan/shodan_notifier.html', {'details': {}})
    except Exception as e:
        return render(request, 'shodan/shodan_notifier.html', {'details': {}})


def get_shodan_triggers(request):

    try:
        api_url = 'https://api.shodan.io/shodan/alert/triggers?key={0}'.format(settings.API_KEY)
        custom_headers = {"x-api-key": settings.API_KEY, "Content-Type": "application/json"}
        response = requests.get(api_url, headers=custom_headers)
        if response.status_code == 200:
            return render(request, 'shodan/shodan_triggers.html', {'details': response.json()})
        return render(request, 'shodan/shodan_triggers.html', {'details': {}})
    except Exception as e:
        return {}