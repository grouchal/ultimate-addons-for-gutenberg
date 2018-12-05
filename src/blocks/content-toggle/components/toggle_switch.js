import classnames from "classnames"
const { __ } = wp.i18n
class ToggleSwitch extends React.Component {

	constructor(props) {
	    super(props);	    
	    if(props.attributes.defualtDisplay == 'content_2'){
		    this.state = {
		      isChecked: true,
		    };
		}else{
			 this.state = {
		      isChecked: false,
		    };
		}		
		this.toggleSwitch = this.toggleSwitch.bind( this )
	}

	toggleSwitch(){		
		this.setState({
	      isChecked: !this.state.isChecked,
	    });	
	}

	render() {

		const {
			attributes,
			setAttributes,
			props,			
		} = this.props

		var switch_class = attributes.swichType.replace("_", "-")

		var switch_html = '';

		var input_html = <input type="checkbox" className={ classnames( "uagb-ctgl__switch",`uagb-ctgl__switch-${switch_class}` ) }/>
		
		/*var is_checked = false;
		if( attributes.defualtDisplay == 'off' ){
			 is_checked = true;
		}*/

		if( setAttributes !== "not_set" ){
			setAttributes( { is_checked: this.state.isChecked} )
		}

		switch(attributes.swichType ){
			case 'round_1':
					switch_html = <label className="uagb-ctgl__switch-label">
					            	<input type="checkbox" className={ classnames( "uagb-ctgl__switch",`uagb-ctgl__switch-${switch_class}` ) } 
					            	checked={this.state.isChecked}
					            	onChange={this.toggleSwitch}
					            	/>
					            	<span className="uagb-ctgl__slider uagb-ctgl__round"></span>
		            			</label>    
				break;

			case 'round_2':
					switch_html = <div className="uagb-ctgl_toggle_switch">
								<input type="checkbox" className={ classnames( `uagb-ctgl__switch-${switch_class}` ) } name="group1" id="toggle_491dd59"
									checked={this.state.isChecked}
					            	onChange={this.toggleSwitch}
								/>
								<label className="uagb-ctgl__toggle_round_2" htmlFor="toggle_491dd59"></label>
							</div>
				break;

			case 'rectangle':
					switch_html = <label className="uagb-ctgl__switch-label">
					            	{input_html}
					            	<span className="uagb-ctgl__slider"></span>
					            </label>
				break;

			case 'label_box':
					switch_html = <div className="uagb-ctgl__switch-label">
						{input_html}
							<label className="uagb-ctgl__label-box-label" >
								<span className="uagb-ctgl__label-box-inner">
									<span className="uagb-ctgl__label-box-inactive">
										<span className="uagb-ctgl__label-box-switch">__( ON )</span>
									</span>
									<span className="uagb-ctgl__label-box-active">
										<span className="uagb-ctgl__label-box-switch">__( OFF )</span>
									</span>
								</span>
							</label>
						</div>

				break;

			case 'default' :
				break;
		}

		return (
			<div className="uagb-ctgl__main-btn" data-switch-type={attributes.swichType}>
            	{ switch_html }
		    </div>
		)
		
	}
}

export default ToggleSwitch
