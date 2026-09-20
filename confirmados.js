/* =====================================================
   FIREBASE — CONFIG REAL
===================================================== */

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js";
import {
    getFirestore,
    collection,
    query,
    orderBy,
    onSnapshot
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyDraLBBSM9IrRMb-kwTRHhe2cmI6Mh1pyo",
    authDomain: "bodamonce-luis.firebaseapp.com",
    projectId: "bodomonce-luis",
    storageBucket: "bodamonce-luis.firebasestorage.app",
    messagingSenderId: "636124812998",
    appId: "1:636124812998:web:a0607315cafd9c34b9a9c7",
    measurementId: "G-YF2HE2JCHV"
};

const app = initializeApp(firebaseConfig);
const db  = getFirestore(app);


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
        personSingular: "guest",
        personPlural: "guests"
    }
};

let currentLang = "es";
let t = translations[currentLang];
let allGuests = [];

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

function formatDate(ts) {
    if (!ts) return "—";
    let date;
    if (typeof ts.toDate === "function") date = ts.toDate();
    else if (typeof ts === "number") date = new Date(ts);
    else if (typeof ts === "string") date = new Date(ts);
    else return "—";

    const day   = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year  = date.getFullYear();
    const hh    = String(date.getHours()).padStart(2, "0");
    const mm    = String(date.getMinutes()).padStart(2, "0");
    return `${day}/${month}/${year} · ${hh}:${mm}`;
}

function escapeHtml(str) {
    return String(str)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");
}


/* =====================================================
   RENDER
===================================================== */

function renderTable(guests) {
    const tbody = document.getElementById("guestList");
    const emptyNote = document.getElementById("emptyNote");
    const statInvitations = document.getElementById("statInvitations");
    const statPeople = document.getElementById("statPeople");

    if (!tbody) return;

    // Stats globales (siempre sobre TODOS los invitados)
    const totalInvitations = allGuests.length;
    const totalPeople = allGuests.reduce(function (sum, g) { return sum + (g.count || 0); }, 0);

    if (statInvitations) statInvitations.textContent = totalInvitations;
    if (statPeople) statPeople.textContent = totalPeople;

    // Filtro
    const search = (document.getElementById("searchInput")?.value || "")
        .trim().toLowerCase();

    const filtered = guests.filter(function (g) {
        if (!search) return true;
        return (
            (g.name || "").toLowerCase().includes(search) ||
            (g.code || "").toLowerCase().includes(search)
        );
    });

    // Empty state
    if (allGuests.length === 0) {
        tbody.innerHTML =
            '<tr><td colspan="4" class="empty">' + escapeHtml(t.loading) + '</td></tr>';
        if (emptyNote) emptyNote.hidden = false;
        return;
    }

    if (emptyNote) emptyNote.hidden = true;

    if (filtered.length === 0) {
        tbody.innerHTML =
            '<tr><td colspan="4" class="empty">' + escapeHtml(t.emptyRow) + '</td></tr>';
        return;
    }

    // Ordenar por fecha descendente
    filtered.sort(function (a, b) {
        const ta = a.createdAt?.seconds || 0;
        const tb = b.createdAt?.seconds || 0;
        return tb - ta;
    });

    tbody.innerHTML = filtered.map(function (g) {
        const countLabel = (g.count === 1)
            ? g.count + " " + t.personSingular
            : g.count + " " + t.personPlural;

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
   FIRESTORE EN TIEMPO REAL
===================================================== */

const statusEl = document.getElementById("statStatus");
if (statusEl) statusEl.textContent = t.loading;

const rsvpQuery = query(
    collection(db, "rsvp"),
    orderBy("createdAt", "desc")
);

onSnapshot(rsvpQuery,
    function (snapshot) {
        allGuests = [];
        snapshot.forEach(function (doc) {
            const d = doc.data();
            allGuests.push({
                id: doc.id,
                name: d.name || "",
                count: d.count || 0,
                code: d.code || "",
                lang: d.lang || "es",
                createdAt: d.createdAt || null
            });
        });

        if (statusEl) statusEl.textContent = t.live;
        renderTable(allGuests);
    },
    function (error) {
        console.error("Firestore error:", error);
        if (statusEl) statusEl.textContent = t.offline;

        const tbody = document.getElementById("guestList");
        if (tbody) {
            tbody.innerHTML =
                '<tr><td colspan="4" class="empty">' +
                escapeHtml(t.offline) +
                '</td></tr>';
        }
    }
);


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


/* EXPORTAR CSV */
document.getElementById("exportBtn")?.addEventListener("click", function () {
    if (allGuests.length === 0) return;

    const rows = [
        ["Nombre", "Personas", "Folio", "Fecha"]
    ];

    allGuests.forEach(function (g) {
        rows.push([
            g.name,
            g.count,
            g.code,
            formatDate(g.createdAt)
        ]);
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


/* IMPRIMIR */
document.getElementById("printBtn")?.addEventListener("click", function () {
    window.print();
});


/* =====================================================
   INIT
===================================================== */

applyLanguage(currentLang);
