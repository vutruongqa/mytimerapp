var React = require('react');
var Clock = require('Clock');
var Control = require('Control');

var Timer = React.createClass({
    
    getInitialState:function(){
        return {
            count:0,
            countDownStatus: 'paused'
        };    
    },
    
    //Call after prop or state updated
    componentDidUpdate: function(prevProps, prevState){
      if(this.state.countDownStatus !== prevState.countDownStatus){
          switch(this.state.countDownStatus){
              case 'started': 
                  this.startTimer();
                  break;
              case 'stopped':
                  this.setState({
                     count:0,
                     countDownStatus:'paused'
                  });
              case 'paused':
                  clearInterval(this.timer);
                  //this.setState({
                     //count:0 
                  //});
                  //this.timer = undefined;
                  break;
         }
      }  
    },
    
    componentDidUnmount: function(){
        this.setState({
                     count:0,
                     countDownStatus:'paused'
                  });
    },
    
    startTimer: function(){
      this.timer = setInterval(()=>{
          var newCount= this.state.count + 1;
          this.setState({
             count: newCount
          });
          
      },1000);  
    },
    
    handleStatusChange: function(newStatus){
        this.setState({
            countDownStatus: newStatus
        });
    },
    
    render: function(){
        var {count, countDownStatus} = this.state;
        var renderControlArea = ()=>{
            if(countDownStatus!=='stopped'){
                return <Control countDownStatus={countDownStatus} onStatusChange={this.handleStatusChange}/>;
            }
        };
        return(
            <div>
                <h1 className="page-title">Timer App</h1>
                <Clock totalSeconds={count}/>
                <Control countDownStatus={countDownStatus} onStatusChange={this.handleStatusChange}/>;
                {renderControlArea}
            </div>
        );
    }
});

module.exports = Timer;