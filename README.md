# marijuana-verify ![WeedLeaf](http://i.imgur.com/s7Bu0yy.gif)
A simple npm module that checks to see whether or not a medical marijuana patient's recommendation ID is valid or not. As I continue to build this, I will be adding more and more recommendation ID providers to the list, for now you can find the list of providers we support below. If there is a provider you want me to build into this, please drop me an email at joshterrill.dev@gmail.com

### Install
`npm install marijuana-verify`

### Usage
```
var api = require("marijuana-verify");
var verify = api.greenLife("0000000000");
if (verify) {
    // do something
}
```

## Providers
* GreenLife Medical
* Patient ID Center

## Disclaimer note
This API is not officially supported by any of these providers.

## License
ISC