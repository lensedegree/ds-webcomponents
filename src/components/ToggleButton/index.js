class ToggleButton extends HTMLElement {
	constructor() {
    super()

		this.toggle = this.toggle.bind(this)

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
		linkDSCSS.setAttribute('href', 'https://unpkg.com/@lensedegree/ds-css/src/components/ToggleButton/index.css')
		this._root.appendChild(linkDSCSS)
	}

	connectedCallback() {
		if(!this.active) {
			this.active = 
				this.getAttribute('active') === '' 
				|| this.getAttribute('active') === 'true' 
					? true
					: false
		}

		this._render({ initial: true })
	}
	
	_render({ initial = false }) {
		if (!initial) {
			this._root.removeChild(this._container)
			this._container.innerHTML = ``
		}

		this._container.className = [
			'toggle-button',
			`${ this.active ? 'active' : 'deactive'}`
		].join(' ')

		const button = document.createElement('div')
		button.className = 'toggle'

		this._container.appendChild(button)
		this._container.onclick = this.toggle

		this._root.appendChild(this._container)
	}

	toggle() {
		this.active = !!!this.active
		this._render({})
	}
}

customElements.define('lens-toggle-button', ToggleButton)