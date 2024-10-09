from rest_framework import serializers
from .models import DeathCertificatesModel


class DeathCertificateModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = DeathCertificatesModel

        fields = ['id','FullName','Gender', 'PlaceOfDeath', 'CollectedBy','IdNumberOfCollector','created_at']
    def create(self, validated_data):
        validated_data['user'] = self.context['request'].user
        return super().create(validated_data)