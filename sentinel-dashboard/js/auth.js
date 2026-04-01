// js/auth.js - Authentication & View Router

class AuthController {
    constructor() {
        this.currentUser = null;
        this.views = ['login', 'authority', 'ambulance', 'admin', 'volunteer'];
        this.bindEvents();
        this.checkSession();
    }

    bindEvents() {
        const btnLogin = document.getElementById('btn-login');
        if (btnLogin) {
            btnLogin.addEventListener('click', () => this.handleLogin());
        }
    }

    async handleLogin() {
        const btn = document.getElementById('btn-login');
        const role = document.getElementById('auth-role').value;
        const email = document.getElementById('auth-email').value;
        
        btn.innerHTML = '<i data-lucide="loader" class="animate-pulse"></i> Connecting...';
        lucide.createIcons();

        try {
            // For hackathon purposes, we mock auto-registering if they don't exist
            let res;
            try {
                res = await window.API.login(email, 'password123');
            } catch (e) {
                res = await window.API.registerUser(email, 'password123', role, 'Demo User');
            }

            // Force override role based on the select dropdown for easy demo switching
            res.user.role = role;
            
            this.setSession(res.user);
            
        } catch (error) {
            alert('Authentication failed: ' + error.message);
            btn.innerHTML = '<i data-lucide="log-in"></i> Authenticate & Connect';
            lucide.createIcons();
        }
    }

    setSession(user) {
        this.currentUser = user;
        sessionStorage.setItem('current_user', JSON.stringify(user));
        this.routeToRoleView(user.role);
    }

    checkSession() {
        const stored = sessionStorage.getItem('current_user');
        if (stored) {
            this.currentUser = JSON.parse(stored);
            this.routeToRoleView(this.currentUser.role);
        } else {
            this.switchView('login');
        }
    }

    logout() {
        this.currentUser = null;
        sessionStorage.removeItem('current_user');
        this.switchView('login');
        // reset login button state
        const btn = document.getElementById('btn-login');
        if (btn) btn.innerHTML = '<i data-lucide="log-in"></i> Authenticate & Connect';
        lucide.createIcons();
    }

    // Role Based Access Control Router
    routeToRoleView(role) {
        if (!this.views.includes(role)) {
            console.error("Unknown role:", role);
            return;
        }

        this.switchView(role);

        // Sub-initialization based on Active View
        setTimeout(() => {
            if (role === 'authority') {
                if(typeof initMap === 'function') {
                    if(document.getElementById('map').hasChildNodes()) {
                        if(window.map) window.map.invalidateSize();
                    } else {
                        initMap();
                    }
                }
                if(typeof initialRenderHospitalsPanel === 'function') initialRenderHospitalsPanel();
            } else if (role === 'admin') {
                if(typeof initAdminView === 'function') initAdminView();
            } else if (role === 'ambulance') {
                 if(typeof initAmbulanceView === 'function') initAmbulanceView();
            }
            lucide.createIcons();
        }, 100);
    }

    switchView(viewName) {
        // Hide all
        this.views.forEach(v => {
            const el = document.getElementById('view-' + v);
            if(el) el.classList.remove('active');
        });
        
        // Show target
        const target = document.getElementById('view-' + viewName);
        if(target) target.classList.add('active');
    }
}

// Global functions
window.AuthController = null;
window.logout = function() {
    if(window.AuthController) window.AuthController.logout();
};

document.addEventListener('DOMContentLoaded', () => {
    // Wait for API to be ready
    setTimeout(() => {
        window.AuthController = new AuthController();
    }, 100);
});
