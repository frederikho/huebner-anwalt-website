/* Zweisprachiger Umschalter DE/EN — Übersetzungen liegen pro Seite in window.I18N (siehe i18n-data.js) */
(function () {
  var STORAGE_KEY = 'siteLang';

  function detectLang() {
    var saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'de' || saved === 'en') return saved;
    return (navigator.language || '').toLowerCase().indexOf('en') === 0 ? 'en' : 'de';
  }

  function applyLang(lang) {
    var page = document.documentElement.getAttribute('data-page');
    var dict = (window.I18N && window.I18N[page]) || {};

    document.documentElement.setAttribute('lang', lang);

    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      var entry = dict[key];
      if (entry && entry[lang] !== undefined) el.innerHTML = entry[lang];
    });

    document.querySelectorAll('[data-i18n-attr]').forEach(function (el) {
      el.getAttribute('data-i18n-attr').split('|').forEach(function (pair) {
        var parts = pair.split(':');
        var attr = parts[0];
        var key = parts[1];
        var entry = dict[key];
        if (entry && entry[lang] !== undefined) el.setAttribute(attr, entry[lang]);
      });
    });

    document.querySelectorAll('.lang-toggle').forEach(function (btn) {
      btn.textContent = lang === 'de' ? 'EN' : 'DE';
      btn.setAttribute('aria-label', lang === 'de' ? 'Switch to English' : 'Zu Deutsch wechseln');
    });

    localStorage.setItem(STORAGE_KEY, lang);
  }

  function toggleLang() {
    var current = document.documentElement.getAttribute('lang') === 'en' ? 'en' : 'de';
    applyLang(current === 'de' ? 'en' : 'de');
  }

  document.addEventListener('DOMContentLoaded', function () {
    applyLang(detectLang());
    document.querySelectorAll('.lang-toggle').forEach(function (btn) {
      btn.addEventListener('click', toggleLang);
    });
  });
})();
