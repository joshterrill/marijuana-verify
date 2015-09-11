# marijuana-verify ![WeedLeaf](http://i.imgur.com/s7Bu0yy.gif)
A simple node.js module that checks to see whether or not a medical marijuana patient's recommendation ID is valid or not. As I continue to build this, I will be adding more and more recommendation ID providers to the list, for now you can find the list of providers we support below. If there is a provider you want me to build into this, please drop me an email at joshterrill.dev@gmail.com

### Install
`npm install marijuana-verify`

### Usage
Each provider method will work in both a traditional asynchronous callback
pattern as well as a Promise based pattern.  

```
var verify = require('marijuana-verify');

// Traditional asynchronous callback
verify.greenlife({recId: '000000000000000'}, function (err, card) {
  if (err) {

  }

  if (card.isValid) {

  } else {

  }
});

// Promise based pattern
verify
  .greenlife({recId: '000000000000000'})
  .then(function (card) {
    if (card.isValid) {

    } else {

    }
  }, function (err) {

  });

```

## Providers
### GreenLife Medical
Method: `verify.greenlife`  

Additional card details:  
* issued: Issue date in YYYY-MM-DD format
* expires: Expiration date in YYYY-MM-DD format
* doctor: Name of issuing doctor
* initials: Patient's initials

### Patient ID Center
Method: `verify.patientIdCenter`

## Disclaimer note
This API is not officially supported by any of these providers.

## License
ISC
