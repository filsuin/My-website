// Cookie consent logic for your site
// This script manages user choices and disables/enables analytics or other scripts accordingly


// Utilisation de sessionStorage pour que le consentement disparaisse à la fermeture du navigateur
function setCookie(name, value) {
    sessionStorage.setItem(name, value);
}

function getCookie(name) {
    return sessionStorage.getItem(name);
}

function eraseCookie(name) {
    sessionStorage.removeItem(name);
}

function showCookieBanner() {
    if (document.getElementById('cookie-banner')) return;
    const banner = document.createElement('div');
    banner.id = 'cookie-banner';
    banner.innerHTML = `
        <div class="cookie-modal">
            <h2>Gestion des cookies</h2>
            <p>Ce site utilise des cookies pour améliorer votre expérience. Choisissez ce que vous acceptez :</p>
            <form id="cookie-form">
                <label><input type="checkbox" name="essential" checked disabled> Cookies essentiels (toujours actifs)</label><br>
                <label><input type="checkbox" name="analytics"> Cookies de mesure d'audience (Google Analytics, etc.)</label><br>
                <label><input type="checkbox" name="ads"> Cookies publicitaires</label><br>
                <button type="submit">Valider mes choix</button>
            </form>
        </div>
    `;
    document.body.appendChild(banner);
    document.getElementById('cookie-form').onsubmit = function(e) {
        e.preventDefault();
        const analytics = this.analytics.checked;
        const ads = this.ads.checked;
        setCookie('cookie_analytics', analytics, 365);
        setCookie('cookie_ads', ads, 365);
        banner.remove();
        updateCookieChoices();
    };
}

function updateCookieChoices() {
    // Analytics
    if (getCookie('cookie_analytics') === 'true') {
        // Dynamically load analytics script if accepted
        if (!document.getElementById('analytics-script')) {
            const s = document.createElement('script');
            s.id = 'analytics-script';
            s.src = 'https://www.googletagmanager.com/gtag/js?id=UA-XXXXXXXXX-X';
            s.async = true;
            document.head.appendChild(s);
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'UA-XXXXXXXXX-X');
        }
    } else {
        // Remove analytics if not accepted
        const s = document.getElementById('analytics-script');
        if (s) s.remove();
        window['ga-disable-UA-XXXXXXXXX-X'] = true;
    }
    // Ads (à adapter selon tes scripts publicitaires)
    if (getCookie('cookie_ads') !== 'true') {
        // Ici tu peux désactiver/masquer les pubs si besoin
    }
}

// Affiche la bannière si pas encore de choix (session uniquement)
if (getCookie('cookie_analytics') === null || getCookie('cookie_ads') === null) {
    window.addEventListener('DOMContentLoaded', showCookieBanner);
}
window.addEventListener('DOMContentLoaded', updateCookieChoices);
