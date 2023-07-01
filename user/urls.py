from django.contrib import admin
from django.urls import path,include
from user.views import kullanıcı_arayuzu,girisyap,cıkıs,sil,kisisel
from django.contrib.auth import views as auth_views 
 


app_name="user"

urlpatterns = [
 
    path('kullanıcı_arayuzu/',kullanıcı_arayuzu),
    path('giris/',girisyap),
    path('logout/',cıkıs),
    path('sil/',sil),
    path('kisisel/',kisisel),
 
 




    
]
 
