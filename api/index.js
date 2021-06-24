const { execute } = require('@forestadmin/context');
const myImmoPlan = require('./plan');

const myImmoApp = execute(myImmoPlan);

myImmoApp.start();
