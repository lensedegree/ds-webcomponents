class IconShape extends HTMLElement {
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
		linkMaterialIcons.setAttribute('href', 'https://fonts.googleapis.com/css?family=Material+Icons|Material+Icons+Outlined|Material+Icons+Two+Tone|Material+Icons+Round|Material+Icons+Sharp')
		this._root.appendChild(linkMaterialIcons)

		let linkDSCSS = document.createElement('link')
		linkDSCSS.setAttribute('rel', 'stylesheet')
		linkDSCSS.setAttribute('href', 'https://unpkg.com/@overlens/ds-css/src/components/IconShape/index.css')
		this._root.appendChild(linkDSCSS)
	}

	connectedCallback() {
		if(!this.shape) {
			switch (this.getAttribute('shape')) {
				case 'circle':
					this.shape = 'circle'
					break
				default:
					this.shape = 'square'
					break
			}
		}

		if(!this.size) {
			switch (this.getAttribute('size')) {
				case 'small':
					this.size = 'small'
					break
				default:
					this.size = 'medium'
					break
			}
		}

		if(!this.variant) {
			switch (this.getAttribute('variant')) {
				case 'outlined':
					this.variant = 'outlined'
					break
				default:
					this.variant = 'filled'
					break
			}
		}
		
		this._render()
	}

	_render() {
		this._container.className = [
			'icon-shape',
			`shape--${this.shape}`,
			`size--${this.size}`,
			`variant--${this.variant}`,
		].join(' ')

		for(let child of this.children) {
			const cloneChild = child.cloneNode(true)
			this._container.appendChild(cloneChild)
		}

		this._root.appendChild(this._container)
	}
}

customElements.define('lens-icon-shape', IconShape)