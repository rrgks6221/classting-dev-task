import { transformPage } from 'src/common/transformers/page.transform';

describe(transformPage.name, () => {
  it('들어는 value 가 string number 일 경우', () => {
    const randomNumber = 1;
    const randomStringNumber = String(randomNumber);
    const transformValue = transformPage({ value: randomStringNumber });

    expect(typeof randomNumber).toBe('number');
    expect(typeof randomStringNumber).toBe('string');
    expect(transformValue).toBe(randomNumber - 1);
    expect(typeof transformValue).toBe('number');
  });

  it('들어온 value 가 string 일 경우', () => {
    const randomString = 'string';
    const randomStringNumber = Number(randomString);
    const transformValue = transformPage({ value: randomString });

    expect(randomStringNumber).toBeNaN();
    expect(typeof randomString).toBe('string');
    expect(transformValue).toBe(transformValue);
    expect(typeof transformValue).toBe('string');
  });
});
