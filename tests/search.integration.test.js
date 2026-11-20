global.window = { location: { origin: 'http://localhost' } };
require('../public/js/code.js');

test('adds a color, then finds it in search results', () => {
    const elements = {
        'color-text': { value: '  blorange  ' },
        'color-add-result': { innerHTML: 'old message' },
        'search-text': { value: 'blorange' },
        'color-search-result': { innerHTML: 'old message' },
        'color-list': { textContent: '' }
    };
    global.document = {
        getElementById: jest.fn((id) => elements[id])
    };

    const storedColors = [];
    const requests = [];
    global.XMLHttpRequest = jest.fn(function () {
        this.open = jest.fn((method, url) => {
            this.url = url;
            requests.push({ method, url });
        });
        this.setRequestHeader = jest.fn();
        this.send = jest.fn((payload) => {
            const request = JSON.parse(payload);
            let response;

            if (this.url.endsWith('/api/AddColor.php')) {
                storedColors.push(request.color);
                response = { error: '' };
            } else {
                response = {
                    results: storedColors.filter((color) =>
                        color.includes(request.search)
                    ),
                    error: ''
                };
            }

            this.responseText = JSON.stringify(response);
            this.readyState = 4;
            this.status = 200;
            this.onreadystatechange();
        });
    });

    window.addColor();
    window.searchColor();

    expect(storedColors).toEqual(['blorange']);
    expect(requests).toEqual([
        { method: 'POST', url: 'http://localhost/api/AddColor.php' },
        { method: 'POST', url: 'http://localhost/api/SearchColors.php' }
    ]);
    expect(elements['color-add-result'].innerHTML).toBe('Color has been added');
    expect(elements['color-list'].textContent).toBe('blorange');
});
