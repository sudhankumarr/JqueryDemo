module.exports = function(grunt) {

// Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    copy: {
      build: {
        cwd: 'source',
        src: [ 'scripts/**', 'json/**', 'images/**', 'styles/vendor/font-awesome/**' ],
        dest: 'build',
        expand: true
      }
    },
    jade: {
      compile: {
        options: {
          pretty: true
        },
        files: [{
          expand: true,
          cwd: 'source',
          src: [ 'home.jade', 'products.jade', 'contact_us.jade', 'get_quote.jade'],
          dest: 'build',
          ext: '.html'
        }]
      }
    },
    less: {
      compile: {
        options: {
          data: {}
        },
        files: [{
          expand: true,
          cwd: 'source',
          src: ['styles/main.less'],
          dest: 'build',
          ext: '.css'
        }]
      }
    }
  });

  // Load
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-contrib-less');
  // Default task(s).
  grunt.registerTask('serve', ['copy', 'jade', 'less']);
};