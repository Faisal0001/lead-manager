from rest_framework import routers
from .api import LeadViewSet

app_name = 'leads'

router = routers.DefaultRouter()

router.register('', viewset=LeadViewSet, basename='lead')

urlpatterns = router.urls
