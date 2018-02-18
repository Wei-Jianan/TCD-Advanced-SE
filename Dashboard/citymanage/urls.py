from django.contrib import admin
from django.urls import path
from . import views

app_name = 'core'
urlpatterns = [
    path("dashboard/", views.dashboard, name='dashboard'),
    path("login/", views.login, name="login"),
]