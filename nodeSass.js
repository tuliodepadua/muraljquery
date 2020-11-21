var sass = require("node-sass");
var result = sass.renderSync({
  file: "/path/to/file.scss",
  data: "body{background:blue; a{color:black;}}",
  outputStyle: "compressed",
  outFile: "/to/my/output.css",
  sourceMap: true, // or an absolute or relative (to outFile) path
  importer: function (url, prev, done) {
    someAsyncFunction(url, prev, function (result) {
      done({
        file: result.path, // only one of them is required, see section Special Behaviours.
        contents: result.data,
      });
    });
    var result = someSyncFunction(url, prev);
    return { file: result.path, contents: result.data };
  },
});

console.log(result.css);
console.log(result.map);
console.log(result.stats);
