## 可拖拽悬浮球

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <div id="float" class="ball"></div>
  </body>
  <script type="module">
    import Float from "./lib/float.js";

    new Float({
      target: "#float",
    });
  </script>
  <style>
    .ball {
      width: 50px;
      height: 50px;
      background-color: red;
    }
  </style>
</html>
```
