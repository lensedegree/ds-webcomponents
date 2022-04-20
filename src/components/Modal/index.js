import '../Button'

class Modal extends HTMLElement {
	constructor() {
    super()
		
		this.handleConfirme = this.handleConfirme.bind(this)
		this.handleClose = this.handleClose.bind(this)

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
		linkDSCSS.setAttribute('href', 'https://unpkg.com/@overlens/ds-css/src/components/Modal/index.css')
		this._root.appendChild(linkDSCSS)
	}

	connectedCallback() {
		if(!this.variant) {
			switch (this.getAttribute('variant')) {
				case 'alert':
					this.variant = 'alert'
					break
				default:
					this.variant = 'confirmation'
					break
			}
		}

		if(!this.format) {
			switch (this.getAttribute('format')) {
				case 'mobile':
					this.format = 'mobile'
					break
				default:
					this.format = 'desktop'
					break
			}
		}

		if(!this.info) {
			this.info = !!!this.getAttribute('info') 
				? this.info = ''
				: this.info = this.getAttribute('info')
		}

		if(!this.onAccept) {
			this.onAccept = this.getAttribute('onAccept') 
				? this.onAccept = Function(this.getAttribute('onAccept'))
				: this.onAccept = () => {}
		}

		if(!this.onClose) {
			this.onClose = this.getAttribute('onClose') 
				? this.onClose = Function(this.getAttribute('onClose'))
				: this.onClose = () => {}
		}

		if(!this.primaryButtonText) {
			this.primaryButtonText = !!!this.getAttribute('primaryButton') 
				? this.primaryButtonText = 'Confirmar'
				: this.primaryButtonText = this.getAttribute('primaryButton')
		}

		if(!this.secundaryButtonText) {
			this.secundaryButtonText = !!!this.getAttribute('secundaryButton') 
				? this.secundaryButtonText = 'Cancelar'
				: this.secundaryButtonText = this.getAttribute('secundaryButton')
		}
		
		this._container.className = [
			'modal',
			`variant--${this.variant}`,
			`format--${this.format}`
		].join(' ')

		this._render()
	}

	_render() {
		this._renderText()
		this._renderButtons()

		this._root.appendChild(this._container)
	}

	_renderText() {
		const container = document.createElement('span')

		const textContainer = document.createElement('span')

		const textElement = document.createElement('p')
		const children = document.createElement('slot')
		textElement.appendChild(children)
		textContainer.appendChild(textElement)

		const infoElement = document.createElement('p')
		infoElement.innerHTML = `${this.info}`
		textContainer.appendChild(infoElement)
		container.appendChild(textContainer)

		const closeIcon = document.createElement('span')
		closeIcon.onclick = this.handleClose
		container.appendChild(closeIcon)

		this._container.appendChild(container)
	}

	_renderButtons() {
		const buttonsContainer = document.createElement('span')

		const primaryButton = document.createElement('lens-button')
		primaryButton.setAttribute(
			'variant', 
			this.variant === 'alert' ? 'danger' : 'primary'
		)
		primaryButton.setAttribute('size', 'medium')
		primaryButton.innerHTML = this.primaryButtonText
		primaryButton.onclick = this.handleConfirme
		buttonsContainer.appendChild(primaryButton)

		const secundaryButton = document.createElement('lens-button')
		secundaryButton.setAttribute('variant', 'tertiary')
		secundaryButton.setAttribute('size', 'medium')
		secundaryButton.innerHTML = this.secundaryButtonText
		secundaryButton.onclick = this.handleClose
		buttonsContainer.appendChild(secundaryButton)

		this._container.appendChild(buttonsContainer)
	}
	
	handleConfirme() {
		this.onAccept()
	}

	handleClose() {
		this.onClose()
	}
}

customElements.define('lens-modal', Modal)