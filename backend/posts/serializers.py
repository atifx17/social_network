from rest_framework import serializers
from .models import Post


class CreatePostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ["description", "image"]


class PostSerializer(serializers.ModelSerializer):
    user = serializers.CharField(source="user.full_name", read_only=True)
    user_profile_pic = serializers.SerializerMethodField()
    image = serializers.SerializerMethodField()
    likes = serializers.SerializerMethodField()
    dislikes = serializers.SerializerMethodField()
    created_at = serializers.SerializerMethodField()
    is_owner = serializers.SerializerMethodField()

    class Meta:
        model = Post
        fields = [
            "id",
            "user",
            "is_owner",
            "user_profile_pic",
            "description",
            "image",
            "created_at",
            "likes",
            "dislikes",
        ]

    def get_created_at(self, obj):
        return obj.created_at.date().strftime("%Y-%m-%d")

    def get_user_profile_pic(self, obj):
        request = self.context.get("request")
        if obj.user.profile_pic:
            return request.build_absolute_uri(obj.user.profile_pic.url)
        return None

    def get_image(self, obj):
        request = self.context.get("request")
        if obj.image:
            return request.build_absolute_uri(obj.image.url)
        return None

    def get_likes(self, obj):
        return obj.reactions.filter(value=1).count()

    def get_dislikes(self, obj):
        return obj.reactions.filter(value=-1).count()

    def get_is_owner(self, obj):
        request = self.context.get("request")
        return request and request.user == obj.user
