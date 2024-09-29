from django.shortcuts import render
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import permissions
from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view



class CustomTokenObtain(TokenObtainPairView):
    permission_classes = [permissions.AllowAny]

    def post(self, request,*args, **kwargs):
        return super().post(request,*args, **kwargs)

@api_view(['GET'])
def check_auth(request):
    if request.user.is_authenticated:
        return Response({'message': 'user is authenticated'}, status=status.HTTP_200_ok)
    return Response({'message':'User is not authenticated'}, status=status.HTTP_401_UNAUTHORIZED) 