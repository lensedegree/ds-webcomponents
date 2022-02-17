import '../../components/ToggleButton'

export default {
	title: 'Base Components/Toggle Button',
	argTypes: {
		active: {
			control: { type: 'boolean' },
		}
	},
}

export const ToggleButton = ({ active }) => `
	<lens-toggle-button
		${active ? 'active' : ''}
	></lens-toggle-button>
`