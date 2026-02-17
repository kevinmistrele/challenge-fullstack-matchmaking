export type FailedRequest = {
  resolve: (token: string | null) => void;
  reject: (error: unknown) => void;
};

export function createRefreshQueue() {
  let isRefreshing = false;
  let queue: FailedRequest[] = [];

  function enqueue(request: FailedRequest) {
    queue.push(request);
  }

  function processQueue(error: unknown, token: string | null) {
    queue.forEach(({ resolve, reject }) => {
      if (error) {
        reject(error);
      } else {
        resolve(token);
      }
    });

    queue = [];
  }

  function getRefreshingState() {
    return isRefreshing;
  }

  function setRefreshingState(state: boolean) {
    isRefreshing = state;
  }

  return {
    enqueue,
    processQueue,
    getRefreshingState,
    setRefreshingState,
  };
}
