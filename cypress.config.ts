import { defineConfig } from 'cypress';

export default defineConfig({
	e2e: {
		setupNodeEvents(on, config) {
			// implement node event listeners here
		},
		baseUrl: 'http://racunovodstvo.k8s.elab.rs:32264',
		viewportWidth: 1920,
		viewportHeight: 1080,
	},
});
