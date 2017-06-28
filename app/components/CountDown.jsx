var React = require('react');
var Clock = require('Clock');
var CountDownForm = require('CountDownForm');
var Control = require('Control');

var CountDown = React.createClass({
    getInitialState:function(){
        return {
            count:0,
            countDownStatus: 'stopped'
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
                     count:0 
                  });
              case 'paused':
                  clearInterval(this.timer);
                  this.timer = undefined;
                  break;
         }
      }  
    },
    
    componentWillUnmount:function(){
      clearInterval(this.timer);
      this.timer = undefined;
    },
    
    startTimer:function(){
      this.timer = setInterval(() =>{
          var newCount= this.state.count - 1;
          this.setState({
             count: newCount >= 0 ? newCount : 0 
          });
          
          if(newCount===0){
                this.setState({
                    countDownStatus:'stopped'
                });
          }
      },1000);  
        
        
    },
    
    handleSetCountDown: function(seconds){
        this.setState({
            count:seconds,
            countDownStatus: 'started'
        });
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
            }else{
                 return <CountDownForm onSetCountDown={this.handleSetCountDown} />;
            }
        };
        return(
            <div>
               <h1 className="page-title">CountDown App</h1>
                <Clock totalSeconds={count}/>
                {renderControlArea()}
            </div>
        
        );
    }
});

module.exports = CountDown;