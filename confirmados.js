/* =====================================================
   FIREBASE — CONFIG REAL
===================================================== */

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js";
import {
    getFirestore,
    collection,
    onSnapshot,
    getDocs
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
   IDIOMA
===================================================== */

const translations = {
    es: {
        adminKicker: "Panel de invitados",
        exportCsv: "Exportar CSV",
        print: "Imprimir",
        listKicker: "Confirmaciones",
        listTitle: "Lista de invitados",
        statInvitations: "Confirmaciones",
        statPeople: "Personas totales",
        statStatus: "Estado",
        loading: "Cargando…",
        live: "En vivo",
        offline: "Sin conexión",
        searchPlaceholder: "Buscar por nombre o folio…",
        thName: "Invitado",
        thPeople: "Personas",
        thFolio: "Folio",
        thDate: "Fecha",
        emptyNote: "Aún no hay confirmaciones.",
        emptyRow: "Sin resultados.",
        noData: "No se pudieron cargar las confirmaciones.",
        personSingular: "persona",
        personPlural: "personas"
    },
    en: {
        adminKicker: "Guest panel",
        exportCsv: "Export CSV",
        print: "Print",
        listKicker: "Confirmations",
        listTitle: "Guest list",
        statInvitations: "Confirmations",
        statPeople: "Total guests",
        statStatus: "Status",
        loading: "Loading…",
        live: "Live",
        offline: "Offline",
        searchPlaceholder: "Search by name or reference…",
        thName: "Guest",
        thPeople: "Guests",
        thFolio: "Reference",
        thDate: "Date",
        emptyNote: "No confirmations yet.",
        emptyRow: "No results.",
        noData: "Could not load confirmations.",
        personSingular: "guest",
        personPlural: "guests"
    }
};

let currentLang = "es";
let t = translations[currentLang];
let allGuests = [];


/* =====================================================
   APLICAR IDIOMA
===================================================== */

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

    renderTable(allGuests);
}


/* =====================================================
   UTILIDADES
===================================================== */

function escapeHtml(str) {
    return String(str)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");
}

function formatDate(ts) {
    if (!ts) return "—";

    let date;
    try {
        if (typeof ts.toDate === "function") {
            date = ts.toDate();
        } else if (typeof ts.seconds === "number") {
            date = new Date(ts.seconds * 1000);
        } else if (typeof ts === "number") {
            date = new Date(ts);
        } else if (typeof ts === "string") {
            date = new Date(ts);
        } else {
            return "—";
        }
    } catch (err) {
        return "—";
    }

    if (isNaN(date.getTime())) return "—";

    const day   = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year  = date.getFullYear();
    const hh    = String(date.getHours()).padStart(2, "0");
    const mm    = String(date.getMinutes()).padStart(2, "0");

    return `${day}/${month}/${year} · ${hh}:${mm}`;
}

function getTimestamp(ts) {
    if (!ts) return 0;
    try {
        if (typeof ts.toDate === "function") return ts.toDate().getTime();
        if (typeof ts.seconds === "number") return ts.seconds * 1000;
        if (typeof ts === "number") return ts;
        if (typeof ts === "string") return new Date(ts).getTime() || 0;
    } catch (err) {}
    return 0;
}


/* =====================================================
   RENDER DE LA TABLA
===================================================== */

function renderTable(guests) {
    const tbody = document.getElementById("guestList");
    const emptyNote = document.getElementById("emptyNote");
    const statInvitations = document.getElementById("statInvitations");
    const statPeople = document.getElementById("statPeople");

    if (!tbody) return;

    const totalInvitations = allGuests.length;
    const totalPeople = allGuests.reduce(function (sum, g) {
        return sum + (Number(g.count) || 0);
    }, 0);

    if (statInvitations) statInvitations.textContent = totalInvitations;
    if (statPeople) statPeople.textContent = totalPeople;

    if (allGuests.length === 0) {
        tbody.innerHTML =
            '<tr><td colspan="4" class="empty">' +
            escapeHtml(t.emptyNote) +
            '</td></tr>';
        if (emptyNote) emptyNote.hidden = true;
        return;
    }

    if (emptyNote) emptyNote.hidden = true;

    const searchInput = document.getElementById("searchInput");
    const search = (searchInput?.value || "").trim().toLowerCase();

    const filtered = guests.filter(function (g) {
        if (!search) return true;
        const name = (g.name || "").toLowerCase();
        const code = (g.code || "").toLowerCase();
        return name.includes(search) || code.includes(search);
    });

    if (filtered.length === 0) {
        tbody.innerHTML =
            '<tr><td colspan="4" class="empty">' +
            escapeHtml(t.emptyRow) +
            '</td></tr>';
        return;
    }

    filtered.sort(function (a, b) {
        return getTimestamp(b.createdAt) - getTimestamp(a.createdAt);
    });

    tbody.innerHTML = filtered.map(function (g) {
        const count = Number(g.count) || 0;
        const countLabel = (count === 1)
            ? count + " " + t.personSingular
            : count + " " + t.personPlural;

        return (
            '<tr>' +
                '<td class="guest-name">' + escapeHtml(g.name || "—") + '</td>' +
                '<td class="guest-count">' + escapeHtml(countLabel) + '</td>' +
                '<td class="guest-code">'  + escapeHtml(g.code || "—") + '</td>' +
                '<td class="guest-date">'  + escapeHtml(formatDate(g.createdAt)) + '</td>' +
            '</tr>'
        );
    }).join("");
}


/* =====================================================
   CARGAR DATOS DESDE FIRESTORE
===================================================== */

const statusEl = document.getElementById("statStatus");
if (statusEl) statusEl.textContent = t.loading;

try {
    onSnapshot(
        rsvpCollection,
        function (snapshot) {
            allGuests = [];
            snapshot.forEach(function (doc) {
                const d = doc.data() || {};
                allGuests.push({
                    id: doc.id,
                    name: d.name || "",
                    count: Number(d.count) || 0,
                    code: d.code || "",
                    lang: d.lang || "es",
                    createdAt: d.createdAt || null
                });
            });

            if (statusEl) statusEl.textContent = t.live;
            renderTable(allGuests);
        },
        function (error) {
            console.error("Firestore onSnapshot error:", error);
            if (statusEl) statusEl.textContent = t.offline;

            getDocs(rsvpCollection)
                .then(function (snapshot) {
                    allGuests = [];
                    snapshot.forEach(function (doc) {
                        const d = doc.data() || {};
                        allGuests.push({
                            id: doc.id,
                            name: d.name || "",
                            count: Number(d.count) || 0,
                            code: d.code || "",
                            lang: d.lang || "es",
                            createdAt: d.createdAt || null
                        });
                    });
                    if (statusEl) statusEl.textContent = t.live;
                    renderTable(allGuests);
                })
                .catch(function (err2) {
                    console.error("Firestore getDocs error:", err2);
                    const tbody = document.getElementById("guestList");
                    if (tbody) {
                        tbody.innerHTML =
                            '<tr><td colspan="4" class="empty">' +
                            escapeHtml(t.noData) +
                            '</td></tr>';
                    }
                });
        }
    );
} catch (err) {
    console.error("Error inicializando onSnapshot:", err);

    getDocs(rsvpCollection)
        .then(function (snapshot) {
            allGuests = [];
            snapshot.forEach(function (doc) {
                const d = doc.data() || {};
                allGuests.push({
                    id: doc.id,
                    name: d.name || "",
                    count: Number(d.count) || 0,
                    code: d.code || "",
                    lang: d.lang || "es",
                    createdAt: d.createdAt || null
                });
            });
            if (statusEl) statusEl.textContent = t.live;
            renderTable(allGuests);
        })
        .catch(function (err2) {
            console.error("Firestore getDocs error:", err2);
            if (statusEl) statusEl.textContent = t.offline;
        });
}


/* =====================================================
   BÚSQUEDA
===================================================== */

document.getElementById("searchInput")?.addEventListener("input", function () {
    renderTable(allGuests);
});


/* =====================================================
   BOTONES
===================================================== */

document.getElementById("langButton")?.addEventListener("click", function () {
    applyLanguage(currentLang === "es" ? "en" : "es");
});

document.getElementById("exportBtn")?.addEventListener("click", function () {
    if (allGuests.length === 0) return;

    const sorted = allGuests.slice().sort(function (a, b) {
        return getTimestamp(b.createdAt) - getTimestamp(a.createdAt);
    });

    const rows = [["Nombre", "Personas", "Folio", "Fecha"]];

    sorted.forEach(function (g) {
        rows.push([g.name, g.count, g.code, formatDate(g.createdAt)]);
    });

    const csv = rows.map(function (r) {
        return r.map(function (cell) {
            const s = String(cell).replace(/"/g, '""');
            return '"' + s + '"';
        }).join(",");
    }).join("\n");

    const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "confirmados-boda.csv";
    a.click();
    URL.revokeObjectURL(url);
});

document.getElementById("printBtn")?.addEventListener("click", function () {
    window.print();
});


/* =====================================================
   INIT
===================================================== */

applyLanguage(currentLang);
