class Dropdown extends HTMLElement {
	constructor() {
    super()

		if(!this.root) {
			this._root = this.attachShadow({ mode: 'open' })
			this._header()
		}

		if(!this._container) {
			this._container = document.createElement('div')
			this._container.onclick = this.toggleDropdown
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
		linkDSCSS.setAttribute('href', 'https://unpkg.com/@lensedegree/ds-css/src/components/Dropdown/index.css')
		this._root.appendChild(linkDSCSS)
	}

	connectedCallback() {
		if(!this.active) {
			switch (this.getAttribute('active')) {
				case 'active':
					this.active = 'active'
					break
				default:
					this.active = 'deactive'
					break
			}
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

		this._container.className = [
			'dropdown',
			`${this.active}`
		].join(' ')

		this._optionsContainer.className = [
			'dropdown-options',
			`${this.active}`
		].join(' ')

		this._createInput()
		this._createOptions()

		this._root.appendChild(this._container)
		this._root.appendChild(this._optionsContainer)
	}

	_createInput() {
		const dropdownInput = document.createElement('input')
		dropdownInput.setAttribute('type', 'text')
		dropdownInput.setAttribute('readonly', true)
		
		if(!!!this.selected) {
			dropdownInput.setAttribute('value', 'Select one option')
		} else {
			dropdownInput.setAttribute('value', this.selected.text)
		}

		this._container.appendChild(dropdownInput)

		const unselectIconInput = document.createElement('span')
		unselectIconInput.className = [
			`${this.selected ? 'selected' : 'unselected'}`
		].join(' ')
		unselectIconInput.onclick = (event) => {
			event.stopPropagation()
			this.unselectItem()
		}
		this._container.appendChild(unselectIconInput)

		const arrowIconInput = document.createElement('span')
		this._container.appendChild(arrowIconInput)
	}

	_createOptions() {
		for(let child of this.children) {
			const option = child.cloneNode(true)
			option.setAttribute('id', option.innerText.replace(' ', '_').toLowerCase())
			option.className = [
				`${this.selected && this.selected.id === option.id
					? 'selected' 
					: 'unselected'
				}`
			].join(' ')
			option.onclick = () => { this.selectItem(option) }

			if(this.selected && this.selected.id === option.id) {
				const selectIcon = document.createElement('span')
				option.appendChild(selectIcon)
			}

			this._optionsContainer.appendChild(option)
		}
	}

	toggleDropdown = () => {
		this.active = this.active === 'active' ? 'deactive' : 'active'
		this._render({})
	}

	selectItem = (item) => {
		this.selected = item
		this.active = 'deactive'
		this._render({})
	}

	unselectItem = () => {
		this.selected = null
		this._render({})
	}
}

customElements.define('lens-dropdown', Dropdown)