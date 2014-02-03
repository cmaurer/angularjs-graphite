angularjs-graphite
==================

Predefined services for Angular.js to make integrating with Graphite simple, quick, & effective


## Design Thoughts

**Server Configuration**

**Metric Search**
 - Enable find all metrics

**Datatype Facade**
  - Always communicate with graphite via raw (should be most efficient) datatype, expose json, csv, or raw passthrough

**Time Facade**
  - Expand time formatting beyond the api that graphite exposes

**Render API Facade**

**Aggregation**

**Caching**

**Promises, Promises**
_yeah, Im a child of the 80's_

**Enable composing Metric Urls easier**
 - writing dashboards, apps can get really hairy with a lot of urls.
 - Is there an angular way to minimize the nastiness of url-bloat?

**CORS, etc**
 - security

**Testing**
 - test the heck out of it.
