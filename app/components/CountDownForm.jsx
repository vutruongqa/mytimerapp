var React = require('react');
var Clock = require('Clock');
var Control = require('Control');

var CountDownForm = React.createClass({
    onFormSubmit: function(e){
        e.preventDefault();
        var strSeconds = this.refs.seconds.value;
        if( strSeconds.match(/^[0-9]*$/) && strSeconds.length > 0){
            this.refs.seconds.value="";
            this.props.onSetCountDown(parseInt(strSeconds, 10));
        }
    },
    render: function(){
        return(
            <div>
                <form onSubmit={this.onFormSubmit} ref="form" className="countdown-form">
                    <input type="text" ref="seconds" placeholder="Enter time in seconds"/>
                    <button className="button expanded">
                        Start
                    </button>
                </form>
            </div>
        
        );
    }
});

module.exports = CountDownForm;