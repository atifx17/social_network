from django.db import models
from django.conf import settings


class Post(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    description = models.TextField()
    image = models.ImageField(upload_to="posts/", null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Post by {self.user.email}"

    @property
    def likes(self):
        return self.reactions.filter(value=1).count()

    @property
    def dislikes(self):
        return self.reactions.filter(value=-1).count()


class LikeDislike(models.Model):
    LIKE = 1
    DISLIKE = -1

    VALUE_CHOICES = (
        (LIKE, "Like"),
        (DISLIKE, "Dislike"),
    )

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name="reactions")
    value = models.SmallIntegerField(choices=VALUE_CHOICES)

    class Meta:
        unique_together = ("user", "post")

    def __str__(self):
        return f"{self.user.email} reacted {self.value}"
