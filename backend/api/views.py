from django.shortcuts import render
from rest_framework import generics
from .models import *
from .serializers import *

# Branch
class BranchListCreateView(generics.ListCreateAPIView):
    queryset = Branch.objects.all()
    serializer_class = BranchSerializer
 
    
class BranchRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Branch.objects.all()
    serializer_class = BranchSerializer
    lookup_field = "id"
  
# Client   
class ClientListCreateView(generics.ListCreateAPIView):
    queryset = Client.objects.all()
    serializer_class = ClientSerializer
 
class ClientRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Client.objects.all()
    serializer_class = ClientSerializer
    lookup_field = "id"
    
  
# Insurance  
class InsuranceListCreateView(generics.ListCreateAPIView):
    queryset = Insurance.objects.all()
    serializer_class = InsuranceSerializer
     
class InsuranceRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Insurance.objects.all()
    serializer_class = InsuranceSerializer
    lookup_field = "id"
   

      
# Profiles  
class ProfilesListCreateView(generics.ListCreateAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfilesSerializer
     
class ProfilesRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfilesSerializer
    lookup_field = "id"
   
    
    
    
    
    
    
# class ProfileListCreateView(generics.ListCreateAPIView):
#     queryset = Profile.objects.all()
#     serializer_class = Profiles
    
# class ProfileRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
#     queryset = Branch.objects.all()
#     serializer_class = BranchSerializer
#     lookup_field = "id"
    
    