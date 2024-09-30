from rest_framework import serializers
from .models import BirthCertificateModel


class BirthCertificateModelSerializer(serializers.ModelSerializer):
    class Meta: 
        model = BirthCertificateModel

        fields = ['id','FullName', 'BenNumber', 'CollectedBy','idNumberCollector','created_at']
        
    def create(self, validated_data):
        validated_data['user'] = self.context['request'].user 
        return super().create(validated_data)
        