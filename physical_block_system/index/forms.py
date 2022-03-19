from django import forms


class PhysicalObjectiveForm(forms.Form):
    m1 = forms.IntegerField(label='m₁', required=False)
    m2 = forms.IntegerField(label='m₂', required=False)
    m = forms.IntegerField(label='m', required=False)

    T1 = forms.IntegerField(label='T₁', required=False)
    T2 = forms.IntegerField(label='T₂', required=False)

    S_table = forms.IntegerField(label='Длина стола', required=False)
