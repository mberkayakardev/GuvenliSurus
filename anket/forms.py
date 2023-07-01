from django import forms
from .models import Anket
class AnketForm(forms.ModelForm):
    CHOICES=[('Kaza','Kaza'),('Tehlike','Tehlike')]
    sorun = forms.ChoiceField(choices=CHOICES, widget=forms.RadioSelect(attrs={'class': 'sorunSecim'}))  
    class Meta():
        model=Anket
        fields =["enlem","boylam","sorun","ana_unsur","benzerlik","alinabilecek_onlem"]




 
 