import keys from 'lodash/keys';
import isEqual from 'lodash/isEqual';
import converter from 'number-to-words';
import times from 'lodash/times';
import { fromJS, List } from 'immutable';


export const mockNote = (id) => {
  const wordId = typeof id !== 'string'
    ? converter.toWords(id)
    : id;

  return {
    id: id.toString(),
    title: `title ${wordId}`,
    content: `content ${wordId}`,
    tags: List(),
  };
};

export const mockNotesData  = (quantity) => {
  const arr = times(
    quantity,
    (id) => mockNote(id + 1)
  );

  return fromJS(arr);
};

export const filterEffectsByAction = (allEffects, effect, action) => {
  return allEffects.filter((eff) => (
    keys(eff).includes(effect) &&
    isEqual(eff[effect].action, action)
  ));
};
