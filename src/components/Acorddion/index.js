class Acorddion extends HTMLElement {
	constructor() {
    super()

		if(!this._root) {
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
		linkDSCSS.setAttribute('href', 'https://unpkg.com/@overlens/ds-css/src/components/Acorddion/index.css')
		this._root.appendChild(linkDSCSS)
	}

	connectedCallback() {
		if(!this.size) {
			this.size = this.getAttribute('size') === 'tiny' ? 'tiny' : 'normal'
		}

		if(!this.active) {
			this.active = 
				this.getAttribute('active') === '' 
				|| this.getAttribute('active') === 'true' 
					? true
					: false
		}

		if(!this.title) {
			this.title = this.getAttribute('title')
		}

		this._container.className = [
			'acorddion'
		].join(' ')

		this._render({ initial: true })
	}

	_render({ initial = false }) {
		if (!initial) {
			this._root.removeChild(this._container)
			this._container.innerHTML = ``
		}

		const acorddionTitle = this._createTitle()
		this._container.appendChild(acorddionTitle)
		
		const acorddionBody = this._createBody()
		this._container.appendChild(acorddionBody)

		this._root.appendChild(this._container)
	}

	_createTitle() {
		let acorddionTitle = document.createElement('div')
		acorddionTitle.className = [
			'acorddion-title',
			'variant--basic',
			`size--${this.size}`,
			this.active ? 'active' : 'deactive'
		].join(' ')
		acorddionTitle.innerHTML = `
			<p>
				${this.title || '## Sem título ##'}
			</p>
			<span></span>
		`
		acorddionTitle.onclick = this.toggleAcorddion
		return acorddionTitle
	}

	_createBody() {
		let acorddionBody = document.createElement('div')
		acorddionBody.className = [
			'acorddion-body',
			`size--${this.size}`,
			this.active ? 'active': 'deactive'
		].join(' ')
		let children = document.createElement('slot')
		acorddionBody.appendChild(children)

		return acorddionBody
	}

	toggleAcorddion = () => {
		this.active = !!!this.active
		this._render({})
	}
}

customElements.define('lens-acorddion', Acorddion)