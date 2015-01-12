function Fernet(key) {
    this.secret64 = key;
}

Fernet.prototype.b64decode = function(encoded) {
    encoded = encoded.replace(/-/g, '+').replace(/_/g, '/');
    return atob(encoded);
};

Fernet.prototype.decode = function(token64) {
    var secret = this.b64decode(this.secret64);
    var signingKey = secret.slice(0, 16);
    var encryptionKey = secret.slice(16);

    // Check version
    var token = this.b64decode(token64);
    if (token.charCodeAt(0) != 128)
        throw new Error("Invalid version: " + token.charCodeAt(0));

    var iv              = token.slice(9, 25);
    var ciphertext      = token.slice(25, token.length - 32);
    var hmac            = token.slice(token.length - 32);

    function words(s) {
        return CryptoJS.enc.Latin1.parse(s);
    }

    // Check HMAC
    var tokenSansHmac = token.slice(0, token.length - 32);
    var hash = CryptoJS.HmacSHA256(words(tokenSansHmac), words(signingKey)).toString(CryptoJS.enc.Latin1);
    if (hash != hmac)
        throw new Error("Invalid Token: HMAC");

    var encryptionKeyWords = words(encryptionKey);
    var ciphertextWords = words(ciphertext);
    var ivWords         = words(iv);
    var encrypted = {ciphertext: ciphertextWords};

    var decrypted = CryptoJS.AES.decrypt(encrypted, encryptionKeyWords, {iv: ivWords});
    return decrypted.toString(CryptoJS.enc.Utf8);
};