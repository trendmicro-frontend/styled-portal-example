import { Machine, assign } from 'xstate';

const createFetchMachine = () => {
  const fetchMachine = Machine({
    id: 'fetchMachine',
    initial: 'idle',
    context: {
      isFetchedOnce: false,
      isFetching: false,
      data: null,
      error: null,
    },
    states: {
      idle: {
        on: {
          FETCH: {
            target: 'fetching',
            actions: ['onFetching'],
          },
        },
      },
      fetching: {
        invoke: {
          src: 'fetch',
          onDone: {
            target: 'success',
            actions: ['onSuccess'],
          },
          onError: {
            target: 'failure',
            actions: ['onFailure'],
          },
        },
      },
      success: {
        on: {
          FETCH: {
            target: 'fetching',
            actions: ['onClearData', 'onFetching'],
          },
        },
      },
      failure: {
        on: {
          FETCH: {
            target: 'fetching',
            actions: ['onClearData', 'onFetching'],
          },
        },
      },
    },
  }, {
    actions: {
      onResetContext: assign((context, event) => ({ ...fetchMachine.initialState.context })),
      onClearData: assign({
        data: null,
        error: null,
      }),
      onFetching: assign({
        isFetching: true,
      }),
      onSuccess: assign({
        isFetchedOnce: true,
        isFetching: false,
        data: (context, event) => event.data,
      }),
      onFailure: assign({
        isFetching: false,
        error: (context, event) => new Error(event.data?.message),
      }),
    },
    services: {
      fetch: (context) => null,
    },
  });

  return fetchMachine;
};

export default createFetchMachine;
