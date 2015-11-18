describe('the GET Helper', function() {
  it('makes a GET request with the correct paramaters', function() {
	jest.dontMock('../../app/restHelper.js');
    let $ = require('jquery');
    let restHelper = require('../../app/restHelper.js');
    let testURL = 'api/test';

    restHelper.get(testURL,x=>x);

    // Verify everything works correctly
    expect($.ajax).toBeCalledWith({
		type: 'GET',
		dataType:'json',
		url: testURL,
		xhrFields: {
			withCredentials: true
		},
		success: jasmine.any(Function),
		error: jasmine.any(Function)
    });
  });
});
