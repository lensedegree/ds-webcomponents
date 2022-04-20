/* FIXME: Os web components devem utilizar o onclick padrão do HTML ou
  implementar o seu próprio atributo? */

class Button extends HTMLElement {
  constructor() {
    super()

		if(!this.root) {
			this._root = this.attachShadow({ mode: 'open' })
			this._header()
		}

		if(!this._container) {
			this._container = document.createElement('button')
			const children = document.createElement('slot')
			this._container.appendChild(children)
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
		linkDSCSS.setAttribute('href', 'https://unpkg.com/@overlens/ds-css/src/components/Button/index.css')
		this._root.appendChild(linkDSCSS)
	}

	connectedCallback() {
		if(!this.variant) {
			switch (this.getAttribute('variant')) {
				case 'basic':
					this.variant = 'basic'
					break
				case 'secundary':
					this.variant = 'secundary'
					break
				case 'tertiary':
					this.variant = 'tertiary'
					break
				case 'danger':
					this.variant = 'danger'
					break
				case 'disable':
					this.variant = 'disable'
					break
				default:
					this.variant = 'primary'
					break
			}
		}

		if(!this.size) {
			switch (this.getAttribute('size')) {
				case 'large':
					this.size = 'large'
					break
				case 'small':
					this.size = 'small'
					break
				default:
					this.size = 'medium'
					break
			}
		}

		if(this.variant === 'disable') {
			this.setAttribute('onclick', '() => {}')
		}

		this._render({ initial: true })
	}

	_render({ initial = false }) {
		if (!initial) {
			this._root.removeChild(this._container)
			this._container.innerHTML = ``
		}

		if(this.variant === 'basic') {
			this._createBasicButton()
		} else {
			this._createButton()
		}

		this._root.appendChild(this._container)
	}

	_createBasicButton() {
		this._container.className = [
			'button',
			'variant--basic'
		].join(' ')

		let icon = document.createElement('span')
		this._container.appendChild(icon)
	}

	_createButton() {
		this._container.className = [
			'button',
			`variant--${this.variant}`,
			`size--${this.size}`
		].join(' ')
	}
}

customElements.define('lens-button', Button)