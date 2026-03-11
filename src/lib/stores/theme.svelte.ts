let dark = $state(false);

export const theme = {
	get dark() {
		return dark;
	},

	init() {
		if (typeof document === 'undefined') return;
		dark = document.documentElement.classList.contains('dark');
	},

	toggle() {
		dark = !dark;
		if (typeof document === 'undefined') return;
		document.documentElement.classList.toggle('dark', dark);
		try {
			localStorage.setItem('theme', dark ? 'dark' : 'light');
		} catch {
			// localStorage unavailable
		}
	}
};
