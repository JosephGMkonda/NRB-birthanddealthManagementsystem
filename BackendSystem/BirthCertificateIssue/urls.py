from django.urls import path
from .views import BirthCertificate_Details,BirthCertificateList,get_birth_certificate_stat


urlpatterns = [
    path('birthcertificate/',BirthCertificateList, name='birthcertificate_list'),
    path('birthcertificate/<int:pk>/',BirthCertificate_Details, name='birthcertificate_details'),
    path('birth-stats/',get_birth_certificate_stat, name='birth-stats')
]
