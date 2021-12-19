import { check } from 'k6';
import http from 'k6/http';

//
// Default options for the k6 runner instance.
// These can be override by using the command switches (see README.md)
//
export let options = {

    insecureSkipTLSVerify: true,
    httpDebug: 'full',

    ext: {

        loadimpact: {

            projectID: 3564654,
            name: "gcp-wp-1"

        }

    },


    stages: [

        {

            duration: '30s',
            target: 1

        }

    ],

    thresholds: {

        'http_req_duration': [ 'p(99)<30000' ], // 99% of requests must complete below 30s

    }

};

export default function (data) {

    const request = http.get(__ENV.URL, {});

    check(request, {

        'query returns 200 OK': r => r.status === 200,

    })


}
