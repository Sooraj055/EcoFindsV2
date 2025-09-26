// Supabase client initialization
// Include CDN before this file:
// <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
(function initSupabaseClient() {
	const SUPABASE_URL = 'https://vhvqnvxgutfutrivfupt.supabase.co';
	const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZodnFudnhndXRmdXRyaXZmdXB0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg4MDgzOTEsImV4cCI6MjA3NDM4NDM5MX0.19GCKP_-I_pEbkEQ8cpSupAUYPxYlDHVrW85JHteDf4';
	if (!window.supabase) {
		console.error('Supabase JS not loaded. Include @supabase/supabase-js v2 CDN before supabase.js');
		return;
	}
	window.sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
		auth: {
			redirectTo: `${window.location.origin}/verified.html`
		}
	});
	console.log('Supabase client initialized');
	window.eco = window.eco || {};
	window.eco.config = { SUPABASE_URL };
	
	// Set up auth state change listener for email verification
	window.sb.auth.onAuthStateChange((event, session) => {
		console.log('Auth state changed:', event, session);
		
		if (event === 'SIGNED_IN' && session?.user) {
			// Check if this is a fresh email verification
			const urlParams = new URLSearchParams(window.location.search);
			const isEmailVerification = urlParams.get('type') === 'signup' || 
									   urlParams.get('type') === 'recovery' ||
									   window.location.hash.includes('access_token');
			
			// If user just verified their email, redirect to verified page
			if (isEmailVerification && session.user.email_confirmed_at) {
				window.location.href = '/verified.html';
				return;
			}
		}
		
		if (event === 'SIGNED_OUT') {
			// Handle sign out if needed
		}
		
		// Handle token refresh
		if (event === 'TOKEN_REFRESHED') {
			console.log('Token refreshed');
		}
	});
})();
