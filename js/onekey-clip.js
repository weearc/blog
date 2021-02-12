$(function() {
    // ref: https://github.com/zenorocha/codecopy/blob/master/src/scripts/main.js
    var snippets = document.querySelectorAll('figure.highlight');
    var htmlCopyButton = `
    <div id="codeblock-titlebar">
        <span id="lang-title" style="font-size: 5px"></span>
        <button class="codecopy-btn tooltipped tooltipped-sw" aria-label="Copy to clipboard">
            <span class="fa fa-copy" aria-hidden="true"></span>
            click to copy
        </button>
    </div>
    `;

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
            var copytext = trigger.nextSibling.parentElement.nextElementSibling.querySelector('.code');
            return copytext;
            // console.log(copytext);
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
