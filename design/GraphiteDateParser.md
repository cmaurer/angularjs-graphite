## Problem trying to solve

Graphite's api utilizes a date format that may be incompatible with other date formats.  Creating a component that knows how to convert a date into Graphite's date format should reduce a lot of date-related code.

### Graphite Date Parser
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
