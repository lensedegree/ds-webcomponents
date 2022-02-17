import '../../components/RadioButton'

export default {
	title: 'Base Components/Input',
	argTypes: {
		alignment: {
			options: ['vertical', 'horizontal'],
			control: { type: 'radio' },
		},
		size: {
			options: ['small', 'medium'],
			control: { type: 'radio' },
		}
	},
}

export const RadioButton = ({ alignment, size }) => `
	<lens-radio-button
		alignment="${alignment}"
		size="${size}"
		name="lens-radio-button"
	>
		<option value="css">CSS</option>
		<option value="web-components" checked>Web Components</option>
		<option value="react">React</option>
	</lens-radio-button>
`