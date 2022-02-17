class Progress extends HTMLElement {
	constructor() {
    super()

		if(!this.root) {
			this._root = this.attachShadow({ mode: 'open' })
			this._header()
		}
		
		if(!this._container) {
			this._container = document.createElement('div')
		}
  }

	_header() {
		let linkNeueHaasUnica = document.createElement('link')
		linkNeueHaasUnica.setAttribute('rel', 'stylesheet')
		linkNeueHaasUnica.setAttribute('href', 'https://use.typekit.net/vpa4dxb.css')
		this._root.appendChild(linkNeueHaasUnica)

		let linkMaterialIcons = document.createElement('link')
		linkMaterialIcons.setAttribute('rel', 'stylesheet')
		linkMaterialIcons.setAttribute('href', 'https://fonts.googleapis.com/icon?family=Material+Icons')
		this._root.appendChild(linkMaterialIcons)

		let linkDSCSS = document.createElement('link')
		linkDSCSS.setAttribute('rel', 'stylesheet')
		linkDSCSS.setAttribute('href', 'https://unpkg.com/@lensedegree/ds-css/src/components/Progress/index.css')
		this._root.appendChild(linkDSCSS)
	}

	connectedCallback() {
		if(!this.variant) {
			switch (this.getAttribute('variant')) {
				case 'mobile':
					this.variant = 'mobile'
					break
				default:
					this.variant = 'desktop'
					break
			}
		}

		if(!this.step) {
			this.step = Number(this.getAttribute('step')) || 0
		}

		if(!this.error) {
			this.error = this.getAttribute('error') === ''
				|| this.getAttribute('error') === 'true'
				? true
				: false
		}
		
		this._container.className = [
			'progress',
			`variant--${this.variant}`
		].join(' ')

		this._render()
	}

	_render() {
		this._root.appendChild(this._container)
	}

	_renderSteps() {
		
	}
}

customElements.define('lens-progress', Progress)