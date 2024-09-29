from django.contrib import admin
from django.contrib.auth import login
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth.models import User
from django.utils.translation import gettext_lazy as _



class CustomUserAdmin(BaseUserAdmin):
    def save_model(self,request,obj,form,change):
        super().save_model(request,obj,form,change)

        if not change:
            login(request, obj)

        fieldsets = (
            (None, {"fields": ('username','password')}),
            (_('Personal info'), {'fields': ('first_name','last_name''email')}),
            (_('permissions'), {'fields': ('is_active','is_staff','is_superuser','groups','user_permissions')}),
            (_('important dates'), {'fields': ('last_login', 'date_joined')})
        )
        
admin.site.unregister(User)
admin.site.register(User, CustomUserAdmin)