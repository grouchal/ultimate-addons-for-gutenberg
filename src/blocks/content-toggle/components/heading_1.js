const {
	RichText,
} = wp.editor

const {
	createBlock
} = wp.blocks

const { __ } = wp.i18n

class Heading_1 extends React.Component {

	render() {

		const {
			attributes,
			setAttributes,
			props
		} = this.props
		
		if( setAttributes !== "not_set" ){
			return (
				<div className ="uagb-ctgl__sec-1">
					<RichText
		                tagName= { attributes.headingTag }
		                value={ attributes.headingTitle_1 }
		                className = 'uagb-ctgl__sec-heading-1'
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
		        </div>
			)
		}else{
			return (
				<div className ="uagb-ctgl__sec-1">
					<RichText.Content
		                tagName= { attributes.headingTag }
		                value={ attributes.headingTitle_1 }
		                className='uagb-ctgl__sec-heading-1'
		            />
		        </div>
			)
		}
	}
}

export default Heading_1
