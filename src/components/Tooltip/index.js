class Tooltip extends HTMLElement {
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
		linkDSCSS.setAttribute('href', 'https://unpkg.com/@overlens/ds-css/src/components/Tooltip/index.css')
		this._root.appendChild(linkDSCSS)
	}

	connectedCallback() {
		if(!this.variant) {
			switch (this.getAttribute('variant')) {
				case 'click':
					this.variant = 'click'
					break
				default:
					this.variant = 'definition'
					break
			}
		}

		if(!this.linkText) {
			this.linkText = this.getAttribute('linkText')
				&& this.getAttribute('linkText') !== ''
					? this.getAttribute('linkText')
					: null
		}

		if(!this.linkHref) {
			this.linkHref = this.getAttribute('linkHref')
				&& this.getAttribute('linkHref') !== ''
					? this.getAttribute('linkHref')
					: '#'
		}

		this._container.className = [
			'tooltip-container',
			`variant--${this.variant}`
		].join(' ')

		this._render()
	}

	_render() {
		this._renderTooltip()

		this._root.appendChild(this._container)
	}

	_renderTooltip() {
		const buttonPointer = document.createElement('span')
		this._container.appendChild(buttonPointer)

		const tooltipContainer = document.createElement('div')
		tooltipContainer.className = 'tooltip'

		const text = document.createTextNode(this.textContent)
		tooltipContainer.appendChild(text)

		if(this.linkText) {
			const linkContainer = document.createElement('span')
			const link = document.createElement('a')
			link.setAttribute('href', this.linkHref)
			link.innerText = this.linkText
			linkContainer.appendChild(link)

			tooltipContainer.appendChild(linkContainer)
		} 

		this._container.appendChild(tooltipContainer)
	}
}

customElements.define('lens-tooltip', Tooltip)