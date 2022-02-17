import '../../components/Checkbox'

export default {
	title: 'Base components/Input',
	argTypes: {
		variant: {
			options: ['basic', 'rounded'],
			control: { type: 'radio' },
		},
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

export const Checkbox = ({ variant, alignment, size }) => `
	<lens-checkbox
		variant='${variant}'
		alignment='${alignment}'
		size='${size}'
	>
		<option>Option 1</option>
		<option checked>Option 2</option>
		<option>Option 3</option>
	</checkbox>
`