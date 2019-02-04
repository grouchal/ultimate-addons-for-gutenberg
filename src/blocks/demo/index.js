const {
	Button,
	Popover
} = wp.components

const {
	withState
} = wp.compose


const MyPopover = withState( {
	isVisible: false,
} )( ( { isVisible, setState } ) => {
	const toggleVisible = () => {
		setState( ( state ) => ( { isVisible: ! state.isVisible } ) );
	};
	return (
		<Button isDefault onClick={ toggleVisible }>
			Toggle Popover!
			{ isVisible && (
				<Popover>
					Popover is toggled!
				</Popover>
			) }
		</Button>
	);
} );
