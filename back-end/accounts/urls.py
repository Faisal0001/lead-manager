from django.urls import path, include
from knox.views import LogoutView
from .api import RegisterApi, LoginApi, UserApi

app_name = 'accounts'

urlpatterns = [
	path('', include('knox.urls')),
	path('register', RegisterApi.as_view(), name='register'),
	path('login', LoginApi.as_view(), name='login'),
	path('user', UserApi.as_view(), name='user'),
	path('logout', LogoutView.as_view(), name='logout'),
]
