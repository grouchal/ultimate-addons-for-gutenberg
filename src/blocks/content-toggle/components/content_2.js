const {
	RichText,
} = wp.editor

const {
	createBlock
} = wp.blocks

const { __ } = wp.i18n

class content_2 extends React.Component {

	render() {

		//const { attributes, setAttributes , props } = this.props;
		const {
			attributes,
			setAttributes ,
			props
		} = this.props

		if( setAttributes !== "not_set" ){
			return (
				<RichText
	                tagName= "div"
	                value={ attributes.headingDesc_2 }
	                className = 'uagb-ctgl__content-2 uagb-ctgl__section-2'
	                onChange = { ( value ) => setAttributes( { headingDesc_2: value } ) }
	                multiline={ false }
	                placeholder={ __( "Write a Heading" ) }
	                onMerge = { props.mergeBlocks }
	                unstableOnSplit = {
						props.insertBlocksAfter ?
							( before, after, ...blocks ) => {
								setAttributes( { content: before } )
								props.insertBlocksAfter( [
									...blocks,
									createBlock( "core/paragraph", { content: after } ),
								] )
							} :
							undefined
					}
					onRemove={ () => props.onReplace( [] ) }
	            />
			)
		}else{
			return (
				<RichText.Content
	                tagName= "div"
	                value={ attributes.headingDesc_2 }
	                className='uagb-ctgl__content-2 uagb-ctgl__section-2'
	            />
			)
		}
	}
}

export default content_2
