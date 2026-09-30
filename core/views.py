from django.shortcuts import render
from .models import Article, Project, CommunityEvent, Certification

def index(request):
    articles = Article.objects.all().order_by('-id')[:3]
    projects = Project.objects.all()[:3]
    events = CommunityEvent.objects.all().order_by('-id')[:3]
    certifications = Certification.objects.all().order_by('-id')[:3]
    return render(request, 'index.html', {
        'articles': articles,
        'projects': projects,
        'events': events,
        'certifications': certifications
    })

def all_articles(request):
    articles = Article.objects.all().order_by('-id')
    return render(request, 'articles.html', {
        'articles': articles
    })

def all_projects(request):
    projects = Project.objects.all()
    return render(request, 'projects.html', {
        'projects': projects
    })

def freelance(request):
    return render(request, 'freelance.html')

def all_certifications(request):
    certifications = Certification.objects.all().order_by('-id')
    return render(request, 'certifications.html', {
        'certifications': certifications
    })
