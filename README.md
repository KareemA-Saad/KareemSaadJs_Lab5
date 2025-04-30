defer

Loads script in the background while HTML is parsing

Waits to execute until the HTML is fully parsed

Preserves script order (runs scripts in the order they appear)

Ideal for scripts that depend on the DOM or each other

Use in <head> or <body>


*EXAMPLE*:

DOCTYPE html
<html>
<head>
  <script src="script1.js" defer></script>
  <script src="script2.js" defer></script>
</head>
<body>
  <h1>Hello, world!</h1>
</body>
html
--- script1.js loads and runs before script2.js, both after the HTML is fully parsed.

async
Loads script in the background while HTML is parsing

Executes immediately once loaded (may interrupt HTML parsing)

Does not guarantee order between multiple scripts

Best for scripts that are independent (e.g., analytics, ads)

Use in <head> or <body>


  <script src="script1.js" async></script>
  <script src="script2.js" async></script>
</head>
<body>
  <h1>Hello, world!</h1>
</body>


scripts run as soon as they load, order not guaranteed.
both load and run independently — whichever finishes first runs first
