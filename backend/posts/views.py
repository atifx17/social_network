from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from .models import Post, LikeDislike
from .serializers import PostSerializer, CreatePostSerializer


class CreatePostView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        serializer = CreatePostSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response({"message": "Post created successfully"}, status=201)
        return Response(serializer.errors, status=400)


class AllPostsView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        posts = Post.objects.all().order_by("-created_at")
        serializer = PostSerializer(posts, many=True, context={"request": request})
        return Response(serializer.data)


class UserPostsView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        posts = Post.objects.filter(user=request.user).order_by("-created_at")
        serializer = PostSerializer(posts, many=True, context={"request": request})
        return Response(serializer.data)


class DeletePostView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def delete(self, request, post_id):
        try:
            post = Post.objects.get(id=post_id)
        except Post.DoesNotExist:
            return Response({"error": "Post not found"}, status=404)

        if post.user != request.user:
            return Response(
                {"error": "You are not allowed to delete this post"},
                status=403,
            )

        post.delete()
        return Response({"message": "Post deleted successfully"}, status=200)


class LikeDislikeView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, post_id):
        value = request.data.get("value")
        if value not in [1, -1]:
            return Response({"error": "Invalid value"}, status=400)

        try:
            post = Post.objects.get(id=post_id)
        except Post.DoesNotExist:
            return Response({"error": "Post not found"}, status=404)

        reaction, created = LikeDislike.objects.get_or_create(
            user=request.user, post=post, defaults={"value": value}
        )

        if not created:
            reaction.value = value
            reaction.save()

        return Response({"message": "Reaction saved"})
