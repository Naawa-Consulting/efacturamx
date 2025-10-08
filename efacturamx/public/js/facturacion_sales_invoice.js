frappe.ui.form.on("Sales Invoice", {
    timbrar: function(frm) {
        frappe.call({
            method: "efacturamx.timbrado_naawa.timbrar",
            args: {
                docname: frm.doc.name,
                doctype: frm.doc.doctype
            },
            callback: function(r) {
                frappe.msgprint(r.message || "Webhook ejecutado");
                frm.reload_doc();
            }
        });
    }
});
