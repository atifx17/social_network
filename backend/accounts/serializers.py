from rest_framework import serializers
from django.contrib.auth import authenticate
from .models import User


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = [
            "email",
            "full_name",
            "password",
            "date_of_birth",
            "profile_pic",
        ]

    def create(self, validated_data):
        password = validated_data.pop("password")

        user = User.objects.create_user(password=password, **validated_data)

        return user


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()

    def validate(self, data):
        email = data.get("email")
        password = data.get("password")

        user = authenticate(username=email, password=password)

        if not user:
            raise serializers.ValidationError("Invalid email or password")

        data["user"] = user
        return data


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["email", "full_name", "date_of_birth", "profile_pic"]
        read_only_fields = ["email"]

        extra_kwargs = {
            "profile_pic": {"required": False},
        }
