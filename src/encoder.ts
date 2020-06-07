export const utf8Encode = (str: string): string => {
    const target = str.replace(/\r\n/g, '\n');
    let utfText = '';
    for (let n = 0; n < target.length; n++) {
        const c = target.charCodeAt(n);
        if (c < 128) {
            utfText += String.fromCharCode(c);
        } else if (c > 127 && c < 2048) {
            utfText += String.fromCharCode((c >> 6) | 192);
            utfText += String.fromCharCode((c & 63) | 128);
        } else {
            utfText += String.fromCharCode((c >> 12) | 224);
            utfText += String.fromCharCode(((c >> 6) & 63) | 128);
            utfText += String.fromCharCode((c & 63) | 128);
        }
    }
    return utfText;
};

export const base64Encode = (str: string): string => {
    let output = '';
    const keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
    let chr1, chr2, chr3, enc1, enc2, enc3, enc4;
    let i = 0;
    str = utf8Encode(str);
    while (i < str.length) {
        chr1 = str.charCodeAt(i++);
        chr2 = str.charCodeAt(i++);
        chr3 = str.charCodeAt(i++);
        enc1 = chr1 >> 2;
        enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
        enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
        enc4 = chr3 & 63;
        if (isNaN(chr2)) {
            enc3 = enc4 = 64;
        } else if (isNaN(chr3)) {
            enc4 = 64;
        }
        output = output + keyStr.charAt(enc1) + keyStr.charAt(enc2) + keyStr.charAt(enc3) + keyStr.charAt(enc4);
    }
    return output;
};

export const uriEncode = (str: string): string => {
    return (str ? encodeURI(str) : '') || '';
};
