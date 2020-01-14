from shodan import Shodan
from django.conf import settings
from django.shortcuts import render
from django.views import View

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
            create_alert = api.create_alert(name=name, ip=ip, expires=expires)
            return create_alert
        except Exception as e:
            return ''


def get_shodan_network_alert(request):
    method = 'GET'
    url = 'https://api.shodan.io/shodan/alert/{id}/info?key={YOUR_API_KEY}'
    params = {'id': 'alert_id', 'YOUR_API_KEY': 'API_KEY'}
    myip = get_my_ip()
    if myip != '':
        try:
            alert_dict = create_alert('home', myip, 0)
            api_url = 'https://api.shodan.io/shodan/alert/{0}/info?key={1}'.format(alert_dict['id'], settings.API_KEY)
            custom_headers = {"x-api-key": settings.API_KEY, "Content-Type": "application/json"}
            response = requests.get(api_url, headers=custom_headers)
            if response.status_code == 200:
                return render(request, 'shodan/shodan_network_alert.html', {'details': response.json(),
                                                                            'url': url, 'method': method,
                                                                            'params': params
                                                                            })
            return render(request, 'shodan/shodan_network_alert.html', {'details': {},
                                                                        'url': url, 'method': method,
                                                                        'params': params
                                                                        })
        except Exception as e:
            return {}


def get_shodan_created_alerts(request):
    method = 'GET'
    url = 'https://api.shodan.io/shodan/alert/info?key={YOUR_API_KEY}'
    params = 'API_KEY'
    try:
        api_url = 'https://api.shodan.io/shodan/alert/info?key={0}'.format(settings.API_KEY)
        custom_headers = {"x-api-key": settings.API_KEY, "Content-Type": "application/json"}
        response = requests.get(api_url, headers=custom_headers)
        if response.status_code == 200:
            return render(request, 'shodan/shodan_alert_info.html', {'details': response.json(),
                                                                     'url': url, 'method': method,
                                                                     'params': params})
        return render(request, 'shodan/shodan_alert_info.html', {'details': {},
                                                                 'url': url, 'method': method,
                                                                 'params': params})
    except Exception as e:
        return {}


def get_shodan_notifier(request):
    method = 'GET'
    url = 'https://api.shodan.io/shodan/alert/{id}/notifier/{notifier_id}'
    params = {'id': 'alert_id', 'notifier_id': 'notifier_id'}
    myip = get_my_ip()
    try:
        alert_dict = create_alert('home', myip, 0)
        api_url = 'https://api.shodan.io/shodan/alert/{0}/notifier/{1}'.format(alert_dict['id'], any)
        custom_headers = {"x-api-key": settings.API_KEY, "Content-Type": "application/json"}
        response = requests.get(api_url, headers=custom_headers)
        if response.status_code == 200:
            return render(request, 'shodan/shodan_notifier.html', {'details': response.json()})
        return render(request, 'shodan/shodan_notifier.html', {'details': {},
                                                               'url': url, 'method': method,
                                                               'params': params})
    except Exception as e:
        return render(request, 'shodan/shodan_notifier.html', {'details': {},
                                                               'url': url, 'method': method,
                                                               'params': params})


def get_shodan_triggers(request):
    method = 'GET'
    url = 'https://api.shodan.io/shodan/alert/triggers?key={YOUR_API_KEY}'
    params = 'API_KEY'
    try:
        api_url = 'https://api.shodan.io/shodan/alert/triggers?key={0}'.format(settings.API_KEY)
        custom_headers = {"x-api-key": settings.API_KEY, "Content-Type": "application/json"}
        response = requests.get(api_url, headers=custom_headers)
        if response.status_code == 200:
            return render(request, 'shodan/shodan_triggers.html', {'details': response.json(),
                                                                   'url': url, 'method': method,
                                                                   'params': params})
        return render(request, 'shodan/shodan_triggers.html', {'details': {},
                                                               'url': url, 'method': method,
                                                               'params': params})
    except Exception as e:
        return {}


class PostApi(View):
    def get(self, request):
        return render(request, 'shodan/post_api.html', {'status': 0})

    def post(self, request):
        get_api = request.POST.get('get_api')
        post_api = request.POST.get('post_api')
        payload = request.POST.get('json')
        method = request.POST.get('method')
        custom_headers = {"x-api-key": settings.API_KEY, "Content-Type": "application/json"}
        if method == 'get':
            try:
                api_url = '{0}?key={1}'.format(get_api, settings.API_KEY)
                response = requests.get(api_url, headers=custom_headers)
                if response.status_code == 200:
                    return render(request, 'shodan/post_api.html', {'details': response.json(),
                                                                    'status': 1})
                else:
                    return render(request, 'shodan/post_api.html', {'details': response.json(),
                                                                    'status': 1})
            except Exception as e:
                return render(request, 'shodan/post_api.html', {'message': 'Something went wrong',
                                                                'status': 0})

        elif method == 'post':

            try:
                dict = eval(payload)
            except Exception as e:
                return render(request, 'shodan/post_api.html', {'message': 'Json Format was not proper',
                                                                'status': 0})
            try:
                api_url = '{0}?key={1}'.format(post_api, settings.API_KEY)
                response = requests.post(api_url, data=dict, headers=custom_headers)
                if response.status_code == 200:
                    return render(request, 'shodan/post_api.html', {'details': response.json(),
                                                                    'status': 1})
                else:
                    return render(request, 'shodan/post_api.html', {'details': response.json(),
                                                                    'status': 1})
            except Exception as e:
                return render(request, 'shodan/post_api.html', {'message': 'Something went wrong',
                                                                'status': 0})
