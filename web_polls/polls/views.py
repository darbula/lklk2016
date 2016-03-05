# -*- coding: utf-8 -*-
from django.http import Http404
from django.http import HttpResponse, HttpResponseRedirect
from models import Choice, Question
from django.template import loader
from django.shortcuts import get_list_or_404, get_object_or_404, render
from django.core.urlresolvers import reverse


def index(request):
    latest_question_list = Question.objects.order_by('-pub_date')[:5]
    template = loader.get_template('polls/index.html')
    context = {
        'latest_question_list': latest_question_list,
    }
    return HttpResponse(template.render(context, request))


def detail(request, question_id):
    try:
        question = Question.objects.get(pk=question_id)
    except Question.DoesNotExist:
        raise Http404("Trazeno pitanje ne postoji.")
    return render(request, 'polls/detail.html', {'question': question})


def results(request, question_id):
    question = get_object_or_404(Question, pk=question_id)
    return render(request, 'polls/results.html', {'question': question})


def vote(request, question_id):
    p = get_object_or_404(Question, pk=question_id)
    try:
        selected_choice = p.choice_set.get(pk=request.POST['choice'])
    except (KeyError, Choice.DoesNotExist):
        # Ponovno ispisi form uz poruku o pogresci
        return render(request, 'polls/detail.html', {
            'question': p,
            'error_message': "Molimo izaberite jedan od ponudjenih odgovora.",
        })
    else:
        selected_choice.votes += 1
        selected_choice.save()
        # Vracanje HttpResponseRedirect objekta nakon uspjesnog slanja podataka
        # onemogucava visestruko slanje istih podataka klikom na Back u browseru.
        return HttpResponseRedirect(reverse('polls:results', args=(p.id,)))


def reset(request):
    questions = get_list_or_404(Question)
    for question in questions:
        for choice in question.choice_set.all():
            choice.votes = 0
            choice.save()
    return HttpResponseRedirect(reverse('polls:index'))

