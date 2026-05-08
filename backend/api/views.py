from django.http import JsonResponse
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import *
from rest_framework.permissions import AllowAny, IsAuthenticated
import requests
import os
from dotenv import load_dotenv
from rest_framework.views import APIView
import random

load_dotenv()

BASE_URL = os.getenv("BASE_URL")
API_KEY = os.getenv("API_KEY")
API_HOST = os.getenv("API_HOST")

# Create your views here.


class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

class TrackView(APIView):
    permission_classes = [AllowAny]
    def get(self, request, *args, **kwargs):
        url = f"{BASE_URL}track/72160317"
        headers = {
            "x-rapidapi-key": API_KEY,
            "x-rapidapi-host": API_HOST,
            "Content-Type": "application/json"
        }
        response = requests.get(url, headers=headers)
        data = response.json()
        serializer = TrackSerializer(data)
        return JsonResponse(serializer.data)

class PopulateView(APIView):
    permission_classes = [AllowAny]
    def get(self, request, *args, **kwargs):
        queries = ["love", "pop", "rock", "jazz", "hiphop", "party", "sad"]

        q = random.choice(queries)

        url = f"{BASE_URL}search?q={q}"
        headers = {
            "x-rapidapi-key": API_KEY,
            "x-rapidapi-host": API_HOST,
            "Content-Type": "application/json"
        }
        response = requests.get(url, headers=headers)
        data = response.json()
        
        # Remove duplicates by album ID
        seen_albums = set()
        unique_albums = []
        for song in data['data']:
            album_id = song['album']['id']
            if album_id not in seen_albums:
                seen_albums.add(album_id)
                unique_albums.append({
                    **song['album'],
                    'artist': song['artist']
                })
        
        serializer = AlbumSerializer(unique_albums[:4], many=True)
        return JsonResponse(serializer.data, safe=False)
    
class AlbumView(APIView):
    permission_classes = [AllowAny]
    def get(self, request, pk):
        url = f"{BASE_URL}album/{pk}"
        headers = {
            "x-rapidapi-key": API_KEY,
            "x-rapidapi-host": API_HOST,
            "Content-Type": "application/json"
        }
        response = requests.get(url, headers=headers)
        data = response.json()
        album_serializer = AlbumSerializer(data)
        track_serializer = TrackSerializer(data['tracks']['data'], many=True)
        return JsonResponse({**album_serializer.data, "tracks": track_serializer.data})