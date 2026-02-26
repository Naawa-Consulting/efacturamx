frappe.ui.form.on("Sales Invoice", {
    timbrar: function(frm) {
        frappe.call({
            method: "efacturamx.timbrado_naawa.timbrar",
            args: {
                docname: frm.doc.name,
                doctype: frm.doc.doctype,
                site_url: window.location.origin
            },
            callback: function(r) {
                frappe.msgprint(r.message || "Timbrando...");
                frm.reload_doc();
            }
        });
    },

    cancelar_timbre: function(frm) {
        frappe.call({
            method: "efacturamx.timbrado_naawa.timbrar",
            args: {
                docname: frm.doc.name,
                doctype: frm.doc.doctype,
                site_url:window.location.origin
            },
            callback: function(r) {
                frappe.msgprint(r.message || "Cancelando timbre...");
                frm.reload_doc();
            }
        });
    },

    error(frm) {
    if (frm.doc.error) {
        frappe.msgprint({
            title: __('Error en Timbrado'),
            message: frm.doc.error,
            indicator: 'red'
        });
    }
    }
});