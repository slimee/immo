const { execute, makeWriteFilesystem } = require('@forestadmin/context');
const myImmoPlan = require('../plan');

describe('generate graph', () => {
  it('produces static files from plan', () => {
    execute([
      myImmoPlan,
      (plan) => plan.addMetadataHook(makeWriteFilesystem(__dirname, '.generated')),
    ])
  })
})
