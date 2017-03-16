'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _util = require('util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _process$argv = _slicedToArray(process.argv, 4),
    source = _process$argv[2],
    output = _process$argv[3];

if (!source || !output) {
  throw new TypeError('Parameter was omitted. node unpack/index.js :source :output');
}

var sourcePath = _path2.default.resolve(source);
var outputPath = _path2.default.resolve(output);

console.log('Feeles/unpack: ' + sourcePath + ' into ' + outputPath);

mkdirIfNotExist(outputPath);

var content = _fs2.default.readFileSync(sourcePath, 'utf8');
var array = JSON.parse(content);
var _iteratorNormalCompletion = true;
var _didIteratorError = false;
var _iteratorError = undefined;

try {
  for (var _iterator = array[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
    var _ref2 = _step.value;
    var name = _ref2.name,
        composed = _ref2.composed;


    var filePath = _path2.default.join(outputPath, name);
    var loc = _path2.default.parse(filePath);
    mkdirIfNotExist(loc.dir);
    _fs2.default.writeFile(filePath, composed, 'base64');
  }
} catch (err) {
  _didIteratorError = true;
  _iteratorError = err;
} finally {
  try {
    if (!_iteratorNormalCompletion && _iterator.return) {
      _iterator.return();
    }
  } finally {
    if (_didIteratorError) {
      throw _iteratorError;
    }
  }
}

function mkdirIfNotExist(absolutePath) {
  if (!_fs2.default.existsSync(absolutePath)) {
    var dir = _path2.default.parse(absolutePath).dir;
    mkdirIfNotExist(dir);
    _fs2.default.mkdir(absolutePath);
  }
}