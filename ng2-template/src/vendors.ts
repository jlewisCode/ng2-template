/*
  Importing here helps optimize Webpack by caching dependencies for later use
  in bundling as required by import statements elsewhere in the app.
  That goes for any file type (js, ts, css, scss, etc)
*/

import '@angular/platform-browser';
import '@angular/platform-browser-dynamic';
import '@angular/core';
import '@angular/common';
import '@angular/http';
import '@angular/router';

import 'rxjs';
import 'js-data';
import 'js-data-http';

// import 'lodash';
// import 'ng2-bootstrap';
