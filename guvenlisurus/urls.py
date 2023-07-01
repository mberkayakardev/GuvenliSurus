"""guvenlisurus URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path,include
from anket.views import navigasyon
from guvenlisurus.views import index,hakkında,hata
from user.views import girisyap
 
from user.views import girisyap 
 

from django.conf import settings
from django.conf.urls.static import static

from django.contrib.auth import views as auth_views
from django.views.generic import TemplateView


urlpatterns = [
    path('admin/', admin.site.urls),
    path('',index,name="index"),
    path('navigasyon/',navigasyon),
    path('hakkında/',hakkında),
    path('user/',include("user.urls")),
    path ('anket/',include("anket.urls")),
 
    path('accounts/social/signup/', hata), 
    path('accounts/login/', girisyap), 
    path('accounts/', include('allauth.urls')), 

 


    

]   

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

    