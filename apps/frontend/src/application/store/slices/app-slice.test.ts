import reducer, { setInitialized } from './app-slice';

describe('App Slice', () => {
  // Teste 1: Validar o Estado Inicial
  it('should return the initial state', () => {
    expect(reducer(undefined, { type: 'unknown' })).toEqual({
      isInitialized: true,
    });
  });

  // Teste 2: Validar a Action de Inicialização
  it('should handle setInitialized', () => {
    const initialState = { isInitialized: true };
    const actual = reducer(initialState, setInitialized(false));

    expect(actual.isInitialized).toBe(false);
  });

  // Teste 3: Validar a Reversão da Action
  it('should handle setInitialized changing from false to true', () => {
    const initialState = { isInitialized: false };
    const actual = reducer(initialState, setInitialized(true));

    expect(actual.isInitialized).toBe(true);
  });
});
