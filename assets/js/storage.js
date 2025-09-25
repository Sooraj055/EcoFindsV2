// LocalStorage helpers for cart and wishlist
(function () {
	const CART_KEY = 'eco_cart';
	const WISHLIST_KEY = 'eco_wishlist';
	const CREDITS_KEY = 'eco_credits';

	function read(key) {
		try {
			return JSON.parse(localStorage.getItem(key) || '[]');
		} catch {
			return [];
		}
	}
	function write(key, value) {
		localStorage.setItem(key, JSON.stringify(value));
		document.dispatchEvent(new CustomEvent('eco-storage-changed', { detail: { key } }));
	}

	function addTo(key, item) {
		const list = read(key);
		const existing = list.find(x => x.id === item.id);
		if (existing) {
			existing.quantity = (existing.quantity || 1) + 1;
		} else {
			list.push({ ...item, quantity: 1 });
		}
		write(key, list);
		return list;
	}
	function removeFrom(key, id) {
		const list = read(key).filter(x => x.id !== id);
		write(key, list);
		return list;
	}

	function creditsRead() {
		try { return Number(localStorage.getItem(CREDITS_KEY) || '0'); } catch { return 0; }
	}
	function creditsWrite(val) {
		localStorage.setItem(CREDITS_KEY, String(val));
		document.dispatchEvent(new CustomEvent('eco-storage-changed', { detail: { key: CREDITS_KEY } }));
	}
	function creditsAdd(delta) { creditsWrite(creditsRead() + Number(delta||0)); }

	window.eco = window.eco || {};
	window.eco.cart = {
		get: () => read(CART_KEY),
		add: (item) => addTo(CART_KEY, item),
		remove: (id) => removeFrom(CART_KEY, id),
		clear: () => write(CART_KEY, []),
		getTotalItems: () => read(CART_KEY).reduce((sum, item) => sum + (item.quantity || 1), 0)
	};
	window.eco.wishlist = {
		get: () => read(WISHLIST_KEY),
		add: (item) => addTo(WISHLIST_KEY, item),
		remove: (id) => removeFrom(WISHLIST_KEY, id),
		clear: () => write(WISHLIST_KEY, [])
	};
	window.eco.credits = { get: creditsRead, set: creditsWrite, add: creditsAdd };
})();
