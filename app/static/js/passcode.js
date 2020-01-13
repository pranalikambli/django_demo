function submit_login(){
    var kname ={{kname}}
    var key = CryptoJS.enc.Utf8.parse(kname);
    var passtext = $("#password").val();
    var result = encrypt(passtext,key);
    $("#password").val(result);
<!--    alert(key);-->
<!--    alert(result);-->
    document.getElementById("login-form").submit();

}

function encrypt(msgString, key) {

    // msgString is expected to be Utf8 encoded
    var iv = CryptoJS.lib.WordArray.random(16);
    var encrypted = CryptoJS.AES.encrypt(msgString, key, {
        iv: iv
    });

    return iv.concat(encrypted.ciphertext).toString(CryptoJS.enc.Base64);
}

function decrypt(ciphertextStr, key) {
var key = CryptoJS.enc.Utf8.parse('1234567890123457');
    var ciphertext = CryptoJS.enc.Base64.parse(ciphertextStr);

    // split IV and ciphertext
    var iv = ciphertext.clone();
    iv.sigBytes = 16;
    iv.clamp();
    ciphertext.words.splice(0, 4); // delete 4 words = 16 bytes
    ciphertext.sigBytes -= 16;

    // decryption
    var decrypted = CryptoJS.AES.decrypt({ciphertext: ciphertext}, key, {
        iv: iv
    });
    return decrypted.toString(CryptoJS.enc.Utf8);
}
