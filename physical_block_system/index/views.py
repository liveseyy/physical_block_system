from django.shortcuts import render
from .forms import PhysicalObjectiveForm


def index(request):
    objective_form = PhysicalObjectiveForm(request.POST)
    context = {'form': objective_form}
    if request.method == 'POST':
        # POST при отправке форма
        # В data словарь приходит с формы, уже можно обрабатывать
        # при отправке форм можно видеть в терминале print
        if objective_form.is_valid():
            context['result'] = 'Получается что-то что-то'
            print(objective_form.cleaned_data)
            # for field in objective_form.fields.keys():
            #     context[field] = getattr(objective_form, field)
        else:
            context['result'] = 'Не валидные данные'
    return render(request, 'index/index.html', context)
