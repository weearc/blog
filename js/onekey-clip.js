$(function() {
    // ref: https://github.com/zenorocha/codecopy/blob/master/src/scripts/main.js
    var snippets = document.querySelectorAll('figure.highlight');
    var htmlCopyButton = `
    <button class="codecopy-btn tooltipped tooltipped-sw" aria-label="Copy to clipboard">
<!--      <i class="far fa-clipboard" aria-hidden="true"></i>-->
      <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="clipboard" class="svg-inline--fa fa-clipboard fa-w-12" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="currentColor" d="M336 64h-80c0-35.3-28.7-64-64-64s-64 28.7-64 64H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48zM192 40c13.3 0 24 10.7 24 24s-10.7 24-24 24-24-10.7-24-24 10.7-24 24-24zm144 418c0 3.3-2.7 6-6 6H54c-3.3 0-6-2.7-6-6V118c0-3.3 2.7-6 6-6h42v36c0 6.6 5.4 12 12 12h168c6.6 0 12-5.4 12-12v-36h42c3.3 0 6 2.7 6 6z"></path></svg>
    </button>`;

    snippets.forEach(snippet => {
        var parent = snippet.parentNode;
        var wrapper = document.createElement('div');

        parent.replaceChild(wrapper, snippet);
        wrapper.appendChild(snippet);

        wrapper.classList.add('code-highlight');
        wrapper.firstChild.insertAdjacentHTML('beforebegin', htmlCopyButton);

        var lang = (snippet.classList[1] || 'code').toUpperCase();
        wrapper.setAttribute('data-lang', lang);
    });

    // Add copy to clipboard functionality and user feedback
    var clipboard = new ClipboardJS('.codecopy-btn', {
        target: function(trigger) {
            var copytext = trigger.nextSibling.querySelector('.code');
            return copytext;
        }
    });

    clipboard.on('success', e => {
        e.trigger.setAttribute('aria-label', 'Copied!');
        e.clearSelection();
    });

    // Replace tooltip message when mouse leaves button
    // and prevent page refresh after click button
    var btns = document.querySelectorAll('.codecopy-btn');

    btns.forEach(btn => {
        btn.addEventListener('mouseleave', e => {
            e.target.setAttribute('aria-label', 'Copy to clipboard');
            e.target.blur();
        });

        btn.addEventListener('click', e => {
            e.preventDefault();
        });
    });
});
