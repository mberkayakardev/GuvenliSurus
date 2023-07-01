from django.contrib import admin
from django.urls import path 
from anket.views import anketekle,anketyonetimi,anketislem,anketdetay,anketsil,anketguncelle

app_name ="anket"

urlpatterns = [
    path('admin/', admin.site.urls),
    path('anketekle/',anketekle),
    path('anketyonetimi/',anketyonetimi),
    path('anketislem/',anketislem),
    path('detay/<int:id>',anketdetay),
    path('sil/<int:id>',anketsil),
    path('guncelle/<int:id>',anketguncelle),
]   