import React, {PureComponent} from 'react';
import PropType from 'prop-types'

// try to figure out how to effectively optimize this later
// the component depends on props.last which cause every coordinate rerender
// because every click will change props.last
// at this time the performance is still good tho
export default class CustomStone extends PureComponent {
  render() {
    const lastMove = this.props.coor[0] === this.props.last[0] && this.props.coor[1] === this.props.last[1]
    return (
      <div
      className="coordinate"
      key={this.props.coor}
      onClick={() => this.props.game === 0 ? this.props.onRemove(this.props.coor, this.props.size) : this.props.onMove(this.props.coor, this.props.size)}
      >
{this.props.value === '+' ? '+' : <img src={lastMove ? `./${this.props.color}-last.png` : `./${this.props.color}.png` } alt={this.props.color}/>}
      </div>
    )
  }
}

CustomStone.propType = {
  onMove: PropType.func,
  onWhite: PropType.func,
  evaluateGame: PropType.func,
  points: PropType.object,
  turns: PropType.string,
  id: PropType.string,
  evaluated: PropType.bool,
  game: PropType.number
}

// {this.props.value === '+' ? '+' : <img src={lastMove ? `./${this.props.color}-last.png` : `./${this.props.color}.png` } alt={this.props.color}/>}
