interface GetHostParams {
  purpose?: string;
}

export const getHost = ({ purpose }: GetHostParams = {}): string => {
  if (typeof window !== 'undefined') {
    let { host } = window.location;
    if(localStorage.getItem('apiURL')){
      return localStorage.getItem('apiURL');
    } else if (process.env.REACT_APP_GPTR_API_URL) {
      return process.env.REACT_APP_GPTR_API_URL;
    } else if (process.env.NEXT_PUBLIC_GPTR_API_URL) {
      return process.env.NEXT_PUBLIC_GPTR_API_URL;
    } else if (purpose === 'langgraph-gui') {
      return host.includes('localhost') ? 'http%3A%2F%2F127.0.0.1%3A8123' : `https://${host}`;
    } else {
      return host.includes('localhost') ? 'http://localhost:8000' : `https://${host}`;
    }
  }
  return '';
};