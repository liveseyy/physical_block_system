from django import forms


class PhysicalObjectiveForm(forms.Form):
    m1 = forms.IntegerField(label='m₁')
    m2 = forms.IntegerField(label='m₂')
    m = forms.IntegerField(label='m')

    T1 = forms.IntegerField(label='T₁')
    T2 = forms.IntegerField(label='T₂')

    S_table = forms.IntegerField(label='Длина стола')
