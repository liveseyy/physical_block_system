from django.core.exceptions import ValidationError
from django import forms


class PhysicalObjectiveForm(forms.Form):
    m1 = forms.FloatField(label='m₁')
    m2 = forms.FloatField(label='m₂')
    m = forms.FloatField(label='m, центр')

    t = forms.FloatField(label='Время')

    def clean(self):
        errors = {}
        for key, value in self.cleaned_data.items():
            if value <= 0:
                errors[key] = "Значения должны быть > 0"
        if errors:
            raise ValidationError(errors)
