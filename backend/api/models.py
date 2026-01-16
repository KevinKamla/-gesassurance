import uuid
from django.db import models
from django.contrib.auth.models import User
from django.db.models import Q

# --- Manager pour le filtrage automatique ---
class BranchSpecificManager(models.Manager):
    """
    Ce manager filtre automatiquement les requêtes en fonction de la 
    succursale de l'utilisateur connecté.
    """
    def for_user(self, user):
        # Si c'est un superutilisateur ou membre de la DG, il voit tout
        if user.is_superuser or user.profile.branch.code == 'DG':
            return self.get_queryset()
        # Sinon, on filtre par la succursale de l'utilisateur
        return self.get_queryset().filter(branch=user.profile.branch)

# --- Modèles de l'application ---

class Branch(models.Model):
    BRANCH_CHOICES = [
        ('DG', 'Direction Générale'),
        ('DLA', 'INTIA-Douala'),
        ('YDE', 'INTIA-Yaounde'),
    ]
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=100)
    code = models.CharField(max_length=10, choices=BRANCH_CHOICES, unique=True)
    city = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.name} ({self.code})"

class Profile(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    branch = models.ForeignKey(Branch, on_delete=models.PROTECT)
    phone = models.CharField(max_length=20, blank=True)

    def __str__(self):
        return f"{self.user.username} - {self.branch.code}"

class Client(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=20)
    address = models.TextField()
    branch = models.ForeignKey(Branch, on_delete=models.CASCADE, related_name='clients')
    created_at = models.DateTimeField(auto_now_add=True)

    objects = BranchSpecificManager() # Manager personnalisé

    def __str__(self):
        return f"{self.first_name} {self.last_name}"

class Insurance(models.Model):
    INSURANCE_TYPES = [
        ('AUTO', 'Automobile'),
        ('SANTE', 'Santé'),
        ('VIE', 'Vie'),
        ('INCENDIE', 'Incendie'),
    ]
    STATUS_CHOICES = [
        ('ACTIVE', 'Active'),
        ('EXPIRED', 'Expirée'),
        ('CANCELED', 'Résiliée'),
    ]
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    client = models.ForeignKey(Client, on_delete=models.CASCADE, related_name='insurances')
    type = models.CharField(max_length=20, choices=INSURANCE_TYPES)
    policy_number = models.CharField(max_length=50, unique=True)
    start_date = models.DateField()
    end_date = models.DateField()
    premium_amount = models.DecimalField(max_digits=12, decimal_places=2)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='ACTIVE')
    # On duplique la branch ici pour faciliter les requêtes de reporting par succursale
    branch = models.ForeignKey(Branch, on_delete=models.CASCADE)

    objects = BranchSpecificManager() # Manager personnalisé

    def __str__(self):
        return f"{self.policy_number} - {self.client.last_name}"