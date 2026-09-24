// ─── WORKSPACE AUTH ───────────────────────────────────────────────────────────
// Three creator accounts + one worker account.
// Passwords are stored in plain text — trusted team only, no backend.
// ──────────────────────────────────────────────────────────────────────────────
(function () {
  // Map password → creator name
  var CREATORS = {
    'loanacces':    'Loan',
    'wondrayacces': 'Wondray',
    'ykudacces':    'Ykud',
    'test':         'Test',
  };
  var WORKER_PWD = 'teamaccesworker';
  var ROLE_KEY = 'ws_role';
  var NAME_KEY = 'ws_name';

  window.AUTH = {
    getRole: function () {
      return localStorage.getItem(ROLE_KEY); // 'creator' | 'worker' | null
    },

    getName: function () {
      return localStorage.getItem(NAME_KEY) || '';
    },

    login: function (pwd) {
      if (CREATORS[pwd]) {
        localStorage.setItem(ROLE_KEY, 'creator');
        localStorage.setItem(NAME_KEY, CREATORS[pwd]);
        return 'creator';
      }
      if (pwd === WORKER_PWD) {
        localStorage.setItem(ROLE_KEY, 'worker');
        localStorage.removeItem(NAME_KEY);
        return 'worker';
      }
      return null;
    },

    logout: function () {
      localStorage.removeItem(ROLE_KEY);
      localStorage.removeItem(NAME_KEY);
      if (window.FBSYNC) { FBSYNC.signOut(); }
      window.location.href = 'login.html';
    },

    // allowed: array of roles, e.g. ['creator'] or ['creator','worker']
    // fallback: where to redirect when role is set but not allowed
    require: function (allowed, fallback) {
      var r = this.getRole();
      if (!r) { window.location.replace('login.html'); return false; }
      if (allowed && allowed.indexOf(r) < 0) {
        window.location.replace(fallback || 'login.html');
        return false;
      }
      return true;
    },

    // Navigate to the right home page based on role
    goHome: function () {
      window.location.href = this.getRole() === 'worker' ? 'worker-home.html' : 'index.html';
    }
  };
})();
