from django.urls import path
from .views import CustomTokenObtain,check_auth
from rest_framework_simplejwt.views import TokenRefreshView



urlpatterns = [
    path('api/login/',CustomTokenObtain.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/check_auth/', check_auth, name='check_auth')
]
