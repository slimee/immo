const { newPlan, execute } = require('@forestadmin/context');

describe('some simple plans', () => {
  it('very simple plan', () => {
    // 1 - Fabrication d'un plan
    const plan = newPlan().addValue('key', 'value');
    // const plan = (plan) => plan.addValue('key', 'value');

    // 2 - Execution d'un plan
    const { key } = execute(plan);

    // 3 - Utilisation du context
    expect(key).toBe('value');
  });

  it('simple plan', () => {
    // 0 - Une fonction prête à être utilisée
    const sayKeyKeyFunc = ({ assertPresent, key }) => {
      assertPresent({ key });
      return key + key;
    }

    // 1 - Fabrication d'un plan
    const plan = (stackPlan) => stackPlan
      .addValue('key', 'value', { private: true})
      .addFactoryFunction('sayKeyKey', sayKeyKeyFunc);

    // 2 - Execution d'un plan
    const { key, sayKeyKey } = execute(plan);

    // 3 - Utilisation du context
    expect(key).toBe(undefined);
    expect(sayKeyKey).toBe('valuevalue');
  });

  it('plan with steps and private', () => {
    const plan = (rootPlan) => rootPlan
      .addStep('env', (envPlan) => envPlan.addValue('url', 'localhost'))
      .addStep('business', (businessPlan) => businessPlan
        .addStep('inner', (innerPlan) => innerPlan
          .addValue('publicValueInInner', 'accessible only from business step')
          .addValue('privateValueInInner', 'absolutly-nobody-see-this', { private: true })
        , { private: true })
        .addStep('outer', (outerPlan) => outerPlan
            .addFactoryFunction('publicValueInOuter', ({ publicValueInInner }) => publicValueInInner)
            .addFactoryFunction('otherPublicValueInOuter', ({ privateValueInInner }) => privateValueInInner)));

    const {
      publicValueInInner, privateValueInInner, publicValueInOuter, otherPublicValueInOuter,
    } = execute(plan);

    expect(publicValueInInner).toBe(undefined);
    expect(privateValueInInner).toBe(undefined);
    expect(publicValueInOuter).toBe('accessible only from business step');
    expect(otherPublicValueInOuter).toBe(undefined);
  });
});

