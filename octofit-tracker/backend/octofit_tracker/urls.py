"""octofit_tracker URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from octofit_tracker import views

import os
from rest_framework.decorators import api_view
from rest_framework.response import Response

router = routers.DefaultRouter()
router.register(r'users', views.UserViewSet)
router.register(r'teams', views.TeamViewSet)
router.register(r'activities', views.ActivityViewSet)
router.register(r'leaderboard', views.LeaderboardViewSet)
router.register(r'workouts', views.WorkoutViewSet)

@api_view(['GET'])
def api_root(request, format=None):
    """Return absolute API endpoints using Codespace public URL when available.

    Uses the CODESPACE_NAME env var to construct URLs like:
    https://$CODESPACE_NAME-8000.app.github.dev/api/activities/

    Falls back to the request host and scheme when the env var is not set.
    """
    codespace = os.environ.get('CODESPACE_NAME')
    if codespace:
        base = f"https://{codespace}-8000.app.github.dev"
    else:
        scheme = 'https' if request.is_secure() else 'http'
        base = f"{scheme}://{request.get_host()}"
    return Response({
        'users': f'{base}/api/users/',
        'teams': f'{base}/api/teams/',
        'activities': f'{base}/api/activities/',
        'leaderboard': f'{base}/api/leaderboard/',
        'workouts': f'{base}/api/workouts/',
    })

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('', api_root, name='api-root'),
]
