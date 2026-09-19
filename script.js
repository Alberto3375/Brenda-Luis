/* =====================================================
   TODO EL CÓDIGO ESPERA A QUE EL DOM ESTÉ LISTO
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       IDIOMA — ES / EN
    ===================================================== */

    var translations = {
        es: {
            preloader: "Cargando invitación",
            navStory: "Historia",
            navEvent: "Ceremonia",
            navSchedule: "Itinerario",
            navDetails: "Detalles",
            navRsvp: "RSVP",

            heroEyebrow: "Estás invitado a celebrar",
            heroSubtitle: "Nuestra Boda",
            heroDay: "Sábado",
            heroCity: "Sacramento, California",
            heroScroll: "Descubrir",

            countKicker: "Cuenta regresiva",
            countTitle: "Faltan",
            countDays: "Días",
            countHours: "Horas",
            countMinutes: "Minutos",
            countSeconds: "Segundos",

            storyKicker: "Nuestra historia",
            storyTitle1: "Un encuentro que",
            storyTitle2: "cambió todo",
            storyText1: "Hay historias que comienzan sin avisar. Una mirada, una conversación y dos caminos que inesperadamente decidieron caminar juntos.",
            storyText2: "Después de tantos momentos compartidos, aventuras, sueños y recuerdos, queremos celebrar el comienzo de nuestro siguiente capítulo con las personas que más queremos.",

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
            mapOpen: "Abrir en Google Maps",

            quoteText: "El amor no mira con los ojos, sino con el alma.",

            scheduleKicker: "Programa",
            scheduleTitle: "Itinerario del día",
            sched1Title: "Ceremonia religiosa",
            sched2Title: "Sesión de fotos",
            sched2Place: "Frente a la Catedral",
            sched3Title: "Recepción y banquete",
            sched4Title: "Brindis y primer baile",
            sched4Place: "Salón principal",
            sched5Title: "Fiesta",
            sched5Place: "¡A bailar toda la noche!",

            detailsKicker: "Detalles",
            detailsTitle: "Antes de venir",
            detail1Title: "Código de vestimenta",
            detail1Main: "Formal / Elegante",
            detail1Sub: "Colores reservados: blanco",
            detail2Title: "Solo adultos",
            detail2Main: "Evento exclusivo",
            detail2Sub: "Agradecemos tu comprensión",
            detail3Title: "Mesa de regalos",
            detail3Main: "Tu presencia es nuestro mejor regalo",
            detail3Sub: "Lluvia de sobres",

            rsvpKicker: "Confirmación",
            rsvpTitle: "¿Nos acompañas?",
            rsvpText: "Queremos compartir este día tan especial con las personas que más queremos. Por favor confirma tu asistencia antes del 1 de Julio de 2027.",

            formNameLabel: "Nombre completo",
            formNamePlaceholder: "Ej. María López",
            formCountLabel: "Número de personas (incluyéndote)",
            formHint: "Máximo 10 personas por invitación.",
            formMessageLabel: "Mensaje para los novios (opcional)",
            formMessagePlaceholder: "Escríbenos unas palabras…",
            formSubmit: "Confirmar asistencia",

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

            footerText: "Gracias por ser parte de nuestra historia.",
            footerMade: "Hecho con amor",

            errName: "Por favor escribe tu nombre completo.",
            errCount: "Indica al menos 1 persona.",
            errMax: "Máximo 10 personas por invitación.",
            personSingular: "persona",
            personPlural: "personas",

            ticketDownloaded: "Pase descargado correctamente."
        },

        en: {
            preloader: "Loading invitation",
            navStory: "Story",
            navEvent: "Ceremony",
            navSchedule: "Schedule",
            navDetails: "Details",
            navRsvp: "RSVP",

            heroEyebrow: "You are invited to celebrate",
            heroSubtitle: "Our Wedding",
            heroDay: "Saturday",
            heroCity: "Sacramento, California",
            heroScroll: "Discover",

            countKicker: "Countdown",
            countTitle: "Only",
            countDays: "Days",
            countHours: "Hours",
            countMinutes: "Minutes",
            countSeconds: "Seconds",

            storyKicker: "Our story",
            storyTitle1: "A meeting that",
            storyTitle2: "changed everything",
            storyText1: "Some stories begin without warning. A glance, a conversation, and two paths that unexpectedly decided to walk together.",
            storyText2: "After so many shared moments, adventures, dreams and memories, we want to celebrate the beginning of our next chapter with the people we love most.",

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
            mapOpen: "Open in Google Maps",

            quoteText: "Love looks not with the eyes, but with the mind.",

            scheduleKicker: "Program",
            scheduleTitle: "Schedule of the day",
            sched1Title: "Religious ceremony",
            sched2Title: "Photo session",
            sched2Place: "In front of the Cathedral",
            sched3Title: "Reception & dinner",
            sched4Title: "Toast & first dance",
            sched4Place: "Main hall",
            sched5Title: "Party",
            sched5Place: "Let's dance all night!",

            detailsKicker: "Details",
            detailsTitle: "Before you come",
            detail1Title: "Dress code",
            detail1Main: "Formal / Elegant",
            detail1Sub: "Reserved colors: white",
            detail2Title: "Adults only",
            detail2Main: "Exclusive event",
            detail2Sub: "Thank you for understanding",
            detail3Title: "Gift registry",
            detail3Main: "Your presence is our best gift",
            detail3Sub: "Card box",

            rsvpKicker: "RSVP",
            rsvpTitle: "Will you join us?",
            rsvpText: "We want to share this special day with the people we love most. Please confirm your attendance before July 1, 2027.",

            formNameLabel: "Full name",
            formNamePlaceholder: "e.g. Mary Johnson",
            formCountLabel: "Number of guests (including you)",
            formHint: "Maximum 10 guests per invitation.",
            formMessageLabel: "Message for the couple (optional)",
            formMessagePlaceholder: "Write us a few words…",
            formSubmit: "Confirm attendance",

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

            footerText: "Thank you for being part of our story.",
            footerMade: "Made with love",

            errName: "Please enter your full name.",
            errCount: "Please indicate at least 1 guest.",
            errMax: "Maximum 10 guests per invitation.",
            personSingular: "guest",
            personPlural: "guests",

            ticketDownloaded: "Pass downloaded successfully."
        }
    };

    var currentLang = "es";
    var t = translations[currentLang];

    function applyLanguage(lang) {
        currentLang = lang;
        t = translations[lang];
        document.documentElement.lang = lang;

        // Textos con data-i18n
        document.querySelectorAll("[data-i18n]").forEach(function (el) {
            var key = el.getAttribute("data-i18n");
            if (t[key] !== undefined) el.textContent = t[key];
        });

        // Placeholders con data-i18n-placeholder
        document.querySelectorAll("[data-i18n-placeholder]").forEach(function (el) {
            var key = el.getAttribute("data-i18n-placeholder");
            if (t[key] !== undefined) el.setAttribute("placeholder", t[key]);
        });

        // Actualizar el botón de idioma
        var langCurrent = document.querySelector(".lang-current");
        if (langCurrent) langCurrent.textContent = lang.toUpperCase();
    }

    // Botón de idioma (toggle ES / EN)
    var langButton = document.getElementById("langButton");
    if (langButton) {
        langButton.addEventListener("click", function () {
            applyLanguage(currentLang === "es" ? "en" : "es");
        });
    }


    /* =====================================================
       PRELOADER
    ===================================================== */

    function hidePreloader() {
        var preloader = document.getElementById("preloader");
        if (preloader) preloader.classList.add("hidden");
    }

    window.addEventListener("load", function () {
        setTimeout(hidePreloader, 1200);
    });

    // Respaldo por si "load" tarda
    setTimeout(hidePreloader, 2500);


    /* =====================================================
       COUNTDOWN — 28 de Agosto de 2027, 11:30 AM
    ===================================================== */

    var weddingDate = new Date(2027, 7, 28, 11, 30, 0).getTime();

    var countEls = {
        days:    document.getElementById("days"),
        hours:   document.getElementById("hours"),
        minutes: document.getElementById("minutes"),
        seconds: document.getElementById("seconds")
    };

    function updateCountdown() {
        var diff = weddingDate - Date.now();

        if (diff <= 0) {
            if (countEls.days)    countEls.days.textContent    = "00";
            if (countEls.hours)   countEls.hours.textContent   = "00";
            if (countEls.minutes) countEls.minutes.textContent = "00";
            if (countEls.seconds) countEls.seconds.textContent = "00";
            return;
        }

        var d = Math.floor(diff / (1000 * 60 * 60 * 24));
        var h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        var s = Math.floor((diff % (1000 * 60)) / 1000);

        if (countEls.days)    countEls.days.textContent    = String(d).padStart(2, "0");
        if (countEls.hours)   countEls.hours.textContent   = String(h).padStart(2, "0");
        if (countEls.minutes) countEls.minutes.textContent = String(m).padStart(2, "0");
        if (countEls.seconds) countEls.seconds.textContent = String(s).padStart(2, "0");
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);


    /* =====================================================
       NAVBAR SCROLL
    ===================================================== */

    var navbar = document.getElementById("navbar");

    window.addEventListener("scroll", function () {
        if (!navbar) return;
        if (window.scrollY > 60) navbar.classList.add("scrolled");
        else navbar.classList.remove("scrolled");
    });


    /* =====================================================
       SMOOTH SCROLL
    ===================================================== */

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


    /* =====================================================
       MAPA — TABS
    ===================================================== */

    var mapTabs = document.querySelectorAll(".map-tab");
    var mapFrames = document.querySelectorAll(".map-frame");

    mapTabs.forEach(function (tab) {
        tab.addEventListener("click", function () {
            var target = tab.getAttribute("data-map");

            mapTabs.forEach(function (t) { t.classList.remove("is-active"); });
            tab.classList.add("is-active");

            mapFrames.forEach(function (frame) {
                if (frame.id === "map" + target.charAt(0).toUpperCase() + target.slice(1)) {
                    frame.classList.add("is-active");
                } else {
                    frame.classList.remove("is-active");
                }
            });
        });
    });


    /* =====================================================
       REVEAL ON SCROLL
    ===================================================== */

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
            ".section-head, .count-cell, .event-card, .detail-card, .timeline-list li, .story-inner, .quote-inner, .rsvp-inner, .map-wrapper"
        ).forEach(function (el) {
            el.classList.add("reveal");
            revealObserver.observe(el);
        });
    }


    /* =====================================================
       MÚSICA
    ===================================================== */

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
       PARALLAX HERO
    ===================================================== */

    var heroContent = document.querySelector(".hero-content");

    window.addEventListener("scroll", function () {
        var y = window.scrollY;
        if (y < window.innerHeight && heroContent) {
            heroContent.style.transform = "translateY(" + (y * 0.15) + "px)";
            heroContent.style.opacity = String(Math.max(0, 1 - y / 700));
        }
    });


    /* =====================================================
       RSVP — CONFIRMACIÓN CON QR
    ===================================================== */

    var form       = document.getElementById("rsvpForm");
    var nameInput  = document.getElementById("guestName");
    var countInput = document.getElementById("guestCount");
    var msgInput   = document.getElementById("guestMessage");
    var errorBox   = document.getElementById("rsvpError");

    var ticket       = document.getElementById("ticket");
    var ticketName   = document.getElementById("ticketName");
    var ticketCount  = document.getElementById("ticketCount");
    var ticketCode   = document.getElementById("ticketCode");
    var ticketNote   = document.getElementById("ticketNote");
    var qrContainer  = document.getElementById("qrcode");

    var downloadBtn = document.getElementById("downloadTicket");
    var resetBtn    = document.getElementById("resetTicket");

    if (!form) return;


    /* ---------- Contador +/- ---------- */

    document.querySelectorAll(".counter-btn").forEach(function (btn) {
        btn.addEventListener("click", function () {
            var value = parseInt(countInput.value, 10) || 1;
            var action = btn.getAttribute("data-action");

            if (action === "inc" && value < 10) value++;
            if (action === "dec" && value > 1)  value--;

            countInput.value = value;
        });
    });


    /* ---------- Mostrar/ocultar error ---------- */

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


    /* ---------- Generar folio único ---------- */

    function generateCode(name) {
        var cleanName = (name || "")
            .trim()
            .toUpperCase()
            .replace(/[^A-ZÁÉÍÓÚÑ ]/g, "")
            .split(/\s+/)
            .map(function (w) { return w.charAt(0); })
            .join("")
            .slice(0, 4) || "INV";

        var random = Math.random().toString(36).substring(2, 7).toUpperCase();
        var stamp  = Date.now().toString(36).slice(-4).toUpperCase();

        return "BL-" + cleanName + "-" + stamp + random;
    }


    /* ---------- Payload del QR ---------- */

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
            "------------------------------",
            "Show this code at the event entrance."
        ].join("\n");
    }


    /* ---------- Renderizar QR (con fallback) ---------- */

    function renderQR(text) {
        if (!qrContainer) return;

        qrContainer.innerHTML = "";

        try {
            if (typeof qrcode !== "undefined") {
                var qr = qrcode(0, "M");
                qr.addData(text);
                qr.make();
                var imgTag = qr.createImgTag(6, 8);
                qrContainer.innerHTML = imgTag;
                return;
            }
        } catch (err) {
            console.warn("Error al generar QR:", err);
        }

        // Fallback si la librería falla
        qrContainer.innerHTML =
            '<div style="font-size:10px;text-align:center;color:#5f6b52;padding:8px;">' +
            'Tu pase ha sido generado.<br>Folio: ' +
            '<strong style="display:block;margin-top:6px;">' + text.split("\n")[2] + '</strong>' +
            '</div>';
    }


    /* ---------- Mostrar ticket ---------- */

    function showTicket(data) {
        ticketName.textContent  = data.name;
        ticketCount.textContent = (data.count === 1)
            ? data.count + " " + t.personSingular
            : data.count + " " + t.personPlural;
        ticketCode.textContent  = data.code;

        form.hidden = true;
        ticket.hidden = false;

        setTimeout(function () {
            renderQR(buildQRPayload(data));
        }, 50);

        setTimeout(function () {
            ticket.scrollIntoView({ behavior: "smooth", block: "center" });
        }, 100);
    }


    /* ---------- Submit del formulario ---------- */

    form.addEventListener("submit", function (e) {
        e.preventDefault();
        clearError();

        var name  = (nameInput.value || "").trim();
        var count = parseInt(countInput.value, 10);
        var msg   = msgInput ? msgInput.value.trim() : "";

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
            message: msg,
            code: code,
            lang: currentLang,
            createdAt: new Date().toISOString()
        };

        try {
            localStorage.setItem("bl_rsvp", JSON.stringify(data));
        } catch (err) { /* silencioso */ }

        showTicket(data);
    });


    /* ---------- Botón "Editar datos" ---------- */

    if (resetBtn) {
        resetBtn.addEventListener("click", function () {
            ticket.hidden = true;
            form.hidden = false;
            clearError();
            if (qrContainer) qrContainer.innerHTML = "";
            if (nameInput) nameInput.focus();
        });
    }


    /* ---------- Botón "Descargar pase" ---------- */

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

                try {
                    ctx.drawImage(qrNode, qx, qy, qrSize, qrSize);
                } catch (err) { /* omitir */ }

                ctx.textAlign = "center";
                ctx.fillStyle = "#8f9488";
                ctx.font = "500 11px 'Montserrat', sans-serif";
                ctx.fillText("Show this code at the event", W / 2, qy + qrSize + 40);
            }

            var link = document.createElement("a");
            link.download = "Pass-" + code + ".png";
            link.href = out.toDataURL("image/png");
            link.click();

            if (ticketNote) {
                ticketNote.textContent = t.ticketDownloaded;
                ticketNote.hidden = false;
                setTimeout(function () { ticketNote.hidden = true; }, 4000);
            }
        });
    }


    /* ---------- Restaurar RSVP previo ---------- */

    try {
        var saved = localStorage.getItem("bl_rsvp");
        if (saved) {
            var data = JSON.parse(saved);
            if (data && data.name && data.code) {
                if (nameInput) nameInput.value = data.name;
                if (countInput) countInput.value = data.count;
                if (msgInput) msgInput.value = data.message || "";

                // Aplicar idioma guardado
                if (data.lang && (data.lang === "es" || data.lang === "en")) {
                    applyLanguage(data.lang);
                }

                showTicket(data);
            }
        }
    } catch (err) { /* silencioso */ }


    /* ---------- Aplicar idioma inicial ---------- */

    applyLanguage(currentLang);

});