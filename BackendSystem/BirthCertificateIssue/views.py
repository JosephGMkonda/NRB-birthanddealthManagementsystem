from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from .serializer import BirthCertificateModelSerializer
from .models import BirthCertificateModel


@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def BirthCertificateList(request):
    if request.method == 'GET':
        BirthCertificate = BirthCertificateModel.objects.filter(user=request.user)
        serializer = BirthCertificateModelSerializer(BirthCertificate, many=True)
        return Response(serializer.data)
    
    elif request.method == 'POST':
        serializer = BirthCertificateModelSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET','PUT','DELETE'])
@permission_classes([IsAuthenticated])
def BirthCertificate_Details(request, pk):
    try: 
        BirthCertificate = BirthCertificateModel.objects.get(pk=pk, user=request.user)
    except BirthCertificate.DoesNotExists:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'GET':
        serializer = BirthCertificateModelSerializer(BirthCertificate)
        return Response(serializer.data)
    
    elif request.method == 'PUT':
        serializer = BirthCertificateModelSerializer(BirthCertificate, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'DELETE':
        BirthCertificate.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)




        


