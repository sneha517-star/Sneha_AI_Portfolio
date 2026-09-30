from django.db import models
from image_cropping import ImageCropField, ImageRatioField

class Article(models.Model):
    title = models.CharField(max_length=255)
    excerpt = models.TextField()
    date = models.CharField(max_length=50, help_text="e.g. Sep 2026")
    link = models.URLField()
    tags = models.CharField(max_length=255, help_text="Comma-separated tags (e.g. AI, Career)")

    def get_tags_list(self):
        return [tag.strip() for tag in self.tags.split(',')] if self.tags else []

    def __str__(self):
        return self.title

class Project(models.Model):
    title = models.CharField(max_length=255)
    category = models.CharField(max_length=100, default='PROJECT', help_text="e.g. AI · RAG")
    description = models.TextField()
    link = models.URLField(blank=True, null=True)
    tags = models.CharField(max_length=255, help_text="Comma-separated tags")
    order = models.IntegerField(default=0, help_text="Lower number shows up first")

    def get_tags_list(self):
        return [tag.strip() for tag in self.tags.split(',')] if self.tags else []

    class Meta:
        ordering = ['order']

    def __str__(self):
        return self.title

class CommunityEvent(models.Model):
    EVENT_TYPES = (
        ('🎤 Speaker', 'Speaker'),
        ('💻 Hackathon', 'Hackathon'),
        ('🎟️ Conference', 'Conference'),
        ('🤝 Meetup', 'Meetup'),
        ('🛠️ Workshop', 'Workshop'),
        ('👀 Attendee', 'Attendee'),
    )
    title = models.CharField(max_length=255)
    event_type = models.CharField(max_length=50, choices=EVENT_TYPES, default='🤝 Meetup')
    date = models.CharField(max_length=50)
    description = models.TextField()
    image = ImageCropField(upload_to='community_images/', blank=True, null=True)
    cropping = ImageRatioField('image', '400x220')
    link = models.URLField(blank=True, null=True, help_text="Link to LinkedIn post, GitHub, or event page")

    def __str__(self):
        return self.title

class Certification(models.Model):
    TYPE_CHOICES = (
        ('Award', 'Award'),
        ('Certification', 'Certification'),
    )
    title = models.CharField(max_length=255)
    type = models.CharField(max_length=50, choices=TYPE_CHOICES, default='Certification')
    issuer = models.CharField(max_length=255)
    date_issued = models.CharField(max_length=50, help_text="e.g. Sep 2026")
    description = models.TextField(blank=True, null=True, help_text="Details about the certification")
    link = models.URLField(blank=True, null=True)

    def __str__(self):
        return self.title
