from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.core.paginator import Paginator
from django.db.models import Q,Count
from rest_framework import status
from django.http import JsonResponse
from django.db.models.functions import TruncMonth
from collections import defaultdict
from .serializer import BirthCertificateModelSerializer
from .models import BirthCertificateModel


@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def BirthCertificateList(request):
    if request.method == 'GET':
        BirthCertificate = BirthCertificateModel.objects.filter(user=request.user)

        # Handle Search Functionality
        search_query = request.GET.get('search','')
        if search_query:
            BirthCertificate = BirthCertificate.filter(
             Q(FullName__icontains=search_query) | Q(BenNumber__icontains=search_query)
            )

        # settingup pagenation
        paginator = Paginator(BirthCertificate,5)
        page_number = request.GET.get('page', 1)
        page_obj = paginator.get_page(page_number)

        serializer = BirthCertificateModelSerializer(page_obj, many=True)

        data = {
            'total_records': paginator.count,
            'total_pages' : paginator.num_pages,
            'current_pages' : page_obj.number,
            'records' : serializer.data
        }
        return Response(data)
    
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


@permission_classes([IsAuthenticated])
def get_birth_certificate_stat(request):
    birth_start = (
        BirthCertificateModel.objects 
            .annotate(month=TruncMonth('created_at'))
            .values('month','Gender')
            .annotate(count=Count('id'))
            .order_by('month')

    )

    result = defaultdict(lambda:{'Male': 0,'Female': 0})

    for stat in birth_start: 
        month_str = stat['month'].strftime('%B')
        gender=stat['Gender']
        count=stat['count']

        result[month_str][gender] = count
    return JsonResponse(result)
        


