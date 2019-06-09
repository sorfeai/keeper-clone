import {
  getFormState,
  getForm,
  getFormValue,
  getFormErrors,
  getFieldErrors,
} from '..';


describe('form selectors', () => {
  describe('`getFormState`', () => {
    it('if form state was registered returns form state', () => {
      const state = { form: {} };
      const res = getFormState(state);

      expect(res).toEqual({});
    });

    it('if form state wasn\'t registered returns undefined', () => {
      const state = { notForm: {} };
      const res = getFormState(state);

      expect(res).toBeUndefined();
    });
  });

  describe('`getForm(formName)`', () => {
    it('if form state wasn\'t registered returns undefined', () => {
      const { resultFunc } = getForm('myForm');
      const res = resultFunc(undefined);
      expect(res).toEqual(undefined);
    });

    it('if given form was registered gets form object', () => {
      const formName = 'myForm';
      const { resultFunc } = getForm(formName);
      const form = { values: {} };
      const state = { [formName]: form };
      const res = resultFunc(state);

      expect(res).toEqual(form);
    });

    it('if given form wasn\'t registered returns undefined', () => {
      const formName = 'myForm';
      const { resultFunc } = getForm(formName);
      const state = {
        notMyForm: { values: {} },
      };
      const res = resultFunc(state);

      expect(res).toEqual(undefined);
    });
  });

  describe('`getFormValue(formName, fieldName)`', () => {
    it('if given form wasn\'t registered returns undefined', () => {
      const { resultFunc } = getFormValue('myForm', 'myVal');
      const res = resultFunc(undefined);

      expect(res).toBeUndefined();
    });

    it('if given field exists returns its value', () => {
      const { resultFunc } = getFormValue('myForm', 'myVal');
      const myVal = 'hello';
      const state = { values: { myVal } };
      const res = resultFunc(state);

      expect(res).toBe(myVal);
    });

    it('if given field doesn\'t exist returns undefined', () => {
      const { resultFunc } = getFormValue('myForm', 'myVal');
      const state = {
        values: { notMyVal: 'hello' },
      };
      const res = resultFunc(state);

      expect(res).toBe(undefined);
    });
  });

  describe('`getFormErrors(formName)`', () => {
    it('if given form wasn\'t registered returns undefined', () => {
      const { resultFunc } = getFormErrors('myForm');
      const res = resultFunc(undefined);

      expect(res).toBeUndefined();
    });

    it('if there is `syncErrors` object returns it', () => {
      const { resultFunc } = getFormErrors('myForm', 'myVal');
      const syncErrors = { myField: 'Required' };
      const res = resultFunc({ syncErrors });

      expect(res).toBe(syncErrors);
    });

    it('if there isn\'t `syncErrors` object returns undefined', () => {
      const { resultFunc } = getFormErrors('myForm', 'myVal');
      const res = resultFunc({});

      expect(res).toBe(undefined);
    });
  });

  describe.only('`getFieldErrors(formName, fieldName)`', () => {
    it('if there isn\'t `syncErrors` object returns undefined', () => {
      expect(
        getFieldErrors('myForm', 'email').resultFunc(undefined)
      ).toBeUndefined();
    });

    it('if `syncErrors` contains provided field returns it', () => {
      const error = 'Error!';
      const state = { email: error };

      expect(
        getFieldErrors('myForm', 'email').resultFunc(state)
      ).toBe(error);
    });

    it('if `syncErrors` doesn\'t contain provided field returns undefined', () => {
      expect(
        getFieldErrors('myForm', 'email').resultFunc({})
      ).toBeUndefined();
    });
  });
});
