frappe.ui.form.on("Sales Invoice", {

    timbrar: function(frm) {

        frappe.call({
            method: "efacturamx.timbrado_naawa.timbrar",
            args: {
                docname: frm.doc.name,
                doctype: frm.doc.doctype,
                site_url: window.location.origin
            },
            freeze: true,
            freeze_message: "Timbrando...",
            callback: function(r) {

                frm.reload_doc().then(() => {

                    if (frm.doc.custom_uuid) {

                        frappe.msgprint({
                            title: __('Éxito'),
                            message: 'Factura Timbrada',
                            indicator: 'green'
                        });

                    } else if (frm.doc.error) {

                        frappe.msgprint({
                            title: __('Error en Timbrado'),
                            message: frm.doc.error,
                            indicator: 'red'
                        });

                    }

                });

            }
        });

    },

    cancelar_timbre: function(frm) {

        frappe.call({
            method: "efacturamx.timbrado_naawa.cancelar_timbre",
            args: {
                docname: frm.doc.name,
                doctype: frm.doc.doctype,
                site_url: window.location.origin
            },
            freeze: true,
            freeze_message: "Cancelando Timbre...",
            callback: function(r) {

                frm.reload_doc().then(() => {

                    if (frm.doc.uuid_cancelacion) {

                        frappe.msgprint({
                            title: __('Éxito'),
                            message: 'Factura Cancelada',
                            indicator: 'green'
                        });

                    } else if (frm.doc.error) {

                        frappe.msgprint({
                            title: __('Error en Cancelación'),
                            message: frm.doc.error,
                            indicator: 'red'
                        });

                    }

                });

            }
        });

    }

});