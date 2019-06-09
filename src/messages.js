import IntlMessageFormat from 'intl-messageformat';


export const notesMovedToTrashMessage = new IntlMessageFormat(
  'Moved {notesCount, plural, =1 {note} other {# notes}} to trash', 'en-US'
);

export const notesDeletedMessage = new IntlMessageFormat(
  'Deleted {notesCount, plural, =1 {note} other {# notes}} forever', 'en-US'
);
