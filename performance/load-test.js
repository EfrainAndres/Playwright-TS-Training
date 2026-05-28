import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '15s', target: 3 },
    { duration: '30s', target: 3 },
    { duration: '15s', target: 0 },
  ],
  thresholds: {
    http_req_failed: ['rate<0.01'],
    http_req_duration: ['p(95)<1000'],
  },
};

export default function () {
  const response = http.get('https://jsonplaceholder.typicode.com/posts');

  check(response, {
    'status is 200': (res) => res.status === 200,
  });

  sleep(1);
}
