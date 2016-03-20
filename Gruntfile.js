module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    banner: '/*!\n' +
            ' * Horizon Swiper\n' +
            ' * Version <%= pkg.version %>\n' +
            ' * Domain ( http://horizon-swiper.sebsauer.de/ )\n' +
            ' * Copyright 2015 <%= pkg.author %>\n' +
            ' * Licensed under MIT ( https://github.com/sebsauer90/horizon-swiper/blob/master/LICENSE )\n' +
            ' */',

    /* Sass compiler Task */
    sass: {
      main: {
        options: {
          style: 'nested',
          sourcemap: 'none',
          noCache: true
        },
        files: [
          {
            expand: true,
            cwd: 'src',
            src: ['*.scss'],
            dest: 'dist',
            ext: '.min.css'
          }
        ]
      }
    },

    /* Autoprefixer */
    autoprefixer: {
      your_target: {
        files: {
          'dist/horizon-swiper.min.css': ['dist/horizon-swiper.min.css'],
          'dist/horizon-theme.min.css': ['dist/horizon-theme.min.css']
        }
      },
    },

    /* Minify CSS */
    cssmin: {
      options: {
        compatibility: 'ie8',
        sourceMap: false
      },
      target: {
        files: {
          'dist/horizon-swiper.min.css': ['dist/horizon-swiper.min.css'],
          'dist/horizon-theme.min.css': ['dist/horizon-theme.min.css']
        }
      }
    },

    /* Babel */
    babel: {
      options: {
        sourceMap: false
      },
      dist: {
        files: [
          {
            'expand': true,
            'cwd': 'src/es6',
            'src': ['*.js'],
            'dest': 'src',
            'ext': '.js'
          }
        ]
      }
    },

    /* JS uglify  */
    uglify: {
      options: {
        sourceMap: false
      },
      my_target: {
        files: {
          'dist/horizon-swiper.min.js': ['src/horizon-swiper.js']
        }
      }
    },

    usebanner: {
      dist: {
        options: {
          position: 'top',
          banner: '<%= banner %>',
          linebreak: true
        },
        files: {
          src: [ 'dist/*.{css,js}' ]
        }
      },
      last_line: {
        options: {
          position: 'bottom',
          banner: '\n',
          linebreak: false
        },
        files: {
          src: [ 'dist/*.{css,js}' ]
        }
      }
    }

  });


  /* Load plugins */
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-babel');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-banner');

  /* Tasks  */
  grunt.registerTask('default', ['sass', 'autoprefixer', 'cssmin', 'babel', 'uglify', 'usebanner']);
  grunt.registerTask('css', ['sass', 'autoprefixer', 'cssmin']);
  grunt.registerTask('js', ['babel', 'uglify']);

};
