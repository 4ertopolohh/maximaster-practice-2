from django.contrib.admin import AdminSite


class EmptyAdminSite(AdminSite):
    site_header = "Admin"
    site_title = "Admin"
    index_title = "Dashboard"


admin_site = EmptyAdminSite(name="empty_admin")
