
## Problem trying to solve

Given a target, how do you decompose it into an object that is easy and intuitive to reconstitute?
The configuration should be as unobtrusive as possible.
The problem trying to solve is to simplify the configuration and creation of metrics, en mass.

targets are both static, dynamic
targets can be created 'on the fly' based on what is passed to graphite

Don't want to
- have a lot of repetition, define once
- have a lot of things that have to change when metric names change (i.e. hook up code, parent/child relationships).


### Example Targets

``lvl1.lvl2.lvl3.lvl4.lvl5``


#### Parse Character Lists
  Characters in square brackets (``[...]``) specify a single character position in the path string.

  ``foo[a]bar`` will create ``fooabar``

  ``foo[atz]bar`` will create ``fooabar``, ``footbar``, ``foozbar``


#### Parse Character Ranges
 A character range is indicated by 2 characters separated by a dash (``-``), and means that any character between
  those 2 characters (inclusive) will be created.

  More than one range can be included within the square brackets, e.g.

  ``foo[1-2]bar`` will create ``foo1bar``, ``foo2bar``

  ``foo[t-v]bar`` will create ``footbar``, ``fooubar``, ``foovbar``

  ``foo[t-v1-2]bar`` will create ``footbar``, ``fooubar``, ``foovbar``, ``foo1bar``, ``foo2bar``


#### Parse Value Lists
 Comma-separated values within curly braces (``{foo,bar,...}``) are treated as value lists.

 For example,

 ``servers.ix01ehssvc04v.cpu.total.{user,system,iowait}`` will create ``servers.ix01ehssvc04v.cpu.total.user``, ``servers.ix01ehssvc04v.cpu.total.system``, ``servers.ix01ehssvc04v.cpu.total.iowait``


#### Named Value Lists
 To reduce the need to copy/paste the same value lists over and over to create targets, named value lists allow the definition of a value list one time, with the ability to reuse the list in multiple target definitions.

 For example,
 ``cpuMeasures: {user,system,iowait}``







[graphite target documentation](http://graphite.readthedocs.org/en/latest/render_api.html#target)

