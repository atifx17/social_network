from django.contrib import admin
from .models import Post, LikeDislike
from django.utils.html import format_html


@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "user",
        "short_description",
        "created_at",
        "image_preview",
        "likes_count",
        "dislikes_count",
    )
    list_filter = ("created_at", "user")
    search_fields = ("description", "user__email")
    readonly_fields = ("created_at", "image_preview")

    def short_description(self, obj):
        return (
            obj.description[:50] + "..."
            if len(obj.description) > 50
            else obj.description
        )

    def likes_count(self, obj):
        return obj.likes

    def dislikes_count(self, obj):
        return obj.dislikes

    def image_preview(self, obj):
        if obj.image:
            return format_html(
                '<img src="{}" width="70" height="70" style="object-fit:cover; border-radius:5px;" />',
                obj.image.url,
            )
        return "(No image)"


@admin.register(LikeDislike)
class LikeDislikeAdmin(admin.ModelAdmin):
    list_display = ("id", "user", "post", "value")
    list_filter = ("value", "user")
    search_fields = ("user__email", "post__description")
