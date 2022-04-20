import '../../components/IconShape'

export default {
	title: 'Base Components/Icon',
	argTypes: {
		shape: {
			options: ['square', 'circle'],
			control: { type: 'radio' },
		},
		size: {
			options: ['small', 'medium'],
			control: { type: 'radio' },
		},
		variant: {
			options: ['outlined', 'filled'],
			control: { type: 'radio' },
		},
	},
}

export const IconShape = ({ shape, size, variant }) => `
	<lens-icon-shape
		shape="${shape}"
		size="${size}"
		variant="${variant}"
	>
		<span class="material-icons-outlined md-20">
			file_download
			<style>
				.material-icons-outlined.md-20 {
					font-size: 20px;
				}
			</style>
		</span>
	</lens-icon-shape>
`