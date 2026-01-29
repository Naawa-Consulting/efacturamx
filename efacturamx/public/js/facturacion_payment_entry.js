frappe.ui.form.on("Payment Entry", {
    timbrar_complemento: function(frm) {
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

    cancelar_complemento: function(frm) {
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
    }
});
frappe.ui.form.on('Payment Entry', {
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