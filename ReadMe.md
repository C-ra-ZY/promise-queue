# promise-sequence

this package help to realize such a scenario: get promise resolved result in sequence, Give priority to the results of A, if A was rejected, then to B and if B failed, then to C.

## Install

```bash
npm i promise-sequence 
```

## Usage

```js
const pq = require("./index.js");
let params=[];
/*
    fill the params with promises
*/
pq(params).then(/*resolve logic*/).catch(/*reject logic*/)
```

## Example

see ./example.js

## License

MIT
