import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  // VUs are virtual users. This smoke test uses one user to confirm the endpoint is healthy.
  vus: 1,
  duration: '15s',
  thresholds: {
    // Thresholds define pass/fail performance goals for the test.
    http_req_failed: ['rate<0.01'],
    http_req_duration: ['p(95)<800'],
  },
};

export default function () {
  const response = http.get('https://jsonplaceholder.typicode.com/posts/1');

  // Checks validate functional expectations during a performance run.
  check(response, {
    'status is 200': (res) => res.status === 200,
    'response has post id 1': (res) => res.status === 200 && res.json('id') === 1,
  });

  sleep(1);
}
