from django.contrib.auth import authenticate
from rest_framework import serializers
from .models import MyUser

class UserSerializer(serializers.ModelSerializer):
	class Meta:
		model = MyUser
		fields = ('id', 'username', 'email',)


class RegisterSerializer(serializers.ModelSerializer):
	class Meta:
		model = MyUser
		fields = ('id', 'username', 'email', 'password',)
		extra_kwargs = {'password': {'write_only': True}}

	def create(self, validated_data):
		user = MyUser.objects.create_user(username =validated_data['username'], email = validated_data['email'], password = validated_data['password'])

		return user



class LoginSerializer(serializers.Serializer):
	email = serializers.CharField()
	password = serializers.CharField()

	def validate(self, data):
		user = authenticate(**data)
		if user and user.is_active:
			return user
		return serializers.ValidationError('Incorrect Credentials')
