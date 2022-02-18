class TextareaInput extends HTMLElement {
	constructor() {
    super()

		if(!this.root) {
			this._root = this.attachShadow({ mode: 'open' })
			this._header()
		}
		
		if(!this._container) {
			this._container = document.createElement('div')
		}

		if(!this._messageContainer) {
			this._messageContainer = document.createElement('div')
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
		linkDSCSS.setAttribute('href', 'https://unpkg.com/@overlens/ds-css/src/components/Textarea/index.css')
		this._root.appendChild(linkDSCSS)
	}

	connectedCallback() {
		if(!this.placeholder) {
			this.placeholder = this.getAttribute('placeholder')
				? this.getAttribute('placeholder')
				: ''
		}
		
		if(!this.message) {
			this.message = this.getAttribute('message')
				&& this.getAttribute('message') !== ''
					? this.getAttribute('message')
					: null
		}

		this._container.className = [
			'textarea-input',
		].join(' ')
		
		this._messageContainer.className = [
			'textarea-message',
			this.message ? 'active' : 'deactive'
		].join(' ')

		this._render()
	}

	_render() {
		this._renderInput()
		this._root.appendChild(this._container)

		if(this.message) {
			this._renderMessage()
			this._root.appendChild(this._messageContainer)
		}
	}

	_renderInput() {
		const textarea = document.createElement('textarea')
		textarea.setAttribute('placeholder', this.placeholder)

		this._container.appendChild(textarea)
	}

	_renderMessage() {
		this._messageContainer.innerText = this.message
	}
}

customElements.define('lens-textarea', TextareaInput)