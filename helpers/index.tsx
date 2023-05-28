export function caseInsensitiveIncludes(search: string, substr: string) {
    const strip = (str: string) => {
        [',', '"', "'", '.', '!', '?', ' '].forEach(char => str.replace(char, ''));
        return str.toUpperCase();
    };

    return strip(search).includes(strip(substr));
}

export function validateEmail(email: string) {
    return email.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
}

export function formatYoutubeDescription(plainText: string) {
    var replacedText, replacePattern;

    //URLs starting with http://, https://, or ftp://
    replacePattern = /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim;
    replacedText = plainText.replaceAll(replacePattern, '<a href="$1" target="_blank">$1</a>');

    //URLs starting with "www." (without // before it, or it'd re-link the ones done above).
    replacePattern = /(^|[^\/])(www\.[\S]+(\b|$))/gim;
    replacedText = replacedText.replaceAll(replacePattern, '$1<a href="http://$2" target="_blank">$2</a>');

    //Change email addresses to mailto:: links.
    replacePattern = /(([a-zA-Z0-9\-\_\.])+@[a-zA-Z\_]+?(\.[a-zA-Z]{2,6})+)/gim;
    replacedText = replacedText.replaceAll(replacePattern, '<a href="mailto:$1">$1</a>');

    replacedText = replacedText.replaceAll('►', '<br />');
    replacedText = replacedText.replaceAll('\n', '<br />');

    return replacedText;
}
