# marijuana-verify ![WeedLeaf](http://i.imgur.com/s7Bu0yy.gif)
A simple npm module that checks to see whether or not a medical marijuana patient's recommendation ID is valid or not. As I continue to build this, I will be adding more and more recommendation ID providers to the list, for now you can find the list of providers we support below. If there is a provider you want me to build into this, please drop me an email at joshterrill.dev@gmail.com

### install
`npm install marijuana-verify`

### usage
```
var api = require("marijuana-verify");
var verify = api.greenLife("0000000000");
if (verify) {
    // do something
}
```

## api
#### api.greenLife(recId)

### REST server
To start the REST server, install the package globally with `npm install -g marijuana-verify` then run `marijuana-verify-server`

or

```
git clone https://github.com/joshterrill/marijuana-verify.git
cd marijuana-verify/
npm install
npm run start-server
```

Or deploy to Heroku

[![Deploy](https://www.herokucdn.com/deploy/button.png)](https://www.heroku.com/deploy/?template=https://github.com/joshterrill/marijuana-verify)

Link to live REST server: http://marijuana-verify.herokuapp.com/api/


**GET**: `/api/:provider/:recId`

Example: `/api/greenLife/000000000`

Response:
```
{
"provider":"greenLife",
"recId":"000000000",
"verified":true
}
```

### providers
* GreenLife Medical
* 

### disclaimer note
This API is not officially supported by any of these providers.