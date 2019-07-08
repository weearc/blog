var hiddenProperty = 'hidden' in document ? 'hidden' : 'webkitHidden' in document ? 'webkitHidden' : 'mozHidden' in document ? 'mozHidden' : null;
var visibilityChangeEvent = hiddenProperty.replace(/hidden/i, 'visibilitychange');
document.addEventListener(visibilityChangeEvent,
    function() {
        if (!document[hiddenProperty]) {
            document.title = '你回来啦？';
        } else {
            document.title = 'T△T 不管我了么';
        }
    });