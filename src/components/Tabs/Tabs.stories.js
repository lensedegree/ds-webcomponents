import '../../components/Tabs'
import '../../components/Button'

export default {
	title: 'Base Components/Tabs',
	argTypes: {
		variant: {
			options: ['default', 'container'],
			control: { type: 'radio' },
		}
	}
}

export const Tabs = ({ variant }) => `
	<lens-tabs
		variant="${variant}"
	>
		<div title="Tab 01">
			<h1>Título</h1>
			<p>Parágrafo</p>
		</div>

		<div title="Tab 02" active>
			<lens-button 
				variant="primary" 
				size="large"
			>
				Button
			</lens-button>
		</div>
		
		<div title="Tab 03">
			<ul>
				<li>primeiro item</li>
				<li>segundo item</li>
				<li>terceiro item</li>
			</ul>
		</div>
	</lens-tabs>
`