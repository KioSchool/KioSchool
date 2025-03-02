function useRefresh() {
  const allowPullToRefresh = () => {
    const body = document.querySelector('body');
    if (body) {
      body.style.overscrollBehaviorY = 'auto';
    }
  };

  return { allowPullToRefresh };
}

export default useRefresh;
