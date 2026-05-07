from django.contrib.admin import AdminSite
from django.http import HttpResponseRedirect


class EmptyAdminSite(AdminSite):
    site_header = "Admin"
    site_title = "Admin"
    index_title = "Dashboard"

    def has_permission(self, request):
        return True

    def login(self, request, extra_context=None):
        return HttpResponseRedirect("/admin/")


admin_site = EmptyAdminSite(name="empty_admin")
