

## Problem trying to solve

Reduce the time, and complexity of connecting to a graphite instance.  Reduce the requirement to create from scratch every time.
tested, reusable, injectable

Connecting to a graphite instance should involve

 - identifying the server name, port, or alternatively a specific environment
 - configuring the http component
 - configuring the httpProvider
 - identifying the graphite protocol to use (raw, json, csv, pickle, etc)
 - configuring the http transformers (in and out)
 - provide functionality to manipulate dates

How to handle the following?

```
app.config(['$httpProvider', function ($httpProvider) {
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
}
]);
```




