from django.urls import path
from . import views

urlpatterns = [
    path('', views.apiOverview, name='api-overview'),

    path('dream-list-all/', views.dreamListAll, name='dream-list-all'),
    path('dream-list/', views.dreamList, name='dream-list'),
    path('dream-create/', views.dreamCreate, name='dream-create'),
    path('dream-update/', views.dreamUpdate, name='dream-update'),
    path('dream-delete/', views.dreamDelete, name='dream-delete'),
    path('dream-stats/', views.dreamStats, name='dream-stats'),

    path('update-user-settings/', views.update_user_settings, name='update_user_settings'),
    path('register/', views.register_view, name='register_view'),
    path('login/', views.login_view, name='login_view'),
    path('logout/', views.logout_view, name='logout_view'),
]