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
	window.sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
	console.log('Supabase client initialized');
	window.eco = window.eco || {};
	window.eco.config = { SUPABASE_URL };
})();
