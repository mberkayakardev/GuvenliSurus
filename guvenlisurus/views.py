from django.shortcuts import render,redirect
from django.contrib import messages
 
def index(request):
    return render(request,"index.html")
def hakkında(request):
    return render(request,"hakkında.html")

def hata(request):
    messages.success(request,"Bu maile ait kullanıcı bulunmaktadır.")
    return redirect("/user/giris")