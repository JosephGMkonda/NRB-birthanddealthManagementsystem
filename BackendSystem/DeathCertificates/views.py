from django.shortcuts import render
from .models import DeathCertificatesModel
from .serializers import DeathCertificateModelSerializer
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.core.paginator import Paginator
from django.db.models import Q
from rest_framework import status


@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def DeathCertificateList(request):
    if request.method == 'GET':
        deathCertificates = DeathCertificatesModel.objects.filter(user=request.user)


        deathCertificate = deathCertificates


        # Searching Functionality

        search_record = request.GET.get('search','')
        if search_record:
            deathCertificate = deathCertificates.filter(
                Q(FullName__icontains=search_record) | Q(PlaceOfDeath__icontains=search_record)
                )

        # Pagination Functionality
        paginator = Paginator(deathCertificate,5)
        pageNumber = request.GET.get('page',1)
        pageObject = paginator.get_page(pageNumber)

        serializer = DeathCertificateModelSerializer(pageObject.object_list, many=True)

        data = {
            'totalRecords' : paginator.count,
            'TotalPages' : paginator.num_pages,
            'currentPage' : pageObject.number,
            'records': serializer.data
        }

        return Response(data)
    elif request.method == 'POST':
        serializer = DeathCertificateModelSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET','PUT','DELETE'])
@permission_classes([IsAuthenticated])
def DeathCertificate_Details(request,pk):
    try: 
        DeathCertificate = DeathCertificatesModel.objects.get(pk=pk,user=request.user)
    except DeathCertificate.DoesNotExists:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'GET':
        serializer=DeathCertificateModelSerializer(DeathCertificate)
        return Response(serializer.data)
    elif request.method == 'PUT':
        serializer = DeathCertificateModelSerializer(DeathCertificate, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        DeathCertificate.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)