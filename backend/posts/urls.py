from django.urls import path
from .views import (
    CreatePostView,
    UserPostsView,
    AllPostsView,
    DeletePostView,
    LikeDislikeView,
)

urlpatterns = [
    path("create/", CreatePostView.as_view()),
    path("my-posts/", UserPostsView.as_view()),
    path("all/", AllPostsView.as_view()),
    path("delete/<int:post_id>/", DeletePostView.as_view()),
    path("react/<int:post_id>/", LikeDislikeView.as_view()),
]
