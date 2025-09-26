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
			
			const currentTheme = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
			const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
			
			localStorage.setItem(THEME_KEY, nextTheme);
			applyTheme(nextTheme);
			
			// Update theme toggle button text
			btn.textContent = nextTheme === 'dark' ? '🌞' : '🌙';
		});
		
		// Set initial theme toggle button text
		const themeBtn = document.querySelector('[data-theme-toggle]');
		if (themeBtn) {
			themeBtn.textContent = saved === 'dark' ? '🌞' : '🌙';
		}
	}

	function navbarHtml(user) {
		const isLoggedIn = !!user;
		const addProductLink = isLoggedIn ? `<a href="addProduct.html" class="btn-primary text-sm">Add Product</a>` : '';
		
		// User profile dropdown
		const userDropdown = isLoggedIn ? `
			<div class="relative">
				<button id="userDropdownBtn" class="flex items-center gap-2 px-4 py-2 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300">
					<div class="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
						${(user.user_metadata?.username || 'U').charAt(0).toUpperCase()}
					</div>
					<span class="text-sm font-medium text-gray-700 dark:text-gray-300">${user.user_metadata?.username || 'Profile'}</span>
					<svg class="w-4 h-4 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
					</svg>
				</button>
				<div id="userDropdown" class="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 hidden z-50 overflow-hidden">
					<a href="account.html" class="block px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">👤 Profile</a>
					<a href="account.html#listings" class="block px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">📦 My Listings</a>
					<a href="account.html#purchases" class="block px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">🛒 My Purchases</a>
					<hr class="border-gray-200 dark:border-gray-700">
					<button id="logoutBtn" class="block w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900 transition-colors duration-200">🚪 Logout</button>
				</div>
			</div>
		` : `
			<div class="flex gap-3">
				<a href="account.html" class="btn-primary text-sm">Login</a>
				<a href="account.html" class="btn-outline text-sm">Register</a>
			</div>
		`;
		
		const categorySelect = `
			<select id="categorySelect" class="form-input text-sm py-2 px-3 min-w-[160px] bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 border-gray-300 dark:border-gray-600 focus:border-green-500 dark:focus:border-green-400">
				<option value="" class="text-gray-800 dark:text-gray-100">Categories</option>
				<option value="Electronics" class="text-gray-800 dark:text-gray-100">📱 Electronics</option>
				<option value="Books" class="text-gray-800 dark:text-gray-100">📚 Books</option>
				<option value="Fashion" class="text-gray-800 dark:text-gray-100">👕 Fashion</option>
				<option value="Furniture" class="text-gray-800 dark:text-gray-100">🪑 Furniture</option>
				<option value="Home Goods" class="text-gray-800 dark:text-gray-100">🏠 Home Goods</option>
				<option value="Sports" class="text-gray-800 dark:text-gray-100">⚽ Sports</option>
				<option value="Toys" class="text-gray-800 dark:text-gray-100">🧸 Toys</option>
				<option value="Miscellaneous" class="text-gray-800 dark:text-gray-100">🔧 Miscellaneous</option>
				<option value="Upcycled" class="text-gray-800 dark:text-gray-100">♻️ Upcycled</option>
			</select>`;
			
		return `
		<header class="bg-white dark:bg-gray-800 sticky top-0 z-50 shadow-md border-b border-gray-100 dark:border-gray-700">
			<div class="container">
				<div class="flex items-center justify-between py-4">
					<!-- Logo -->
					<a href="index.html" class="flex items-center gap-2">
						<div class="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center">
							<span class="text-white font-bold text-lg">🌱</span>
						</div>
						<span class="font-bold text-xl text-gray-800 dark:text-gray-100">EcoFinds</span>
					</a>
					
					<!-- Center: Search & Categories -->
					<div class="flex items-center gap-2 md:gap-4 flex-1 max-w-2xl mx-4 md:mx-8">
						<div class="relative flex-1 min-w-0">
							<input 
								id="navSearch" 
								type="text"
								placeholder="Search products..." 
								class="form-input w-full pl-10 pr-12 py-2 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 border-gray-300 dark:border-gray-600 focus:border-green-500 dark:focus:border-green-400 placeholder-gray-500 dark:placeholder-gray-400 relative z-10 text-sm md:text-base"
								autocomplete="off"
								spellcheck="false"
								aria-label="Search products"
							>
							<svg class="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
							</svg>
							<button 
								id="searchBtn" 
								type="button"
								class="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 text-gray-400 dark:text-gray-500 hover:text-green-500 dark:hover:text-green-400 transition-colors duration-200 z-20 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 rounded"
								aria-label="Search"
							>
								<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
								</svg>
							</button>
						</div>
						<div class="hidden md:block">
							${categorySelect}
						</div>
						<!-- Mobile categories dropdown -->
						<div class="md:hidden">
							<button id="mobileCategoryBtn" class="p-2 text-gray-600 dark:text-gray-300 hover:text-green-500 transition-colors duration-200">
								<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
								</svg>
							</button>
						</div>
					</div>
					
					<!-- Right: Actions -->
					<div class="flex items-center gap-4">
						<a href="premium.html" class="text-gray-600 dark:text-gray-300 hover:text-green-500 transition-colors duration-200 font-medium">Premium</a>
						<a href="donate.html" class="text-gray-600 dark:text-gray-300 hover:text-green-500 transition-colors duration-200 font-medium">Donate</a>
						<a href="rewards.html" class="text-gray-600 dark:text-gray-300 hover:text-green-500 transition-colors duration-200 font-medium">Rewards</a>
						<a href="wishlist.html" class="text-gray-600 dark:text-gray-300 hover:text-green-500 transition-colors duration-200 font-medium">Wishlist</a>
						<a href="cart.html" class="relative text-gray-600 dark:text-gray-300 hover:text-green-500 transition-colors duration-200 font-medium">
							Cart
							<span id="cartCount" class="absolute -top-2 -right-2 bg-green-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">0</span>
						</a>
						${addProductLink}
						${userDropdown}
						<button data-theme-toggle class="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200">🌙</button>
					</div>
				</div>
			</div>
		</header>`;
	}

	function footerHtml() {
		return `
		<footer class="mt-20 bg-gray-50 border-t border-gray-200 py-12">
			<div class="container">
				<div class="text-center">
					<div class="flex items-center justify-center gap-2 mb-4">
						<div class="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
							<span class="text-white font-bold">🌱</span>
						</div>
						<span class="font-bold text-xl text-gray-800">EcoFinds</span>
					</div>
					<p class="text-gray-600 mb-2">Buy. Sell. Donate. Sustain. ♻️</p>
					<p class="text-sm text-gray-500">EcoFinds &copy; ${new Date().getFullYear()}</p>
				</div>
			</div>
		</footer>`;
	}

	// Global auth state management
	window.eco = window.eco || {};
	window.eco.auth = {
		user: null,
		isLoggedIn: false,
		checkAuth: async function() {
			try {
				const { data } = await sb.auth.getUser();
				const wasLoggedIn = this.isLoggedIn;
				this.user = data.user;
				this.isLoggedIn = !!this.user;
				
				// Dispatch event if auth state changed
				if (wasLoggedIn !== this.isLoggedIn) {
					document.dispatchEvent(new CustomEvent('eco-auth-changed', { 
						detail: { isLoggedIn: this.isLoggedIn, user: this.user } 
					}));
				}
				
				return this.isLoggedIn;
			} catch (error) {
				console.error('Auth check failed:', error);
				const wasLoggedIn = this.isLoggedIn;
				this.user = null;
				this.isLoggedIn = false;
				
				// Dispatch event if auth state changed
				if (wasLoggedIn !== this.isLoggedIn) {
					document.dispatchEvent(new CustomEvent('eco-auth-changed', { 
						detail: { isLoggedIn: this.isLoggedIn, user: this.user } 
					}));
				}
				
				return false;
			}
		},
		requireAuth: function(action) {
			if (!this.isLoggedIn) {
				this.showLoginModal();
				return false;
			}
			return true;
		},
		showLoginModal: function() {
			const modal = document.createElement('div');
			modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
			modal.innerHTML = `
				<div class="bg-white dark:bg-zinc-900 p-6 rounded-lg max-w-md mx-4">
					<h3 class="text-lg font-semibold mb-4">Login Required</h3>
					<p class="text-zinc-600 dark:text-zinc-400 mb-4">Please login to continue with this action.</p>
					<div class="flex gap-3">
						<a href="account.html" class="px-4 py-2 bg-emerald-600 text-white rounded">Login</a>
						<button class="px-4 py-2 bg-zinc-200 dark:bg-zinc-700 text-zinc-800 dark:text-zinc-200 rounded" onclick="this.closest('.fixed').remove()">Cancel</button>
					</div>
				</div>
			`;
			document.body.appendChild(modal);
		},
		handleVerificationError: function() {
			// Check URL for verification error parameters
			const urlParams = new URLSearchParams(window.location.search);
			const error = urlParams.get('error');
			const errorDescription = urlParams.get('error_description');
			
			if (error === 'access_denied' || errorDescription?.includes('expired') || errorDescription?.includes('invalid')) {
				// Redirect to verification error page
				const email = urlParams.get('email');
				const redirectUrl = email ? `verify-error.html?email=${encodeURIComponent(email)}` : 'verify-error.html';
				window.location.href = redirectUrl;
				return true;
			}
			
			return false;
		}
	};

	async function renderChrome() {
		// Check for verification errors first
		if (window.eco.auth.handleVerificationError()) {
			return; // Redirect will happen, don't continue rendering
		}
		
		// Check auth state first
		await window.eco.auth.checkAuth();
		const user = window.eco.auth.user;
		
		const navMount = document.getElementById('navbar');
		if (navMount) navMount.innerHTML = navbarHtml(user);
		const footMount = document.getElementById('footer');
		if (footMount) footMount.innerHTML = footerHtml();

		// User dropdown functionality
		const userDropdownBtn = document.getElementById('userDropdownBtn');
		const userDropdown = document.getElementById('userDropdown');
		if (userDropdownBtn && userDropdown) {
			userDropdownBtn.addEventListener('click', (e) => {
				e.stopPropagation();
				userDropdown.classList.toggle('hidden');
			});
			
			// Close dropdown when clicking outside
			document.addEventListener('click', (e) => {
				if (!userDropdownBtn.contains(e.target) && !userDropdown.contains(e.target)) {
					userDropdown.classList.add('hidden');
				}
			});
		}

		const logoutBtn = document.getElementById('logoutBtn');
		if (logoutBtn) {
			logoutBtn.addEventListener('click', async () => {
				await sb.auth.signOut();
				window.eco.auth.user = null;
				window.eco.auth.isLoggedIn = false;
				
				// Dispatch auth change event
				document.dispatchEvent(new CustomEvent('eco-auth-changed', { 
					detail: { isLoggedIn: false, user: null } 
				}));
				
				location.href = 'index.html';
			});
		}
		const categorySelect = document.getElementById('categorySelect');
		if (categorySelect) {
			categorySelect.addEventListener('change', () => {
				const category = categorySelect.value;
				if (category) {
					window.location.href = `category.html?category=${encodeURIComponent(category)}`;
				}
			});
		}
		
		const navSearch = document.getElementById('navSearch');
		const searchBtn = document.getElementById('searchBtn');
		
		function performSearch() {
			const query = navSearch?.value?.trim();
			if (query) {
				window.location.href = `search.html?query=${encodeURIComponent(query)}`;
			}
		}
		
		if (navSearch) {
			navSearch.addEventListener('keypress', (e) => {
				if (e.key === 'Enter') {
					performSearch();
				}
			});
			
			navSearch.addEventListener('input', (e) => {
				const ev = new CustomEvent('eco-search-change', { detail: { value: e.target.value } });
				document.dispatchEvent(ev);
			});
		}
		
		if (searchBtn) {
			searchBtn.addEventListener('click', performSearch);
		}
		
		// Mobile category dropdown
		const mobileCategoryBtn = document.getElementById('mobileCategoryBtn');
		if (mobileCategoryBtn) {
			mobileCategoryBtn.addEventListener('click', () => {
				// Create mobile category dropdown
				const existingDropdown = document.getElementById('mobileCategoryDropdown');
				if (existingDropdown) {
					existingDropdown.remove();
					return;
				}
				
				const dropdown = document.createElement('div');
				dropdown.id = 'mobileCategoryDropdown';
				dropdown.className = 'absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50';
				dropdown.innerHTML = `
					<div class="p-4">
						<h3 class="font-semibold text-gray-800 dark:text-gray-100 mb-3">Categories</h3>
						<div class="space-y-2">
							<a href="category.html?category=Electronics" class="block px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">📱 Electronics</a>
							<a href="category.html?category=Books" class="block px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">📚 Books</a>
							<a href="category.html?category=Fashion" class="block px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">👕 Fashion</a>
							<a href="category.html?category=Furniture" class="block px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">🪑 Furniture</a>
							<a href="category.html?category=Home Goods" class="block px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">🏠 Home Goods</a>
							<a href="category.html?category=Sports" class="block px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">⚽ Sports</a>
							<a href="category.html?category=Toys" class="block px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">🧸 Toys</a>
							<a href="category.html?category=Miscellaneous" class="block px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">🔧 Miscellaneous</a>
							<a href="category.html?category=Upcycled" class="block px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">♻️ Upcycled</a>
						</div>
					</div>
				`;
				
				mobileCategoryBtn.parentElement.style.position = 'relative';
				mobileCategoryBtn.parentElement.appendChild(dropdown);
				
				// Close dropdown when clicking outside
				document.addEventListener('click', (e) => {
					if (!mobileCategoryBtn.contains(e.target) && !dropdown.contains(e.target)) {
						dropdown.remove();
					}
				});
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
