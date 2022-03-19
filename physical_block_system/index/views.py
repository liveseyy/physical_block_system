from django.shortcuts import render
from .forms import PhysicalObjectiveForm
from .utils import caclculate_blocks


def index(request):
    objective_form = PhysicalObjectiveForm(request.POST)
    context = {'form': objective_form}
    if request.method == 'POST':
        # POST при отправке форма
        # В data словарь приходит с формы, уже можно обрабатывать
        # при отправке форм можно видеть в терминале print
        if objective_form.is_valid():
            result = caclculate_blocks(objective_form.cleaned_data)
            for key, value in result.items():
                context[key] = value
        else:
            context['result_text'] = 'Не валидные данные'
    return render(request, 'index/index.html', context)
