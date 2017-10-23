const crypto=require('crypto');  
module.exports = {
    //密码盐
    AES_common: "123abc@bocai菠菜DBDa",
    AES_plus:function(value){
        const cipher = crypto.createCipher('aes192', this.AES_common);
        var crypted = cipher.update(value, 'utf8', 'hex');
        crypted += cipher.final('hex');
        return crypted;
    },
    AES_solution:function(value){
        const decipher = crypto.createDecipher('aes192', this.AES_common);
        var decrypted = decipher.update(value, 'hex', 'utf8');
        decrypted += decipher.final('utf8');
        return decrypted;
    }
}