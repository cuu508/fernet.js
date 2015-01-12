# minifernet.js

A minimal Javascript implementation of <a href="https://github.com/kr/fernet-spec">Fernet symmetric encryption</a>.

Fernet is an opinionated way of using AES and HMAC authentication that makes
shared-secret symmetric encryption simpler for communicating applications.

This version is for use in browser, and only does decryption. The API mimics
Fernet API in <a href="https://cryptography.io/en/latest/fernet/">cryptograpy.io</a>

It uses a custom rollup of CryptoJS, which includes the following modules:
core, enc-base64, cipher-core, aes, sha256, hmac

Example:

```
    var key = "0hps_met_fKHALAXIOzF0NdaGSngg-M-TTO6UFE35Ig=";
    var token = "gAAAAABUsKZo5DHqb3l-jGSrPV-B2r3-QHmrE0d_q2av32KQZkmcr_7FZ7ojPRm5MESehAPcqettOPVlOKjbnkgNsozcrBzoqTij8uii5ZTZNX28ismn-FY=";
    var fernet = new Fernet(key);
    var decoded = fernet.decode(token);
```
