# Copyright (c) 2022, Aguacate Codes and contributors
# For license information, please see license.txt

# import frappe
from frappe.model.document import Document
import frappe


class AguacateDashboard(Document):
    pass


@frappe.whitelist()
def getSectionBreak(dt):
    if dt:
        return frappe.db.get_list('DocField', filters={ "fieldtype": "Section Break", "parent": dt, "label": ("!=", "") }, fields=['*'], order_by='idx asc', as_list=False )
    else:
        return
