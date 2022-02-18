class Tag extends HTMLElement {
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
		linkDSCSS.setAttribute('href', 'https://unpkg.com/@overlens/ds-css/src/components/Tag/index.css')
		this._root.appendChild(linkDSCSS)
	}

	connectedCallback() {
		if(!this.variant) {
			switch (this.getAttribute('variant')) {
				case 'filter':
					this.variant = 'filter'
					break
				default:
					this.variant = 'selection'
					break
			}
		}

		this._container.className = [
			'tag',
			`variant--${this.variant}`
		].join(' ')

		this._render()
	}

	_render() {
		this._renderTag()

		this._root.appendChild(this._container)
	}

	_renderTag() {
		const tagName = document.createElement('p')
		const children = document.createElement('slot')
		tagName.appendChild(children)
		this._container.appendChild(tagName)

		if(this.variant === 'filter') {
			const closeIcon = document.createElement('div')
			const icon = document.createElement('span')
			closeIcon.appendChild(icon)
			this._container.appendChild(closeIcon)
		}
	}
}

customElements.define('lens-tag', Tag)