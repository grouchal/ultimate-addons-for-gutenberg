const {
    RichText,
} = wp.editor;

const { __ } = wp.i18n;

const {
	createBlock
} = wp.blocks

class AuthorName extends React.Component {

	render() {

		const {
			attributes,
			setAttributes ,
			props
		} = this.props;

		if( setAttributes !== 'not_set' ){
			return (
				<RichText
	                tagName="span"
	                value={ attributes.prefixTitle }
	                className='uagb-testinomial-author-name'
	                onChange={ ( value ) => setAttributes( { prefixTitle: value } ) }
	                onMerge = { props.mergeBlocks }
	                onSplit = {
							props.insertBlocksAfter ?
								( before, after, ...blocks ) => {
									setAttributes( { content: before } );
									props.insertBlocksAfter( [
										...blocks,
										createBlock( 'core/paragraph', { content: after } ),
									] );
								} :
								undefined
						}
					onRemove={ () => props.onReplace( [] ) }
	            />
			)
		}else{
			return (
				<RichText.Content
	                tagName="span"
	                value={ attributes.prefixTitle }
	                className='uagb-testinomial-author-name'
	            />
			)
		}
	}
}

export default AuthorName
