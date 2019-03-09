# promise-sequence

this package help to realize such a scenario: get promise resolved result in sequence, Give priority to the results of A, if A was rejected, then to B and if B failed, then to C.

## Install

```bash
npm i promise-queue 
```

## Usage

```js
const PromiseQue = require("./index.js");
let params=[];
/*
    fill the params with promises
*/
let pq=new PromiseQue(params).done().then(/*resolve logic*/).catch(/*reject logic*/)
let status = await pq.status();
```

## Example

see ./example.js

## License

MIT
