from django.db import models
from django.contrib.auth.models import User
from accounts.models import MyUser

class Lead(models.Model):
	name = models.CharField(max_length=50, blank=True, null=True)
	email = models.EmailField(max_length=254, unique=True)
	message = models.TextField()
	created_at = models.DateTimeField(auto_now_add=True)
	owner = models.ForeignKey(MyUser, related_name='leads', on_delete=models.CASCADE, null=True)


	def __str__(self):
		return self.name

	def __unicode__(self):
		return self.name
