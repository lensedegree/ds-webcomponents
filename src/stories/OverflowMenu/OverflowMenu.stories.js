import '../../components/OverflowMenu'

export default {
	title: 'Base components/Menu',
	argTypes: {
		active: {
			control: { type: 'boolean' },
		}
	}
}

export const Overflow = ({ active }) => `
	<lens-overflow-menu
		${active ? 'active' : ''}
	>
		<option>Opção 1</option>
		<a href="#"><option>Opção 2</option></a>
		<option>Opção 3</option>
	</lens-overflow-menu>
`