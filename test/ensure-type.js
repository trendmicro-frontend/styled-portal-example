import { ensureBoolean, ensureNumber, ensureString } from '../src/server/lib/ensure-type';

describe('ensure-type', () => {
  test('ensureBoolean', () => {
    expect(ensureBoolean({})).toEqual(true);
    expect(ensureBoolean(true)).toEqual(true);
    expect(ensureBoolean(false)).toEqual(false);
    expect(ensureBoolean(0)).toEqual(false);
    expect(ensureBoolean(1)).toEqual(true);
    expect(ensureBoolean(Infinity)).toEqual(true);
    expect(ensureBoolean(-Infinity)).toEqual(true);
    expect(ensureBoolean(NaN)).toEqual(false);
    expect(ensureBoolean(undefined)).toEqual(false);
    expect(ensureBoolean(null)).toEqual(false);
    expect(ensureBoolean('')).toEqual(false);
    expect(ensureBoolean(' ')).toEqual(true);
    expect(ensureBoolean('foo')).toEqual(true);
  });

  test('ensureNumber', () => {
    expect(Number.isNaN(ensureNumber({}))).toEqual(true);
    expect(ensureNumber(true)).toEqual(1);
    expect(ensureNumber(false)).toEqual(0);
    expect(ensureNumber(0)).toEqual(0);
    expect(ensureNumber(1)).toEqual(1);
    expect(ensureNumber(Infinity)).toEqual(Infinity);
    expect(ensureNumber(-Infinity)).toEqual(-Infinity);
    expect(Number.isNaN(ensureNumber(NaN))).toEqual(true);
    expect(ensureNumber(undefined)).toEqual(0);
    expect(ensureNumber(null)).toEqual(0);
    expect(ensureNumber('')).toEqual(0);
    expect(ensureNumber(' ')).toEqual(0);
    expect(Number.isNaN(ensureNumber('foo'))).toEqual(true);
  });

  test('ensureString', () => {
    expect(ensureString({})).toEqual(({}).toString());
    expect(ensureString(true)).toEqual('true');
    expect(ensureString(false)).toEqual('false');
    expect(ensureString(0)).toEqual('0');
    expect(ensureString(1)).toEqual('1');
    expect(ensureString(Infinity)).toEqual('Infinity');
    expect(ensureString(-Infinity)).toEqual('-Infinity');
    expect(ensureString(NaN)).toEqual('NaN');
    expect(ensureString(undefined)).toEqual('');
    expect(ensureString(null)).toEqual('');
    expect(ensureString('')).toEqual('');
    expect(ensureString(' ')).toEqual(' ');
    expect(ensureString('foo')).toEqual('foo');
  });
});
