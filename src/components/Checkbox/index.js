class Checkbox extends HTMLElement {
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
		linkDSCSS.setAttribute('href', 'https://unpkg.com/@overlens/ds-css/src/components/Checkbox/index.css')
		this._root.appendChild(linkDSCSS)
	}

	connectedCallback() {
		if(!this.variant) {
			switch (this.getAttribute('variant')) {
				case 'rounded':
					this.variant = 'rounded'
					break
				default:
					this.variant = 'basic'
					break
			}
		}

		if(!this.alignment) {
			switch (this.getAttribute('alignment')) {
				case 'horizontal':
					this.alignment = 'horizontal'
					break
				default:
					this.alignment = 'vertical'
					break
			}
		}

		if(!this.size) {
			switch (this.getAttribute('size')) {
				case 'small':
					this.size = 'small'
					break
				default:
					this.size = 'medium'
					break
			}
		}

		if(!this.options) {
			const textData = this.getAttribute('options')
			this.options = JSON.parse(textData)
		}

		this._container.className = [
			'checkbox',
			`alignment--${this.alignment}`,
			`size--${this.size}`,
			`variant--${this.variant}`,
		].join(' ')
		
		this._render()
	}

	_render() {
		this._createOptions()
		this._root.appendChild(this._container)
	}

	_createOptions() {
		for(let child of this.children) {
			const optionContainer = document.createElement('span')

			const optionInput = document.createElement('input')
			optionInput.setAttribute('type', 'checkbox')
			optionInput.setAttribute('name', child.innerText.replace(' ', '_').toLowerCase())
			if(
				child.getAttribute('checked') === '' 
				|| child.getAttribute('checked') === 'true'
			) {
				optionInput.setAttribute('checked', true)
			}
			optionContainer.appendChild(optionInput)

			const labelInput = document.createElement('label')
			labelInput.setAttribute('for', child.innerText.replace(' ', '_').toLowerCase())
			labelInput.innerHTML = `${child.innerText}`
			optionContainer.appendChild(labelInput)
			
			this._container.appendChild(optionContainer)
		}
	}
}

customElements.define('lens-checkbox', Checkbox)