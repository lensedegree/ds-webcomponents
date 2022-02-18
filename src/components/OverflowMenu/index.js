class OverflowMenu extends HTMLElement {
	constructor() {
    super()
		
		this.toggleMenu = this.toggleMenu.bind(this)

		if(!this.root) {
			this._root = this.attachShadow({ mode: 'open' })
			this._header()
		}
		
		if(!this._container) {
			this._container = document.createElement('div')
		}

		if(!this._optionsContainer) {
			this._optionsContainer = document.createElement('div')
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
		linkDSCSS.setAttribute('href', 'https://unpkg.com/@overlens/ds-css/src/components/OverflowMenu/index.css')
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

			this._root.removeChild(this._optionsContainer)
			this._optionsContainer.innerHTML = ``
		}

		this._renderMenu()
		this._renderOptions(true)

		this._root.appendChild(this._container)
		this._root.appendChild(this._optionsContainer)
	}

	_renderMenu() {
		this._container.className = [
			'overflow',
			'menu'
		].join(' ')
		this._container.onclick = this.toggleMenu

		const icon = document.createElement('span')
		this._container.appendChild(icon)
	}

	_renderOptions() {
		this._optionsContainer.className = [
			'overflow',
			'options',
			`${this.active ? 'active' : 'deactive'}`
		].join(' ')

		for(let child of this.children) {
			const cloneChild = child.cloneNode(true)
			this._optionsContainer.appendChild(cloneChild)
		}
	}

	toggleMenu = () => {
		this.active = !!!this.active
		this._render({})
	}
}

customElements.define('lens-overflow-menu', OverflowMenu)