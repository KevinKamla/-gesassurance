from django.contrib import admin
from django.urls import path, include
from . import views

urlpatterns = [
    path('branch/',views.BranchListCreateView.as_view()),
    path('branch/<uuid:id>/',views.BranchRetrieveUpdateDestroyView.as_view()),
    path('profiles/',views.ProfilesListCreateView.as_view()),
    path('profiles/<uuid:id>/',views.ProfilesRetrieveUpdateDestroyView.as_view()),
    path('client/',views.ClientListCreateView.as_view()),
    path('client/<uuid:id>/',views.ClientRetrieveUpdateDestroyView.as_view()),
    path('insurance/',views.InsuranceListCreateView.as_view()),
    path('insurance/<uuid:id>/',views.InsuranceRetrieveUpdateDestroyView.as_view()),
]
