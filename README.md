# marijuana-verify ![WeedLeaf](http://i.imgur.com/s7Bu0yy.gif)
A simple node.js module that checks to see whether or not a medical marijuana patient's recommendation ID is valid or not. As I continue to build this, I will be adding more and more recommendation ID providers to the list, for now you can find the list of providers we support below. If there is a provider you want me to build into this, please drop me an email at joshterrill.dev@gmail.com

*Here is a server built in Rust that accomplishes the same thing: https://github.com/joshterrill/marijuana-verification*

### Install
`npm install marijuana-verify`

### Usage
Each provider method will work in both a traditional asynchronous callback
pattern as well as a Promise based pattern.  

```javascript
const verify = require('marijuana-verify');

try {
    const greenlife = await verify.greenlife('xxxxxxxxxxxx');
    console.log(greenlife); // prints out card details
} catch (error) {
    // some error handling
}
```

### Running tests

```
npm test
```

## Providers
### GreenLife Medical
Method: `verify.greenlife`  

Additional card details:  
* issued: Issue date in YYYY-MM-DD format
* expires: Expiration date in YYYY-MM-DD format
* doctor: Name of issuing doctor
* initials: Patient's initials

## Disclaimer note
This API is not officially supported by any of these providers.

## License
MIT
