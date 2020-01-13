from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.views import View
from django.urls import reverse
from urllib.parse import urlencode


class Login(View):
    template_name = 'login.html'

    def get(self, request):
        return render(request, self.template_name)

    def post(self, request):
        username = request.POST.get('username')
        password = request.POST.get('password')

        if username == '' and password == '':
            return render(request, self.template_name, {'message': 'All values are required'})
        elif username == 'admin' and password == 'admin':
            return render(request, 'site/index.html')
        else:
            return render(request, self.template_name, {'message': 'Invalid Details'})


def home(request):
    render(request, 'site/index.html')


def logout(request):

    request.session.flush()
    return redirect('/', status=200)