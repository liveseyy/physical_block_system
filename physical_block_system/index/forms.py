from django import forms


class PhysicalObjectiveForm(forms.Form):
    m1 = forms.IntegerField(label='m₁', required=False)
    m2 = forms.IntegerField(label='m₂', required=False)
    a1 = forms.IntegerField(label='a₁', required=False)
    a2 = forms.IntegerField(label='a₂', required=False)

    m = forms.IntegerField(label='m', required=False)
