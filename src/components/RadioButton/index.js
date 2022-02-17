class RadioButton extends HTMLElement {
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
		linkDSCSS.setAttribute('href', 'https://unpkg.com/@lensedegree/ds-css/src/components/RadioButton/index.css')
		this._root.appendChild(linkDSCSS)
	}

	connectedCallback() {
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

		if(!this.name) {
			this.name = this.getAttribute('name') ?? 'default-lens-radio-button'
		}
		
		this._container.className = [
			'radio-button',
			`alignment--${this.alignment}`,
			`size--${this.size}`
		].join(' ')

		this._render()
	}

	_render() {
		this._renderOptions()

		this._root.appendChild(this._container)
	}

	_renderOptions() {
		for(let child of this.children) {
			if (child.tagName !== 'OPTION') {
				throw new Error('O elemento lens-radio-button só aceita elementos \'options\' como filho')
			}

			const optionContainer = document.createElement('span')

			const input = document.createElement('input')
			input.setAttribute('type', 'radio')
			input.setAttribute('name', this.name)
			input.setAttribute('value', child.getAttribute('value'))
			if(
				child.getAttribute('checked') === '' 
				|| child.getAttribute('checked') === 'true'
			) {
				input.setAttribute('checked', true)
			}
			optionContainer.appendChild(input)

			const label = document.createElement('label')
			label.setAttribute('for', child.getAttribute('value'))
			label.innerText = child.innerText
			optionContainer.appendChild(label)

			this._container.appendChild(optionContainer)
		}
	}
}

customElements.define('lens-radio-button', RadioButton)