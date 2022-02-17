class Link extends HTMLElement {
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
		linkDSCSS.setAttribute('href', 'https://unpkg.com/@lensedegree/ds-css/src/components/Link/index.css')
		this._root.appendChild(linkDSCSS)
	}

	connectedCallback() {
		if(!this.variant) {
			switch (this.getAttribute('variant')) {
				case 'danger':
					this.variant = 'danger'
					break
				default:
					this.variant = 'basic'
					break
			}
		}

		if(!this.size) {
			switch (this.getAttribute('size')) {
				case 'small':
					this.size = 'small'
					break
				case 'large':
					this.size = 'large'
					break
				default:
					this.size = 'medium'
					break
			}
		}

		this._container.className = [
			'link',
			`variant--${this.variant}`,
			`size--${this.size}`
		].join(' ')
		
		this._render()
	}

	_render() {
		const children = document.createElement('slot')
		this._container.appendChild(children)
		this._root.appendChild(this._container)
	}
}

customElements.define('lens-link', Link)