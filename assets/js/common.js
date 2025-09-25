// Common UI: navbar, footer, dark mode, auth state badge
(function () {
	const THEME_KEY = 'eco_theme';

	function applyTheme(theme) {
		const html = document.documentElement;
		if (theme === 'dark') {
			html.classList.add('dark');
		} else {
			html.classList.remove('dark');
		}
	}

	function setupThemeToggle() {
		const saved = localStorage.getItem(THEME_KEY) || 'light';
		applyTheme(saved);
		document.addEventListener('click', (e) => {
			const btn = e.target.closest('[data-theme-toggle]');
			if (!btn) return;
			const next = document.documentElement.classList.contains('dark') ? 'light' : 'dark';
			localStorage.setItem(THEME_KEY, next);
			applyTheme(next);
		});
	}

	function navbarHtml(user) {
		const isLoggedIn = !!user;
		const addProductLink = isLoggedIn ? `<a href="addProduct.html" class="px-3 py-1 rounded bg-emerald-600 text-white text-sm">Add Product</a>` : '';
		const authLinks = isLoggedIn
			? `<a href="account.html" class="px-3 py-1 rounded hover:bg-emerald-50 dark:hover:bg-zinc-800">Account</a><button id="logoutBtn" class="px-3 py-1 rounded bg-red-600 text-white text-sm">Logout</button>`
			: `<a href="account.html" class="px-3 py-1 rounded bg-emerald-600 text-white text-sm">Login</a><a href="account.html" class="px-3 py-1 rounded bg-zinc-100 dark:bg-zinc-800 text-sm">Sign Up</a>`;
		const filterSelect = `
			<select id="navFilter" class="px-2 py-1 rounded border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-sm">
				<option value="">Filters</option>
				<option value="new">New Arrivals</option>
				<option value="age">Age (youngest first)</option>
				<option value="p0-500">₹0–500</option>
				<option value="p500-1000">₹500–1000</option>
				<option value="p1000-5000">₹1000–5000</option>
				<option value="p5000+">₹5000+</option>
				<option value="rating">Seller Rating (highest)</option>
				<option value="near">Nearest Location</option>
			</select>`;
		return `
		<header class="bg-white/80 dark:bg-zinc-900/80 backdrop-blur sticky top-0 z-50 border-b border-zinc-200 dark:border-zinc-800">
			<div class="max-w-6xl mx-auto px-4 py-3 flex items-center gap-3">
				<a href="index.html" class="font-bold text-emerald-700 dark:text-emerald-400 text-lg">EcoFinds 🌱</a>
				<nav class="ml-auto flex items-center gap-2 text-sm">
					${filterSelect}
					<a href="premium.html" class="px-3 py-1 rounded hover:bg-emerald-50 dark:hover:bg-zinc-800">Premium</a>
					<a href="donate.html" class="px-3 py-1 rounded hover:bg-emerald-50 dark:hover:bg-zinc-800">Donate</a>
					<a href="rewards.html" class="px-3 py-1 rounded hover:bg-emerald-50 dark:hover:bg-zinc-800">Rewards</a>
					<a href="wishlist.html" class="px-3 py-1 rounded hover:bg-emerald-50 dark:hover:bg-zinc-800">Wishlist</a>
					<a href="cart.html" class="px-3 py-1 rounded hover:bg-emerald-50 dark:hover:bg-zinc-800">Cart <span id="cartCount" class="ml-1 inline-block min-w-[1.25rem] text-center rounded-full bg-emerald-600 text-white">0</span></a>
					<span id="creditsBadge" class="px-2 py-1 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200">CO₂: 0</span>
					${addProductLink}
					${authLinks}
					<button data-theme-toggle class="px-3 py-1 rounded bg-zinc-100 dark:bg-zinc-800">🌓</button>
				</nav>
			</div>
		</header>`;
	}

	function footerHtml() {
		return `
		<footer class="mt-16 border-t border-zinc-200 dark:border-zinc-800 py-10 text-center text-sm text-zinc-600 dark:text-zinc-400">
			<div>Buy. Sell. Donate. Sustain. ♻️</div>
			<div class="mt-2">EcoFinds &copy; ${new Date().getFullYear()}</div>
		</footer>`;
	}

	async function renderChrome() {
		const user = (await sb.auth.getUser()).data.user || null;
		const navMount = document.getElementById('navbar');
		if (navMount) navMount.innerHTML = navbarHtml(user);
		const footMount = document.getElementById('footer');
		if (footMount) footMount.innerHTML = footerHtml();

		const logoutBtn = document.getElementById('logoutBtn');
		if (logoutBtn) {
			logoutBtn.addEventListener('click', async () => {
				await sb.auth.signOut();
				location.href = 'index.html';
			});
		}
		const navFilter = document.getElementById('navFilter');
		if (navFilter) {
			navFilter.addEventListener('change', () => {
				const ev = new CustomEvent('eco-filter-change', { detail: { value: navFilter.value } });
				document.dispatchEvent(ev);
			});
		}
		function refreshBadges(){
			try {
				const cartCount = window.eco?.cart?.getTotalItems?.() || 0;
				const ccEl = document.getElementById('cartCount'); if (ccEl) ccEl.textContent = String(cartCount);
				const credits = window.eco?.credits?.get?.() || 0;
				const crEl = document.getElementById('creditsBadge'); if (crEl) crEl.textContent = 'CO₂: ' + credits;
			} catch {}
		}
		refreshBadges();
		document.addEventListener('eco-storage-changed', refreshBadges);
	}

	document.addEventListener('DOMContentLoaded', () => {
		setupThemeToggle();
		renderChrome();
	});
})();
