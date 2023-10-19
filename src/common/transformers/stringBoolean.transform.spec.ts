import { transformStringBoolean } from 'src/common/transformers/stringBoolean.transform';

describe(transformStringBoolean.name, () => {
  it('들어온 value 가 string boolean 일 경우', () => {
    const boolean = true;
    const stringBoolean = String(boolean);
    const transformValue = transformStringBoolean({ value: stringBoolean });

    expect(typeof boolean).toBe('boolean');
    expect(typeof stringBoolean).toBe('string');
    expect(transformValue).toBe(boolean);
  });

  it('들어온 value 가 string boolean 이 아닐 경우 경우', () => {
    const randomString = 'string';
    const transformValue = transformStringBoolean({ value: randomString });

    expect(typeof randomString).toBe('string');
    expect(randomString).not.toBe('true');
    expect(randomString).not.toBe('false');
    expect(transformValue).toBe(randomString);
  });
});
