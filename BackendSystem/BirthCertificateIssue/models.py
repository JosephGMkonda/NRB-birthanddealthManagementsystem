from django.db import models
from django.conf import settings



class BirthCertificateModel(models.Model):
    FullName = models.CharField(max_length=100)
    Gender = models.CharField(max_length=20)
    BenNumber = models.CharField(max_length=100)
    CollectedBy = models.CharField(max_length=100)
    idNumberCollector = models.CharField(max_length=8)
    created_at = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)


    def __str__(self):
        return self.FullName
