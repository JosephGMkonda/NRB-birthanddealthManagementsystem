from django.db import models
from django.conf import settings



class BirthCertificatesModel(models.Model):
    FullName = models.CharField(max_length=100)
    Gender = models.CharField(max_length=20)
    PlaceOfDeath = models.CharField(max_length=100)
    CollectedBy = models.CharField(max_length=100)
    IdNumberOfCollector = models.CharField(max_length=20)
    created_at = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)