import frappe
import requests
import json
from frappe.utils import cint

@frappe.whitelist()
def timbrar(docname, doctype):
    doc = frappe.get_doc(doctype, docname)

    company_name = "INDISTRIA ILUMINADORA DE ALMACENES"
    servidor_timbrado = frappe.db.get_value("Company", company_name, "servidor_timbrado")

    if not servidor_timbrado:
        frappe.throw(f"No se encontró el campo 'servidor_timbrado' en la empresa {company_name}")

    datos = json.loads(frappe.as_json(doc.as_dict()))

    webhook_url = servidor_timbrado
    headers = {"Content-Type": "application/json"}

    try:
        response = requests.post(webhook_url, json=datos, headers=headers)
        response.raise_for_status()
        return "webhook activado correctamente"
    except Exception as e:
        frappe.throw(f"Error al activar webhook: {str(e)}")
