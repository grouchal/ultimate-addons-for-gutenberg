const {
	RichText,
} = wp.editor

const {
	createBlock
} = wp.blocks

const { __ } = wp.i18n

class Content_1 extends React.Component {

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
	                value={ attributes.headingDesc_1 }
	                className = 'uagb-ctgl__content-1 uagb-ctgl__section-1'
	                onChange = { ( value ) => setAttributes( { headingDesc_1: value } ) }
	                multiline={ false }
	                placeholder={ __( "Content 1" ) }
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
	                value={ attributes.headingDesc_1 }
	                className='uagb-ctgl__content-1 uagb-ctgl__section-1'
	            />
			)
		}
	}
}

export default Content_1
