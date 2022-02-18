import defaultAvatar from '../../assets/avatar-default.jpg'

class Avatar extends HTMLElement {
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
		linkDSCSS.setAttribute('href', 'https://unpkg.com/@overlens/ds-css/src/components/Avatar/index.css')
		this._root.appendChild(linkDSCSS)
	}

	connectedCallback() {
		if(!this.src) {
			this.src = this.getAttribute('src') ?? defaultAvatar
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

		if(!this.notify) {
			this.notify = Number(this.getAttribute('notify')) ?? 0
		}

		if(!this.state) {
			switch (this.getAttribute('state')) {
				case 'online':
					this.state = 'online'
					break
				case 'offline':
					this.state = 'offline'
					break
				default:
					this.state = 'hidden'
					break
			}
		}

		if(!this.action) {
			switch (this.getAttribute('action')) {
				case 'add':
					this.action = 'add'
					break
				case 'edit':
					this.action = 'edit'
					break
				case 'delete':
					this.action = 'delete'
					break
				default:
					this.action = 'hidden'
					break
			}
		}
		
		this._container.className = [
			'avatar-container',
			`size--${this.size}`
		].join(' ')

		this._render({ initial: true })
	}

	_render({ initial = false }) {
		if (!initial) {
			this._root.removeChild(this._container)
			this._container.innerHTML = ``
		}

		const avatar = this._createAvatar()
		this._container.appendChild(avatar)

		if(this.notify > 0) {
			const notification = this._createNotifications()
			this._container.appendChild(notification)
		}

		if(this.state !== 'hidden') {
			const state = this._createState()
			this._container.appendChild(state)
		}

		if(this.action !== 'hidden') {
			const action = this._createActions()
			this._container.appendChild(action)
		}

		this._root.appendChild(this._container)
	}

	_createAvatar() {
		let avatar = document.createElement('div')
		avatar.className = [
			'avatar'
		].join(' ')

		let img = document.createElement('img')
		img.setAttribute('src', this.src)

		avatar.appendChild(img)

		return avatar
	}

	_createNotifications() {
		let notification = document.createElement('div')
		notification.className = [
			'state--notify'
		].join(' ')
		if(this.notify > 99) {
			notification.innerHTML = `+99`
		} else {
			notification.innerHTML = `${this.notify}`
		}

		return notification
	}

	_createState() {
		let state = document.createElement('div')
		state.className = [
			`state--${this.state}`
		].join(' ')

		return state
	}

	_createActions() {
		let action = document.createElement('div')
		action.className = [
			`action--${this.action}`
		].join(' ')

		let icon = document.createElement('span')
		action.appendChild(icon)

		return action
	}
}

customElements.define('lens-avatar', Avatar)