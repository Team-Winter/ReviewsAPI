import http from 'k6/http';

import { sleep, check } from 'k6';

export const options = {
  vus: 7000,
  duration: '15s',
};

export default function () {
  let product = Math.ceil(Math.random() * 1000000);
  const res1 = http.get(`http://localhost:3005/reviews?product_id=${product}&page=0`);
  // const res2 = http.get(`http://localhost:3000/reviews/meta?product_id=${product}`);

  // const res3 = http.get(`http://localhost:3000/reviews?product_id=${product}&page=1`);
  // product = Math.ceil(Math.random() * 1000000);
  // const res4 = http.get(`http://localhost:3000/reviews?product_id=${product}&page=0`);
  // const res5 = http.get(`http://localhost:3000/reviews/meta?product_id=${product}`);
  // const res6 = http.get(`http://localhost:3000/reviews?product_id=${product}&page=1`);
  sleep(1);

  check(res1, {
    'Is status 200': (r) => r.status === 200,
    'is duration < 2000': (r) => r.timings.duration < 2000,
  });

  // check(res2, {
  //   'Is status 200': (r) => r.status === 200,
  //   'is duration < 2000': (r) => r.timings.duration < 2000,
  // });
  // check(res3, {
  //   'Is status 200': (r) => r.status === 200,
  //   'is duration < 2000': (r) => r.timings.duration < 2000,
  // });
  // check(res4, {
  //   'Is status 200': (r) => r.status === 200,
  //   'is duration < 50': (r) => r.timings.duration < 50,
  // });
  // check(res5, {
  //   'Is status 200': (r) => r.status === 200,
  //   'is duration < 50': (r) => r.timings.duration < 50,
  // });
  // check(res6, {
  //   'Is status 200': (r) => r.status === 200,
  //   'is duration < 50': (r) => r.timings.duration < 50,
  // });
}
