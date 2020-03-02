# Simple Data Source

[![CircleCI](https://circleci.com/gh/grafana/simple-datasource/tree/master.svg?style=svg)](https://circleci.com/gh/grafana/simple-datasource/tree/master)

The faker datasource uses faker.js to create random data for panels. 

In a single request, the time range is divided up, and a request for random data is generated. 
The datasource uses moustace templates to generate data, so:
```
{{name.lastName}}, {{name.firstName}} {{name.suffix}}
{{address.city}}
{{database.column}}
{{random.number({"min": 1, "max": 255})}}
```

Will generate a table of data with time, and 3 columns: a random name, a city, a database column, and a random integer between 1 and 255.

For a chart, the following:
```
{{random.number({"min": 1, "max": 255})}}
{{random.number({"min": 255, "max": 512})}}
```

Will generate 2 series from a single request (A).
If you move the second line to it's own request, you get the same dataset, but over two queries.

Feedback and comments welcome.
