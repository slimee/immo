const fetch = require('node-fetch');
const { execute } = require('@forestadmin/context');
const myImmoPlan = require('../plan');

describe('call-api', () => {
  it('fetch /api/search', async () => {
    const myImmoApp = execute(myImmoPlan);
    await myImmoApp.start();

    const data = await fetch(`http://localhost:${myImmoApp.getHTTPPort()}/api/search`)
        .then(response => response.json());

    console.log(data);
  });
});
