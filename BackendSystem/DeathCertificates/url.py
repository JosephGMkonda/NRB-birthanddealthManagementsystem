from django.urls import path
from .views import DeathCertificateList,DeathCertificate_Details


urlpatterns = [
    path('deathcertificate/',DeathCertificateList, name='deathcertificate_list'),
    path('deathcertificate/<int:pk>/',DeathCertificate_Details, name='deathcertificate_details' )
]