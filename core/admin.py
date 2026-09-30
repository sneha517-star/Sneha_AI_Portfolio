from django.contrib import admin
from image_cropping import ImageCroppingMixin
from .models import Article, Project, CommunityEvent, Certification

class CommunityEventAdmin(ImageCroppingMixin, admin.ModelAdmin):
    pass

admin.site.register(Article)
admin.site.register(Project)
admin.site.register(CommunityEvent, CommunityEventAdmin)
admin.site.register(Certification)
