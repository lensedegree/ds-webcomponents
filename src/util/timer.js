export class PausableTimeout {
	constructor(callback, delay) {
		this.id = null
		this.start = Date.now()
		this.remaining = delay
		this.callback = callback

		this.resume()
	}

	pause() {
		window.clearTimeout(this.id);
		this.id = null;
		this.remaining -= Date.now() - this.start;
	};

	resume() {
			if (this.id) {
					return;
			}

			this.start = Date.now();
			this.id = window.setTimeout(this.callback, this.remaining);
	};
}
