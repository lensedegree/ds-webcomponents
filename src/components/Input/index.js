/* FIXME: Aparentemente elementos de fora do shadow dom não interagem
com os elementos dentro dele, portanto uma tag form não teria acesso
às informações do input */

class Input extends HTMLElement {
	constructor() {
    super()

		this.handleOnChange = this.handleOnChange.bind(this)
		this.toggleVisibility = this.toggleVisibility.bind(this)
		this.clearValue = this.clearValue.bind(this)

		if(!this.root) {
			this._root = this.attachShadow({ mode: 'open' })
			this._header()
		}
		
		if(!this._container) {
			this._container = document.createElement('div')
		}

		if(!this._infoContainer) {
			this._infoContainer = document.createElement('p')
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
		linkDSCSS.setAttribute('href', 'https://unpkg.com/@overlens/ds-css/src/components/Input/index.css')
		this._root.appendChild(linkDSCSS)
	}

	connectedCallback() {
		if(!this.variant) {
			switch (this.getAttribute('variant')) {
				case 'email':
					this.variant = 'email'
					break
				case 'name':
					this.variant = 'name'
					break
				case 'password':
					this.variant = 'password'
					break
				case 'phone':
					this.variant = 'phone'
					break
				case 'search':
					this.variant = 'search'
					break
				default:
					this.variant = 'text'
					break
			}
		}

		if(!this.disable) {
			this.disable = 
				this.getAttribute('disable') === '' 
				|| this.getAttribute('disable') === 'true' 
					? true
					: false
		}

		if(!this.visibility) {
			this.visibility = false
		}

		if(!this.placeholder) {
			this.placeholder = !!!this.getAttribute('placeholder') 
				? this.placeholder = ''
				: this.placeholder = this.getAttribute('placeholder')
		}

		if(!this.value) {
			this.value = !!!this.getAttribute('value') 
				? this.value = ''
				: this.value = this.getAttribute('value')
		}

		if(!this.info) {
			this.info = !!!this.getAttribute('info') 
				? this.info = ''
				: this.info = this.getAttribute('info')
		}

		if(!this.error) {
			this.error = 
				this.getAttribute('error') === '' 
				|| this.getAttribute('error') === 'true' 
					? true
					: false
		}
		
		this._render({ initial: true })
	}

	_render({ initial = false }) {
		if (!initial) {
			this._root.removeChild(this._container)
			this._container.innerHTML = ``

			this._root.removeChild(this._infoContainer)
			this._infoContainer.innerHTML = ``
		}

		this._container.className = [
			'input',
			`variant--${this.variant}`,
			`${this.disable ? 'disable' : 'enable'}`,
			`${this.error ? 'error' : ''}`
		].join(' ')
		
		this._renderInputIcon()
		this._renderInput()
		this._renderButtonIcon({ initial: true })
		
		this._root.appendChild(this._container)

		if(this.info !== '') {
			this._infoContainer.className = [
				'input-message',
				`${this.info !== '' ? 'active' : 'deactive'}`,
				`${this.error ? 'error' : 'notify'}`
			].join(' ')
			
			this._renderMessage()
			this._root.appendChild(this._infoContainer)
		}
	}

	_renderInputIcon() {
		const inputIcon = document.createElement('span')
		this._container.appendChild(inputIcon)
	}

	_renderInput() {
		const input = document.createElement('input')
		if(this.variant === 'email') {
			input.setAttribute('type', 'email')
		} else if(this.variant === 'phone') {
			input.setAttribute('type', 'tel')
			input.setAttribute(
				'pattern', 
				'^\(?[1-9]{2}\)? ?(?:[2-8]|9[1-9])[0-9]{3}\-?[0-9]{4}$'
			) /* FIXME: Testar a validação */
		} else if(this.variant === 'password' && !this.visibility) {
			input.setAttribute('type', 'password')
		} else {
			input.setAttribute('type', 'text')
		}
		input.setAttribute('placeholder', this.placeholder)
		input.setAttribute('value', this.value)
		if(this.disable) {
			input.setAttribute('readonly', true)
		}
		input.addEventListener('input', this.handleOnChange, false);
		this._container.appendChild(input)
	}

	_renderButtonIcon({ initial = false }) {
		if(!initial) {
			this._container.removeChild(this._container.lastChild)
		}

		const iconButton = document.createElement('span')
		iconButton.className = [
			`${this.value ? 'active' : 'deactive'}`,
			`${this.visibility ? 'hide' : 'show'}`
		].join(' ')
		iconButton.onclick = this.variant === 'password'
			? this.toggleVisibility
			: this.variant === 'search' 
				? this.clearValue
				: () => {}
		this._container.appendChild(iconButton)
	}

	_renderMessage() {
		this._infoContainer.innerText = this.info
	}

	toggleVisibility() {
		this.visibility = !!!this.visibility
		this._render({})
	}

	handleOnChange(event) {
		this.value = event.target.value
		this._renderButtonIcon({})
	}

	clearValue() {
		this.value = ''
		this._render({})
	}
}

customElements.define('lens-input', Input)