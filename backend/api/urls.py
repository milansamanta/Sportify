from django.urls import path
from . import views

from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('register/', views.CreateUserView.as_view(), name='register'),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('populate/', views.PopulateView.as_view(), name='populate'),
    path('albums/<int:pk>/', views.AlbumView.as_view(), name='album-detail'),
]