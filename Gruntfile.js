'use strict';
module.exports = function(grunt) {
  // Load all tasks
  require('load-grunt-tasks')(grunt);
  // Show elapsed time
  require('time-grunt')(grunt);

  var jsFileList = [
    'assets/vendor/ace-builds/src-noconflict/ace.js',
    'assets/vendor/ace-builds/src-noconflict/theme-chrome.js',
    'assets/vendor/ace-builds/src-noconflict/mode-javascript.js',
    'assets/vendor/jroff/dist/jroff.js',
    'assets/js/**/_*.js',
    'assets/js/main.js'
  ];

  grunt.initConfig({
    distPath: 'assets/build',
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
        'Gruntfile.js',
        'assets/js/*.js',
        '!<%= distPath %>/js/scripts.js',
        '!assets/**/*.min.*'
      ]
    },
    sass: {
      options: {
        sourceMap: false
      },
      dev: {
        files: {
          '<%= distPath %>/css/main.css': 'assets/scss/main.scss'
        }
      },
      build: {
        files: {
          '<%= distPath %>/css/main.min.css': 'assets/scss/main.scss'
        }
      }
    },
    concat: {
      options: {
        separator: ';',
      },
      dist: {
        src: [jsFileList],
        dest: '<%= distPath %>/js/scripts.js',
      },
    },
    uglify: {
      dist: {
        files: {
          '<%= distPath %>/js/scripts.min.js': [jsFileList]
        }
      }
    },
    autoprefixer: {
      options: {
        browsers: ['last 2 versions', 'ie 8', 'ie 9', 'android 2.3', 'android 4', 'opera 12']
      },
      dev: {
        options: {
          map: {
            prev: '<%= distPath %>/css/'
          }
        },
        src: '<%= distPath %>/css/main.css'
      },
      build: {
        src: '<%= distPath %>/css/main.min.css'
      }
    },
    modernizr: {
      build: {
        devFile: 'assets/vendor/modernizr/modernizr.js',
        outputFile: 'assets/js/vendor/modernizr.min.js',
        files: {
          'src': [
            ['<%= distPath %>/js/scripts.min.js'],
            ['<%= distPath %>/css/main.min.css']
          ]
        },
        extra: {
          shiv: false
        },
        uglify: true,
        parseFiles: true
      }
    },
    grunticon: {
      myIcons: {
        files: [{
          expand: true,
          cwd: 'assets/img',
          src: ['*.svg', '*.png'],
          dest: "assets/css/icons"
        }],
        options: {
          enhanceSVG: true
        }
      }
    },
    browserSync: {
      dev: {
        options: {
          server: {
            baseDir: "./"
          },
          files: ['<%= distPath %>/css/main.css', '<%= distPath %>/js/scripts.js', 'index.html'],
          watchTask: true
        }
      }
    },
    watch: {
      sass: {
        files: [
          'assets/scss/*.scss',
          'assets/scss/**/*.scss'
        ],
        tasks: ['sass:dev', 'newer:autoprefixer:dev'],
        options: {
          spawn: false
        }
      },
      js: {
        files: [
          jsFileList
        ],
        tasks: ['newer:concat'],
        options: {
          spawn: false
        }
      }
    },
    copy: {
      dist: {
        files: [
          { expand: true, src: ['<%= distPath %>/**'], dest: 'dist/', filter: 'isFile' },
          { src: ['index.html'], dest: 'dist/index.html' },
        ]
      }
    }
  });

  // Register tasks
  grunt.registerTask('default', [
    "browserSync",
    "watch"
  ]);

  grunt.registerTask('dev', [
    'jshint',
    'sass',
    'autoprefixer:dev',
    'concat'
  ]);

  grunt.registerTask('build', [
    // 'jshint',
    'sass',
    'autoprefixer:build',
    'uglify',
    'modernizr',
    'concat',
    'copy'
  ]);
};
