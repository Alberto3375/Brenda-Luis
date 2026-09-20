/* =====================================================
   FIREBASE — CONFIG REAL
===================================================== */

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js";
import {
    getFirestore,
    collection,
    addDoc,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyDraLBBSM9IrRMb-kwTRHhe2cmI6Mh1pyo",
    authDomain: "bodamonce-luis.firebaseapp.com",
    projectId: "bodamonce-luis",
    storageBucket: "bodamonce-luis.firebasestorage.app",
    messagingSenderId: "636124812998",
    appId: "1:636124812998:web:a0607315cafd9c34b9a9c7",
    measurementId: "G-YF2HE2JCHV"
};

const app = initializeApp(firebaseConfig);
const db  = getFirestore(app);
const rsvpCollection = collection(db, "rsvp");


/* =====================================================
   DOM LISTO
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       IDIOMA — ES / EN
    ===================================================== */

    var translations = {
        es: {
            preloader: "Cargando invitación",
            navEvent: "Ceremonia",
            navMap: "Ubicación",
            navSchedule: "Itinerario",
            navRsvp: "RSVP",

            heroEyebrow: "Estás invitado a celebrar",
            heroSubtitle: "Nuestra Boda",
            heroDay: "Sábado",
            heroCity: "Sacramento, California",
            heroScroll: "Descubrir",

            eventsKicker: "Acompáñanos",
            eventsTitle: "El gran día",
            ceremonyTitle: "Ceremonia",
            ceremonyDate: "Sábado 28 · Agosto · 2027",
            receptionTitle: "Recepción",
            receptionDate: "Después de la ceremonia",
            viewLocation: "Ver ubicación",

            mapKicker: "Cómo llegar",
            mapTitle: "Ubicaciones",
            mapTabCeremony: "Ceremonia",
            mapTabReception: "Recepción",

            scheduleKicker: "Programa",
            scheduleTitle: "Itinerario del día",
            sched1Title: "Ceremonia",
            sched2Title: "Recepción",
            sched3Title: "Comida",
            sched4Title: "Bar",
            sched5Title: "Música / Baile",
            sched6Title: "Fin del evento",

            rsvpKicker: "Confirmación",
            rsvpTitle: "¿Nos acompañas?",

            formNameLabel: "Nombre completo",
            formNamePlaceholder: "Ej. María López",
            formCountLabel: "Número de personas (incluyéndote)",
            formSubmit: "Confirmar asistencia",
            formSubmitting: "Guardando...",

            ticketKicker: "Invitación confirmada",
            ticketTitle: "Pase de entrada",
            ticketGuest: "Invitado",
            ticketPeople: "Personas",
            ticketEvent: "Evento",
            ticketDate: "Fecha",
            ticketFolio: "Folio",
            ticketQrNote: "Presenta este código el día del evento.",
            ticketDownload: "Descargar pase",
            ticketReset: "Editar datos",

            errName: "Por favor escribe tu nombre completo.",
            errCount: "Indica al menos 1 persona.",
            errMax: "Máximo 10 personas por invitación.",
            errSave: "No se pudo guardar la confirmación. Intenta de nuevo.",
            personSingular: "persona",
            personPlural: "personas"
        },

        en: {
            preloader: "Loading invitation",
            navEvent: "Ceremony",
            navMap: "Location",
            navSchedule: "Schedule",
            navRsvp: "RSVP",

            heroEyebrow: "You are invited to celebrate",
            heroSubtitle: "Our Wedding",
            heroDay: "Saturday",
            heroCity: "Sacramento, California",
            heroScroll: "Discover",

            eventsKicker: "Join us",
            eventsTitle: "The big day",
            ceremonyTitle: "Ceremony",
            ceremonyDate: "Saturday, August 28 · 2027",
            receptionTitle: "Reception",
            receptionDate: "After the ceremony",
            viewLocation: "View location",

            mapKicker: "Getting there",
            mapTitle: "Locations",
            mapTabCeremony: "Ceremony",
            mapTabReception: "Reception",

            scheduleKicker: "Program",
            scheduleTitle: "Schedule of the day",
            sched1Title: "Ceremony",
            sched2Title: "Reception",
            sched3Title: "Dinner",
            sched4Title: "Bar",
            sched5Title: "Music / Dancing",
            sched6Title: "End of the event",

            rsvpKicker: "RSVP",
            rsvpTitle: "Will you join us?",

            formNameLabel: "Full name",
            formNamePlaceholder: "e.g. Mary Johnson",
            formCountLabel: "Number of guests (including you)",
            formSubmit: "Confirm attendance",
            formSubmitting: "Saving...",

            ticketKicker: "Invitation confirmed",
            ticketTitle: "Entry pass",
            ticketGuest: "Guest",
            ticketPeople: "Guests",
            ticketEvent: "Event",
            ticketDate: "Date",
            ticketFolio: "Reference",
            ticketQrNote: "Show this code on the day of the event.",
            ticketDownload: "Download pass",
            ticketReset: "Edit data",

            errName: "Please enter your full name.",
            errCount: "Please indicate at least 1 guest.",
            errMax: "Maximum 10 guests per invitation.",
            errSave: "Could not save confirmation. Please try again.",
            personSingular: "guest",
            personPlural: "guests"
        }
    };

    var currentLang = "es";
    var t = translations[currentLang];

    function applyLanguage(lang) {
        currentLang = lang;
        t = translations[lang];
        document.documentElement.lang = lang;

        document.querySelectorAll("[data-i18n]").forEach(function (el) {
            var key = el.getAttribute("data-i18n");
            if (t[key] !== undefined) el.textContent = t[key];
        });

        document.querySelectorAll("[data-i18n-placeholder]").forEach(function (el) {
            var key = el.getAttribute("data-i18n-placeholder");
            if (t[key] !== undefined) el.setAttribute("placeholder", t[key]);
        });

        var langCurrent = document.querySelector(".lang-current");
        if (langCurrent) langCurrent.textContent = lang.toUpperCase();
    }

    var langButton = document.getElementById("langButton");
    if (langButton) {
        langButton.addEventListener("click", function () {
            applyLanguage(currentLang === "es" ? "en" : "es");
        });
    }


    /* PRELOADER */
    function hidePreloader() {
        var preloader = document.getElementById("preloader");
        if (preloader) preloader.classList.add("hidden");
    }
    window.addEventListener("load", function () { setTimeout(hidePreloader, 1200); });
    setTimeout(hidePreloader, 2500);


    /* NAVBAR SCROLL */
    var navbar = document.getElementById("navbar");
    window.addEventListener("scroll", function () {
        if (!navbar) return;
        if (window.scrollY > 60) navbar.classList.add("scrolled");
        else navbar.classList.remove("scrolled");
    });


    /* SMOOTH SCROLL */
    document.querySelectorAll('a[href^="#"]').forEach(function (link) {
        link.addEventListener("click", function (e) {
            var id = this.getAttribute("href");
            if (!id || id === "#" || id.length < 2) return;
            var target = document.querySelector(id);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: "smooth", block: "start" });
            }
        });
    });


    /* MAPA TABS */
    var mapTabs = document.querySelectorAll(".map-tab");
    var mapFrames = document.querySelectorAll(".map-frame");
    mapTabs.forEach(function (tab) {
        tab.addEventListener("click", function () {
            var target = tab.getAttribute("data-map");
            mapTabs.forEach(function (x) { x.classList.remove("is-active"); });
            tab.classList.add("is-active");
            mapFrames.forEach(function (frame) {
                var id = "map" + target.charAt(0).toUpperCase() + target.slice(1);
                if (frame.id === id) frame.classList.add("is-active");
                else frame.classList.remove("is-active");
            });
        });
    });


    /* REVEAL */
    if ("IntersectionObserver" in window) {
        var revealObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    revealObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12 });

        document.querySelectorAll(
            ".section-head, .event-card, .timeline-list li, .rsvp-inner, .map-wrapper"
        ).forEach(function (el) {
            el.classList.add("reveal");
            revealObserver.observe(el);
        });
    }


    /* MÚSICA */
    var music       = document.getElementById("weddingMusic");
    var musicButton = document.getElementById("musicButton");
    var musicIcon   = musicButton ? musicButton.querySelector(".music-icon") : null;
    var playing     = false;

    if (musicButton && music && musicIcon) {
        musicButton.addEventListener("click", function () {
            if (!playing) {
                music.play().catch(function () {});
                musicIcon.textContent = "❚❚";
                playing = true;
            } else {
                music.pause();
                musicIcon.textContent = "♫";
                playing = false;
            }
        });
    }


    /* =====================================================
       RSVP — FIREBASE + QR
    ===================================================== */

    var form       = document.getElementById("rsvpForm");
    var nameInput  = document.getElementById("guestName");
    var countInput = document.getElementById("guestCount");
    var errorBox   = document.getElementById("rsvpError");

    var ticket      = document.getElementById("ticket");
    var ticketName  = document.getElementById("ticketName");
    var ticketCount = document.getElementById("ticketCount");
    var ticketCode  = document.getElementById("ticketCode");
    var qrContainer = document.getElementById("qrcode");

    var downloadBtn = document.getElementById("downloadTicket");
    var resetBtn    = document.getElementById("resetTicket");
    var submitBtn   = document.getElementById("rsvpSubmit");

    if (!form) return;


    document.querySelectorAll(".counter-btn").forEach(function (btn) {
        btn.addEventListener("click", function () {
            var value = parseInt(countInput.value, 10) || 1;
            var action = btn.getAttribute("data-action");
            if (action === "inc" && value < 10) value++;
            if (action === "dec" && value > 1)  value--;
            countInput.value = value;
        });
    });


    function showError(msg) {
        if (!errorBox) return;
        errorBox.textContent = msg;
        errorBox.hidden = false;
    }
    function clearError() {
        if (!errorBox) return;
        errorBox.textContent = "";
        errorBox.hidden = true;
    }


    function generateCode(name) {
        var cleanName = (name || "")
            .trim().toUpperCase()
            .replace(/[^A-ZÁÉÍÓÚÑ ]/g, "")
            .split(/\s+/)
            .map(function (w) { return w.charAt(0); })
            .join("")
            .slice(0, 4) || "INV";
        var random = Math.random().toString(36).substring(2, 7).toUpperCase();
        var stamp  = Date.now().toString(36).slice(-4).toUpperCase();
        return "BL-" + cleanName + "-" + stamp + random;
    }


    function buildQRPayload(data) {
        return [
            "WEDDING BRENDA & LUIS",
            "------------------------------",
            "Ref: " + data.code,
            "Guest: " + data.name,
            "Guests: " + data.count,
            "Date: Aug 28, 2027 - 11:30 AM",
            "Ceremony: Cathedral of the Blessed Sacrament",
            "1019 11th St, Sacramento, CA 95814",
            "Reception: 7620 Balfour Rd, Brentwood, CA 94513",
            "Dinner: 4:30 - 7:30 PM",
            "Bar: 6:30 - 10:30 PM",
            "Music: 4:30 - 11:00 PM",
            "End: 11:00 PM",
            "------------------------------"
        ].join("\n");
    }


    function renderQR(text) {
        if (!qrContainer) return;
        qrContainer.innerHTML = "";
        try {
            if (typeof qrcode !== "undefined") {
                var qr = qrcode(0, "M");
                qr.addData(text);
                qr.make();
                qrContainer.innerHTML = qr.createImgTag(6, 8);
                return;
            }
        } catch (err) {
            console.warn("Error al generar QR:", err);
        }
        qrContainer.innerHTML =
            '<div style="font-size:10px;text-align:center;color:#5f6b52;padding:8px;">' +
            'Folio: <strong>' + text.split("\n")[2] + '</strong></div>';
    }


    function showTicket(data) {
        ticketName.textContent  = data.name;
        ticketCount.textContent = (data.count === 1)
            ? data.count + " " + t.personSingular
            : data.count + " " + t.personPlural;
        ticketCode.textContent  = data.code;

        form.hidden = true;
        ticket.hidden = false;

        setTimeout(function () { renderQR(buildQRPayload(data)); }, 50);
        setTimeout(function () {
            ticket.scrollIntoView({ behavior: "smooth", block: "center" });
        }, 100);
    }


    form.addEventListener("submit", async function (e) {
        e.preventDefault();
        clearError();

        var name  = (nameInput.value || "").trim();
        var count = parseInt(countInput.value, 10);

        if (name.length < 3) {
            showError(t.errName);
            nameInput.focus();
            return;
        }
        if (isNaN(count) || count < 1) {
            showError(t.errCount);
            return;
        }
        if (count > 10) {
            showError(t.errMax);
            return;
        }

        var code = generateCode(name);

        var data = {
            name: name,
            count: count,
            code: code,
            lang: currentLang
        };

        // Deshabilitar botón mientras guarda
        if (submitBtn) {
            submitBtn.disabled = true;
            var submitLabel = submitBtn.querySelector("[data-i18n]");
            if (submitLabel) submitLabel.textContent = t.formSubmitting;
        }

        try {
            // Guardar en Firestore
            await addDoc(rsvpCollection, {
                name: data.name,
                count: data.count,
                code: data.code,
                lang: data.lang,
                createdAt: serverTimestamp()
            });

            // Guardar también en localStorage para restaurar el pase
            try {
                localStorage.setItem("bl_rsvp", JSON.stringify(data));
            } catch (err) {}

            showTicket(data);

        } catch (err) {
            console.error("Error al guardar en Firestore:", err);
            showError(t.errSave);
        } finally {
            if (submitBtn) {
                submitBtn.disabled = false;
                var submitLabel2 = submitBtn.querySelector("[data-i18n]");
                if (submitLabel2) submitLabel2.textContent = t.formSubmit;
            }
        }
    });


    if (resetBtn) {
        resetBtn.addEventListener("click", function () {
            ticket.hidden = true;
            form.hidden = false;
            clearError();
            if (qrContainer) qrContainer.innerHTML = "";
            if (nameInput) nameInput.focus();
        });
    }


    if (downloadBtn) {
        downloadBtn.addEventListener("click", function () {
            var name  = ticketName.textContent;
            var count = ticketCount.textContent;
            var code  = ticketCode.textContent;

            var W = 720, H = 1000;
            var out = document.createElement("canvas");
            out.width  = W;
            out.height = H;
            var ctx = out.getContext("2d");

            ctx.fillStyle = "#f6f4ee";
            ctx.fillRect(0, 0, W, H);
            ctx.strokeStyle = "#5f6b52";
            ctx.lineWidth = 1;
            ctx.strokeRect(30, 30, W - 60, H - 60);

            ctx.textAlign = "center";
            ctx.fillStyle = "#1f241c";
            ctx.font = "italic 26px 'Parisienne', cursive";
            ctx.fillText("Brenda & Luis", W / 2, 100);

            ctx.font = "500 12px 'Montserrat', sans-serif";
            ctx.fillStyle = "#5f6b52";
            ctx.fillText("INVITATION CONFIRMED", W / 2, 140);

            ctx.beginPath();
            ctx.moveTo(W / 2 - 30, 165);
            ctx.lineTo(W / 2 + 30, 165);
            ctx.strokeStyle = "#8a9a7b";
            ctx.stroke();

            ctx.fillStyle = "#1f241c";
            ctx.font = "400 36px 'Cormorant Garamond', serif";
            ctx.fillText("Entry Pass", W / 2, 220);

            var leftX = 80, rightX = W - 80, y = 290;

            function row(label, value) {
                ctx.textAlign = "left";
                ctx.fillStyle = "#8f9488";
                ctx.font = "500 11px 'Montserrat', sans-serif";
                ctx.fillText(label.toUpperCase(), leftX, y);

                ctx.textAlign = "right";
                ctx.fillStyle = "#1f241c";
                ctx.font = "500 18px 'Cormorant Garamond', serif";
                ctx.fillText(value, rightX, y);

                ctx.beginPath();
                ctx.setLineDash([3, 4]);
                ctx.moveTo(leftX, y + 12);
                ctx.lineTo(rightX, y + 12);
                ctx.strokeStyle = "rgba(95,107,82,.35)";
                ctx.lineWidth = 1;
                ctx.stroke();
                ctx.setLineDash([]);
                y += 55;
            }

            row("Guest", name);
            row("Guests", count);
            row("Event", "Brenda & Luis");
            row("Date", "Aug 28 · 2027 · 11:30 AM");
            row("Ref", code);

            var qrNode = qrContainer ? qrContainer.querySelector("img, canvas, svg") : null;
            if (qrNode) {
                var qrSize = 240;
                var qx = (W - qrSize) / 2;
                var qy = y + 30;

                ctx.fillStyle = "#ffffff";
                ctx.fillRect(qx - 10, qy - 10, qrSize + 20, qrSize + 20);
                ctx.strokeStyle = "rgba(95,107,82,.3)";
                ctx.lineWidth = 1;
                ctx.strokeRect(qx - 10, qy - 10, qrSize + 20, qrSize + 20);

                try { ctx.drawImage(qrNode, qx, qy, qrSize, qrSize); } catch (err) {}
            }

            var link = document.createElement("a");
            link.download = "Pass-" + code + ".png";
            link.href = out.toDataURL("image/png");
            link.click();
        });
    }


    /* Restaurar RSVP previo */
    try {
        var saved = localStorage.getItem("bl_rsvp");
        if (saved) {
            var data = JSON.parse(saved);
            if (data && data.name && data.code) {
                if (nameInput) nameInput.value = data.name;
                if (countInput) countInput.value = data.count;
                if (data.lang && (data.lang === "es" || data.lang === "en")) {
                    applyLanguage(data.lang);
                }
                showTicket(data);
            }
        }
    } catch (err) {}


    applyLanguage(currentLang);

});
