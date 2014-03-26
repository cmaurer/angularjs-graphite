

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


```
app.config(['$graphiteProvider', function ($graphiteProvider) {

    $graphiteProvider

}
]);
```

Graphite Date Parser
from, until

### RELATIVE_TIME
is a length of time since the current time. It is always preceded my a minus sign ( - ) and follow by a unit of time. Valid units of time:

Abbreviation|Unit
------------|---------
s   |   Seconds
min |   Minutes
h   |   Hours
d   |   Days
w   |   Weeks
mon |   30 Days (month)
y   |   365 Days (year)

### ABSOLUTE_TIME
is in the format HH:MM_YYMMDD, YYYYMMDD, MM/DD/YY, or any other at(1)-compatible time format.

Abbreviation	Meaning
HH	            Hours, in 24h clock format. Times before 12PM must include leading zeroes.
MM	            Minutes
YYYY	        4 Digit Year.
MM	            Numeric month representation with leading zero
DD	            Day of month with leading zero


### Typical Usage

graphite({targets:['',...], from: '', until: '', format: ''})
    .success(function(data, status, headers, config) {

    })
    .error(function(data, status, headers, config) {

    });


