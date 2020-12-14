import React from 'react';
import { connect } from 'react-redux';
import Card from './Card';
import Grid from "@material-ui/core/Grid";
import './css/styles.css'

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight - 100,
      cards: [],
      showFinal: false,
      showSingle: true,
    };
  }

  createCards = (questions, isSingleJeopardy) => {
    let rows = 0;
    questions.forEach(category => {
      if (category.questions.length > rows) {
        rows = category.questions.length;
      }
    });
    this.setState({
      ...this.state,
      cards: questions,
      rows: rows,
      cols: questions.length,
      showSingle: isSingleJeopardy,
    })
  }

  componentDidMount() {
    const finalJeopardy = this.props.finalJeopardy;
    this.createCards(this.props.singleJeopardy, true)

    this.setState({
      finalJeopardy: finalJeopardy
    });
  }

  handleFinal(event) {
    if(event.code === 'KeyS'){
      this.createCards(this.props.singleJeopardy, true)
    }
    if(event.code === 'KeyD'){
      this.createCards(this.props.doubleJeopardy, false)
    }
    if(event.code === 'KeyF'){
      this.setState({ 
        showSingle: false,
        showDouble: false,
        showFinal: true
       });
    }
  }

  render() {
    window.addEventListener('keypress', this.handleFinal.bind(this));
    let headerHeight = this.state.windowWidth > 640 ? 150 : 40
    let cardWidth = this.state.windowWidth / this.state.cols
    let cardHeight = (this.state.windowHeight - headerHeight) / this.state.rows

    let columns = []
    this.state.cards.forEach((category, categoryIndex) => {
      let cards = []
      let left = categoryIndex * cardWidth;
      category.questions.forEach((question, questionIndex) => {
        console.log(question)
        if(questionIndex === 0){
          cards.push(
            <Card
              key={categoryIndex + '-' + questionIndex + "header"}
              left={left}
              top={questionIndex * cardHeight}
              height={cardHeight}
              width={cardWidth}
              header={true}
              question={category.category}
              isSingleJeopardy={this.state.showSingle}
            />
          );
        }
          cards.push(
            <Card
              key={categoryIndex + '-' + questionIndex}
              left={left}
              top={(questionIndex + 1)* cardHeight}
              height={cardHeight}
              width={cardWidth}
              header={false}
              question={question}
              isSingleJeopardy={this.state.showSingle}
            />
          );
      })
      columns.push(<Grid key={columns.length}>{cards}</Grid>)
    });

    let showFinal = this.state.showFinal ? <Card
          className="finalJeopardy"
          left={cardWidth}
          top={cardHeight + headerHeight}
          height={cardHeight}
          width={cardWidth}
          question={this.state.finalJeopardy.questions[0]}
        />
        : columns

    return (
      <div>
        <div className="cardContainer">
        {showFinal}
        </div>
      </div>
    );
  }

};

const mapStateToProps = state => {
  return {
    finalJeopardy: state.finalJeopardy,
    singleJeopardy: state.singleJeopardy,
    doubleJeopardy: state.doubleJeopardy
  };
};


const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(Board);
