module.exports = function (grunt) {
    grunt.initConfig({
        jshint: {
            files: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js'],
            options: {
                globals: {
                    jQuery: true
                }
            }
        },
        sass: {
            dist: {
                files: {
                    'css/365scores.css': 'css/365scores.scss'
                }
            }
        },
        copy: {
            files: {
                src: 'node_modules/normalize.css/normalize.css',
                dest: 'css/normalize.css'
            }
        },
        connect: {
            server: {
                options: {
                    port: 9005,
                    livereload: true
                }
            }
        },
        open: {
            server: {
                path: 'http://localhost:<%= connect.server.options.port %>'
            }
        },
        watch: {
            sass: {
                files: ['**/*.scss'],
                tasks: ['sass']
            },
            js: {
                files: ['<%= jshint.files %>'],
                tasks: ['jshint']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-open');


    grunt.registerTask('default', ['copy', 'jshint', 'connect', 'open', 'watch']);

};