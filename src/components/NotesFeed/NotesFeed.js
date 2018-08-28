import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import style from './NotesFeed.module.scss'
import { Note } from '..'


const notesData = [
  {
    title: 'Todo List',
    content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nostrum nemo, et reprehenderit omnis quis beatae quia ratione fuga magnam dolorem?'
  },
  {
    title: 'Another title',
    content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil illo necessitatibus id nisi eum maxime numquam consequatur laborum at, nostrum, labore tempore corporis similique, animi.'
  },
  {
    title: 'Kill my wife',
    content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ullam, quos.'
  },
  {
    title: 'Feed fucking cat',
    content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quas facere amet quae quod beatae, dicta id voluptas vel sint, ut dolorem vitae quidem nisi, inventore! Repudiandae nesciunt, eum repellat illo fugiat ullam quod, in atque officia vitae. Atque, voluptas, minima.'
  },
  {
    title: 'Todo List',
    content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nostrum nemo, et reprehenderit omnis quis beatae quia ratione fuga magnam dolorem?'
  },
  {
    title: 'Another title',
    content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil illo necessitatibus id nisi eum maxime numquam consequatur laborum at, nostrum, labore tempore corporis similique, animi.'
  },
  {
    title: 'Todo List',
    content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nostrum nemo, et reprehenderit omnis quis beatae quia ratione fuga magnam dolorem?'
  },
  {
    title: 'Another title',
    content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil illo necessitatibus id nisi eum maxime numquam consequatur laborum at, nostrum, labore tempore corporis similique, animi.'
  },
  {
    title: 'Kill my wife',
    content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ullam, quos.'
  },
  {
    title: 'Feed fucking cat',
    content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quas facere amet quae quod beatae, dicta id voluptas vel sint, ut dolorem vitae quidem nisi, inventore! Repudiandae nesciunt, eum repellat illo fugiat ullam quod, in atque officia vitae. Atque, voluptas, minima.'
  },
]


let NotesFeed = class extends Component {
  state = {
    listView: false,
    columns: 4
  }

  static propTypes = {
    gridView: PropTypes.bool.isRequired
  }

  static defaultProps = {
    gridView: true
  }

  render() {
    const { gridView } = this.props
    let notes

    if (gridView) {
      notes = notesData.reduce((acc, note, i) => {
        const columnNum = i % this.state.columns
        return {
          ...acc,
          [columnNum]: acc[columnNum] ? [ ...acc[columnNum], note ] : [ note ]
        }
      }, {})
    } else {
      notes = notesData
    }

    return (
      <div className={style.notesFeed}>
        {gridView ?
          <div className="columns">
            {Object.keys(notes).map((key, i) => (
              <div key={i} className="column">
                {notes[key].map((note, i) => (
                  <div key={i} className={style.note}>
                    <Note {...note} />
                  </div>
                ))}
              </div>
            ))}
          </div> :
          <div className={style.list}>
            {notes.map((note, i) => (
              <div key={i} className={style.note}>
                <Note {...note} />
              </div>
            ))}
          </div>}
      </div>
    )
  }
}


const mapStateToProps = state => ({ gridView: state.feedViewIsGrid })

NotesFeed = connect(mapStateToProps)(NotesFeed)

export { NotesFeed }
