import IntlMessageFormat from 'intl-messageformat'


export const notesDeletedMessage = new IntlMessageFormat(
  `{notesCount, plural, =1 {Note moved to trash} other {Notes moved to trash (#)}}`, 'en-US'
)

export const notesRestoredMessage = new IntlMessageFormat(
  `{notesCount, plural, =1 {Note restored} other {Notes restored (#)}}`, 'en-US'
)
