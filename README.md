angularjs-graphite
==================

Predefined services for Angular.js to make integrating with Graphite simple, quick, & effective

[![Build Status](https://travis-ci.org/cmaurer/angularjs-graphite.png?branch=master)](https://travis-ci.org/cmaurer/angularjs-graphite)

## Design Thoughts

**Server Configuration**
 - Environment(s)
 - URL's, ports
 - Security, CORS, etc

**Metric Search**
 - Enable find all metrics

**Datatype Facade**
  - Always communicate with graphite via raw (should be most efficient) datatype, expose json, csv, or raw passthrough
  - enable formatting between datatypes

**Time Facade**
  - Expand time formatting beyond the api that graphite exposes

**Render API Facade**

Typical url format

``` url:port:target(s):from:until:format ```

Typically there is a lot of code that looks something like the following

> "alias(sumSeries(exclude(asPercent(nonNegativeDerivative(server1.procfs.stat.cpu.*)),'idle')),'server1')," +
> "alias(sumSeries(exclude(asPercent(nonNegativeDerivative(server2.procfs.stat.cpu.*)),'idle')),'server2')," +
> "alias(sumSeries(exclude(asPercent(nonNegativeDerivative(server3.procfs.stat.cpu.*)),'idle')),'server3')," +
> "alias(sumSeries(exclude(asPercent(nonNegativeDerivative(server4.procfs.stat.cpu.*)),'idle')),'server4')," +
> ...

Repetitively creating target urls, where the only thing that typically changes is the specific server name.  That can be different based on the specific graphite server instance.

How can it be abstracted out to something less repetitive?


**Aggregation, Parallelization, Routing**
 - Route requests to specific servers for improved performance
 - Parallelize requests
 - Aggregate responses into combined format

**Caching**


**Promises, Promises**
_yeah, Im a child of the 80's_

**Enable composition of Metric Urls easier**
 - writing dashboards, apps can get really hairy with a lot of urls.
 - Is there an angular way to minimize the nastiness of url-bloat?

**Testing**
 - test the heck out of it.
