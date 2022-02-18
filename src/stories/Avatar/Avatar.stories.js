import '../../components/Avatar'
import imageFile from '../../../.storybook/assets/Ilhama-bgyellow.png'

export default {
	title: 'Base Components/Avatar',
	argTypes: {
		size: {
			options: ['large', 'medium', 'small'],
			control: { type: 'radio' },
		},
		notify: {
			control: { type: 'number' },
		},
		state: {
			options: ['online', 'offline', 'hidden'],
			control: { type: 'select' },
		},
		action: {
			options: ['hidden', 'add', 'edit', 'delete'],
			control: { type: 'select' },
		}
	},
}

export const Basic = ({ size, notify, state, action }) => `
	<lens-avatar
		size="${size}"
		src="${imageFile}"
		notify="${notify}"
		state="${state}"
		action="${action}"
	></lens-avatar>
`