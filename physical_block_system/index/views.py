from django.shortcuts import render
from .forms import PhysicalObjectiveForm


def index(request):
    objective_form = PhysicalObjectiveForm()
    context = {'form': objective_form}
    if request.method == 'POST':
        # POST при отправке форма
        # В data словарь приходит с формы, уже можно обрабатывать
        data = request.POST
        # при отправке форм можно видеть в терминале print
        print(data)
        for field in objective_form.fields.keys():
            context[field] = data.get(field)
        context['result'] = 'Получается что-то что-то'
    return render(request, 'index/index.html', context)
