import React from 'react';
import './css/styles.css'
import ImageFilter from 'react-image-filter';

class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'points',
      completed: false,
      isSingle: true,
      revealHint: false
    };
  }

  clickHandler(event) {
    if (!this.state.completed) {
      if (this.state.view === 'points') {
        this.setState({
          view: 'question', 
          flipping: true,
          revealHint: false
        });
      } else if (this.state.view === 'question') {
        this.setState({
          view: 'answer',
          revealHint: false
        });
      } else {
        this.setState({
          view: 'points', 
          completed: true, 
          flipping: true,
          revealHint: false,
        });
      }
    }
    return;
  }

  componentDidUpdate(){
    if(this.state.isSingle !== this.props.isSingleJeopardy){
      this.setState({
        view: 'points',
        completed: false,
        isSingle: this.props.isSingleJeopardy,
      })
    }
  }

  getLabelBack() {
    const style = { color: 'black', fontSize: 12}
    let question = <div>{this.props.question.question}</div> 
    if(this.props.question.question){
      let hint = this.props.question.hint ? "Hint" : ""
      question = this.props.question.question.split("\n").map((question, index) => {
      return <div key={index}>{question}<p style={style}>{hint}</p></div>
      })
    }
    if(this.props.question.image){
      question = <div><ImageFilter image={this.props.question.image} filter={'grayscale'}/></div>
    }
    if(this.state.revealHint && this.props.question.question){
      let currQuestion = question
      question = <div>{currQuestion}<p style={{color:"black"}}>{this.props.question.hint}</p></div>
    } else if (this.state.revealHint && this.props.question.image){
      question = <div><img src={this.props.question.image}/></div>
    }
    

      return this.state.view === 'question'
        ? question
        : <div>{this.props.question.answer}</div>
  }

  transitionEndHandler(event) {
    if (event.propertyName === 'width') {
      this.setState({flipping: false});
    }
  }

  resetState(event) {
    this.setState({
      view: 'points',
      completed: false,
      flipping: true
    })
  }

  revealHint = (event) =>{
    if(event.code === 'Enter' && !this.state.revealHint){
      this.setState({
        revealHint: true
      })
    }
  }

  render() {
    window.addEventListener('keypress', this.revealHint.bind(this));

    let frontText = this.props.header ? <span className='headers'>{this.props.question}</span> : <span className='points'>{this.props.question.points}</span>
    let style = {
        width: this.props.width + 'px',
        height: this.props.height + 'px',
        transform: 'translate3d(' + this.props.left + 'px,' + this.props.top + 'px,0)',
        WebkitTransform: 'translate3d(' + this.props.left + 'px,' + this.props.top + 'px,0)'
      },
      front = this.state.completed
        ? <div/>
        : frontText,
      className = 'flipper';

    if (this.state.view !== 'points') {
      className = className + ' flipped';
    }
    if (this.state.flipping) {
      className = className + ' flipping';
    }

    return (
      <div
        style={style}
        className={className + ' ' + this.props.className}
        onClick={this.clickHandler.bind(this)}
        onTransitionEnd={this.transitionEndHandler.bind(this)}
      >
        <div className='card'>
          <div className='front'>
            {front}
          </div>
          <div className='back'>
            {this.getLabelBack()}
          </div>
        </div>
      </div>
    );
  }

};

export default Card;
