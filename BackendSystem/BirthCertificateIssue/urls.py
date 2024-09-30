from django.urls import path
from .views import BirthCertificate_Details,BirthCertificateList


urlpatterns = [
    path('birthcertificate/',BirthCertificateList, name='birthcertificate_list'),
    path('birthcertificate/<int:pk>/',BirthCertificate_Details, name='birthcertificate_list')
]
