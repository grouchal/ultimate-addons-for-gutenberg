const {
	RichText,
} = wp.editor

const {
	createBlock
} = wp.blocks

const { __ } = wp.i18n

class heading_1 extends React.Component {

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
	                tagName= { attributes.headingTag }
	                value={ attributes.headingTitle_1 }
	                className = 'uagb-ctgl__sec-1'
	                onChange = { ( value ) => setAttributes( { headingTitle_1: value } ) }
	                multiline={ false }
	                placeholder={ __( "Heading1" ) }
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
	                tagName= { attributes.headingTag }
	                value={ attributes.headingTitle_1 }
	                className='uagb-ctgl__sec-1'
	            />
			)
		}
	}
}

export default heading_1
