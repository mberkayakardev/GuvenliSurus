from django.shortcuts import render,redirect
from django.contrib.auth.models import User
from django.contrib.auth import login,authenticate,logout
from django.contrib.auth.hashers import make_password
from django.contrib import messages
from anket.models import Anket
from django.contrib.auth.decorators import login_required
# Create your views here.

@login_required(login_url="/user/giris")
def kisisel(request):
    return render (request,"kisisel.html")

@login_required(login_url="/user/giris")
def sil(request):
    try:
        silinananketlerid=User.objects.get(username="silinenanketler")
        Anket.objects.filter(author_id=request.user.id).update(author_id=silinananketlerid.id)
        u = User.objects.get(username = request.user.username)
        u.delete()
        messages.success(request, "Kullanıcı Silinmiştir")   
        logout(request)
        return redirect('/')

    except User.DoesNotExist:
        messages.error(request, "Kullanıcı Mevcut değildir")    
        return redirect('/user/logout/')

    except Exception as e: 
        messages.error(request, e)    
        return redirect('/')

    return render(request, 'index.html') 

 
@login_required(login_url="/user/giris")
def kullanıcı_arayuzu(request):
    return render (request,"Kullanıcı_arayuzu.html")

def girisyap(request):
    
         
        return render (request,"giris.html",{})

@login_required(login_url="/user/giris")
def cıkıs(request):
    logout(request)
    messages.success(request,"Çıkış yapıldı")
    return redirect("/user/giris")

 