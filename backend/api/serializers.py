from django.contrib.auth.models import User
from rest_framework import serializers

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'password']
        extra_kwargs = {
            'password': {'write_only': True}
        }
    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

class ArtistSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    name = serializers.CharField(max_length=100)

class AlbumSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    cover = serializers.URLField(source='cover_big')
    title = serializers.CharField(max_length=100)
    artist = ArtistSerializer()

class TrackSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    cover = serializers.URLField(source='album.cover_big')
    title = serializers.CharField(max_length=100)
    duration = serializers.IntegerField()
    preview = serializers.URLField()

    artist = ArtistSerializer()

    