from django.urls import path
from .views import DeathCertificateList,DeathCertificate_Details,get_death_certificate_stat


urlpatterns = [
    path('deathcertificate/',DeathCertificateList, name='deathcertificate_list'),
    path('deathcertificate/<int:pk>/',DeathCertificate_Details, name='deathcertificate_details' ),
    path('death-stats/',get_death_certificate_stat, name='death-stats')
]