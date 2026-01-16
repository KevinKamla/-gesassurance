from rest_framework import serializers
from .models import Branch, Client, Insurance, Profile

class BranchSerializer(serializers.ModelSerializer):
    class Meta:
        model = Branch
        fields = ['id', 'name', 'code', 'city']

class InsuranceSerializer(serializers.ModelSerializer):
    # On affiche le nom du type et du statut au lieu du code simple
    type_display = serializers.CharField(source='get_type_display', read_only=True)
    status_display = serializers.CharField(source='get_status_display', read_only=True)
    
    class Meta:
        model = Insurance
        fields = [
            'id', 'client', 'type', 'type_display', 'policy_number', 
            'start_date', 'end_date', 'premium_amount', 'status', 'status_display'
        ]
        read_only_fields = ['branch'] # La branche est gérée par la vue (auto-assignée)

    def validate(self, data):
        """Vérifie que la date de fin est après la date de début"""
        if data['start_date'] > data['end_date']:
            raise serializers.ValidationError(
                {"end_date": "La date de fin doit être postérieure à la date de début."}
            )
        return data

class ClientSerializer(serializers.ModelSerializer):
    # Inclure les assurances liées au client (optionnel, pour une vue détaillée)
    insurances = InsuranceSerializer(many=True, read_only=True)
    branch_name = serializers.ReadOnlyField(source='branch.name')

    class Meta:
        model = Client
        fields = [
            'id', 'first_name', 'last_name', 'email', 'phone', 
            'address', 'branch', 'branch_name', 'insurances'
        ]
        read_only_fields = ['branch']

    def validate_email(self, value):
        """Validation personnalisée pour l'email"""
        if Client.objects.filter(email=value).exists():
            raise serializers.ValidationError("Un client avec cet email existe déjà.")
        return value
    
# class ProfileSerializer(serializers.ModelSerializer):
#     # Inclure les assurances liées au client (optionnel, pour une vue détaillée)
#     insurances = InsuranceSerializer(many=True, read_only=True)
#     branch_name = serializers.ReadOnlyField(source='branch.name')

#     class Meta:
#         model = Profile
#         fields = [
#             'id', 'first_name', 'last_name', 'email', 'phone', 
#             'address', 'branch', 'branch_name', 'insurances'
#         ]
#         read_only_fields = ['branch']

#     def validate_email(self, value):
#         """Validation personnalisée pour l'email"""
#         if Client.objects.filter(email=value).exists():
#             raise serializers.ValidationError("Un client avec cet email existe déjà.")
#         return value