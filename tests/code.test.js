global.window = { location: { origin: 'http://localhost' } };
const { sanitizeColor } = require('../public/js/code.js');

test('trims color whitespace', () => {
    expect(sanitizeColor('   aqua  magreen     ')).toBe('aqua  magreen');
});
