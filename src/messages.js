import IntlMessageFormat from 'intl-messageformat'


export const movedToTrashMessage = new IntlMessageFormat(
  `{notesCount, plural, =1 {Note moved to trash} other {Notes moved to trash (#)}}`, 'en-US'
)

export const trashClearedMessage = new IntlMessageFormat(
  `Trash was cleared ({notesCount, plural, =1 {# note} other {# notes}} deleted)`, 'en-US'
)
