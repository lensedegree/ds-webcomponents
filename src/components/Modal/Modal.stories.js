import '../../components/Modal'

export default {
	title: 'Base Components/Notification',
  argTypes: {
		variant: {
			options: ['alert', 'confirmation'],
			control: { type: 'radio' },
		},
		format: {
			options: ['mobile', 'desktop'],
			control: { type: 'radio' },
		},
  },
	decorators: [(story) => `
		<div>
			<script>
				function onClose() {
					console.log('Cancelado')
				}

				function onAccept() {
					console.log('Confirmado')			
				}
			</script>
			${story()}
		</div>
	`],
}

export const Modal = ({ variant, format }) => `
	<lens-modal
		variant="${variant}"
		format="${format}"
		info="Não será possível recuperar o arquivo depois que ele for deletado."
		onClose="onClose()"
		onAccept="onAccept()"
	>
		Você têm certeza que quer deletar esse arquivo?
	</lens-modal>
`