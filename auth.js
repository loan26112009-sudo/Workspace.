// ─── WORKSPACE AUTH ───────────────────────────────────────────────────────────
// Change CREATOR_PWD and WORKER_PWD to your preferred passwords.
// These are stored in plain text here — the site is for a trusted team only.
// ──────────────────────────────────────────────────────────────────────────────
(function () {
  var CREATOR_PWD = 'loan2024';   // creator password — change this
  var WORKER_PWD  = 'team2024';   // worker  password — change this
  var KEY = 'ws_role';

  window.AUTH = {
    getRole: function () {
      return localStorage.getItem(KEY); // 'creator' | 'worker' | null
    },

    login: function (pwd) {
      if (pwd === CREATOR_PWD) { localStorage.setItem(KEY, 'creator'); return 'creator'; }
      if (pwd === WORKER_PWD)  { localStorage.setItem(KEY, 'worker');  return 'worker';  }
      return null;
    },

    logout: function () {
      localStorage.removeItem(KEY);
      window.location.href = 'login.html';
    },

    // allowed: array of roles, e.g. ['creator'] or ['creator','worker']
    // fallback: where to redirect when role is set but not allowed (default: login.html)
    require: function (allowed, fallback) {
      var r = this.getRole();
      if (!r) { window.location.replace('login.html'); return false; }
      if (allowed && allowed.indexOf(r) < 0) {
        window.location.replace(fallback || 'login.html');
        return false;
      }
      return true;
    }
  };
})();
