import '../../components/Dropdown/'

export default {
	title: 'Base Components/Input',
	argTypes: {
		active: {
			control: { type: 'boolean' },
		}
	}
}

export const Dropdown = ({ active }) => `
	<lens-dropdown
		${active ? 'active' : ''}
	>
		<option>Option 1</option>
		<option>Option 2</option>
		<option>Option 3</option>
	</lens-dropdown>
`