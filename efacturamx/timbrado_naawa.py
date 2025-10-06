import frappe
import requests
import json
from frappe.utils import cint

@frappe.whitelist()
def timbrar(docname, doctype):
    doc = frappe.get_doc(doctype, docname)

    # Serializar usando el encoder de frappe (maneja datetime y otros tipos)
    datos = json.loads(frappe.as_json(doc.as_dict()))

    webhook_url = "https://n8n.naawaconsulting.dev/webhook-test/erpnext"
    headers = {"Content-Type": "application/json"}

    try:
        response = requests.post(webhook_url, json=datos, headers=headers)
        response.raise_for_status()
        return "webhook activado"
    except Exception as e:
        frappe.throw(f"Error al activar webhook: {str(e)}")