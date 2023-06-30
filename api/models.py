from django.contrib.auth.models import AbstractUser
from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator

# Create your models here.
class User(AbstractUser):
    max_entries_per_page_setting = models.IntegerField(
        default=10,
        validators=[
            MinValueValidator(1)
        ]
    )

class Dream(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="dreams")
    title = models.CharField(max_length=100)
    date = models.DateField()
    desc = models.TextField()
    rating =  models.IntegerField(
        default=0,
        validators=[
            MaxValueValidator(5),
            MinValueValidator(1)
        ]
    )

    def __str__(self):
        return f"{self.user.username}, {self.date}, {self.title}"