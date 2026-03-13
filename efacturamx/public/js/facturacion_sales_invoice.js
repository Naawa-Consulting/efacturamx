frappe.ui.form.on("Sales Invoice", {

    timbrar: function(frm) {

        const start_time = Date.now();
        const min_duration = 3000;

        frappe.dom.freeze("Timbrando...");

        frappe.call({
            method: "efacturamx.timbrado_naawa.timbrar",
            args: {
                docname: frm.doc.name,
                doctype: frm.doc.doctype,
                site_url: window.location.origin
            },
            callback: function(r) {

                const elapsed = Date.now() - start_time;
                const remaining = Math.max(0, min_duration - elapsed);

                setTimeout(() => {

                    frm.reload_doc().then(() => {

                        frappe.dom.unfreeze();

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

                }, remaining);

            }
        });

    },

    cancelar_timbre: function(frm) {

        const start_time = Date.now();
        const min_duration = 3000;

        frappe.dom.freeze("Cancelando Timbre...");

        frappe.call({
            method: "efacturamx.timbrado_naawa.timbrar",
            args: {
                docname: frm.doc.name,
                doctype: frm.doc.doctype,
                site_url: window.location.origin
            },
            callback: function(r) {

                const elapsed = Date.now() - start_time;
                const remaining = Math.max(0, min_duration - elapsed);

                setTimeout(() => {

                    frm.reload_doc().then(() => {

                        frappe.dom.unfreeze();

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

                }, remaining);

            }
        });

    }

});