module.exports = function(grunt) {

    require('time-grunt')(grunt);
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        bower: {
            install: {
                options: {
                    targetDir: 'client/requires',
                    layout: 'byComponent'
                }
            }
        },

        clean: {
            build: ['build'],
            dev: {
                src: ['build/app.js', 'build/<%= pkg.name %>.css', 'build/<%= pkg.name %>.js']
            },
            prod: ['dist']
        },

        browserify: {
            vendor: {
                src: ['client/requires/backbone/*.js', 'client/requires/jquery/*.js', 'client/requires/underscore/*.js',],
                dest: 'build/vendor.js',
                options: {
                    shim: {
                        jquery: {
                            path: 'client/requires/jquery/js/jquery.js',
                            exports: '$'
                        },
                        underscore: {
                            path: 'client/requires/underscore/js/underscore.js',
                            exports: '_'
                        },
                        backbone: {
                            path: 'client/requires/backbone/js/backbone.js',
                            exports: 'Backbone',
                            depends: {
                                underscore: 'underscore'
                            }
                        }
                    }
                }
            },
            app: {
                files: {
                    'build/app.js': ['client/src/main.js']
                },
                options: {
                    transform: ['hbsfy'],
                    external: ['jquery', 'underscore', 'backbone']
                }
            },
            test: {
                files: {
                    'build/tests.js': [
                        'client/spec/**/*.test.js'
                    ]
                },
                options: {
                    transform: ['hbsfy'],
                    external: ['jquery', 'underscore', 'backbone']
                }
            }
        },


        sass: {
            dist: {
                options: {
                    trace: true,
                    noCache : true,
                    style: 'compressed'
                },
                files: {
                    'build/<%= pkg.name %>.css': [ 'client/styles/sass/app.css.scss']
                }
            }
        },

        

        concat: {
            'build/<%= pkg.name %>.js': [
                'client/requires/jquery/js/jquery.js',
                'client/requires/underscore/js/underscore.js',
                'client/requires/backbone/js/backbone.js',
                'client/requires/foundation/foundation.js',
                'client/requires/dynatable/jquery.dynatable.js',
                'client/requires/jstree/jstree.js',
                'client/src/isotope.pkgd.min.js', 
                'client/src/stickySidebar.js',
                'client/src/runtime.js',
                'build/jade.js',
                'build/app.js'
            ]
        },

        copy: {
            dev: {
                files: [{
                    src: 'build/<%= pkg.name %>.js',
                    dest: 'public/js/<%= pkg.name %>.js'
                }, {
                    src: 'build/<%= pkg.name %>.css',
                    dest: 'public/css/<%= pkg.name %>.css'
                }, {
                    src: 'client/img/*',
                    dest: 'public/img/'
                }]
            },
            prod: {
                files: [{
                    src: 'client/img/*',
                    dest: 'public/img/'
                }]
            }
        },

        // CSS minification.
        cssmin: {
            minify: {
                src: ['build/<%= pkg.name %>.css'],
                dest: 'public/css/<%= pkg.name %>.css'
            }
        },

        // Javascript minification.
        uglify: {
            compile: {
                options: {
                    compress: true,
                    verbose: true
                },
                files: [{
                    src: 'build/<%= pkg.name %>.js',
                    dest: 'public/js/<%= pkg.name %>.js'
                }]
            }
        },

        // for changes to the front-end code
        watch: {
            scripts: {
                files: ['client/templates/*.hbs', 'client/src/**/*.js'],
                tasks: ['clean:dev', 'browserify:app', 'concat', 'copy:dev']
            },
            less: {
                files: ['client/styles/**/*.less'],
                tasks: ['less:transpile', 'copy:dev']
            },
            test: {
                files: ['build/app.js', 'client/spec/**/*.test.js'],
                tasks: ['browserify:test']
            },
            jade: {
                files: ['client/templates/*.jade'],
                tasks: ['jade', 'concat', 'copy:dev']
            },
            karma: {
                files: ['build/tests.js'],
                tasks: ['jshint:test', 'karma:watcher:run']
            }
        },

        // for changes to the node code
        nodemon: {
            dev: {
                options: {
                    file: 'server.js',
                    nodeArgs: ['--debug'],
                    watchedFolders: ['controllers', 'app'],
                    env: {
                        PORT: '3300'
                    }
                }
            }
        },

        // server tests
        simplemocha: {
            options: {
                globals: ['expect', 'sinon'],
                timeout: 3000,
                ignoreLeaks: false,
                ui: 'bdd',
                reporter: 'spec'
            },

            server: {
                src: ['spec/spechelper.js', 'spec/**/*.test.js']
            }
        },

        // mongod server launcher
        shell: {
            mongo: {
                command: 'mongod',
                options: {
                    async: true
                }
            }
        },

        concurrent: {
            dev: {
                tasks: ['nodemon:dev', 'shell:mongo', 'watch:scripts', 'watch:less', 'watch:test', 'watch:jade'],
                options: {
                    logConcurrentOutput: true
                }
            },
            test: {
                tasks: ['watch:karma'],
                options: {
                    logConcurrentOutput: true
                }
            }
        },

        // for front-end tdd
        karma: {
            options: {
                configFile: 'karma.conf.js'
            },
            watcher: {
                background: true,
                singleRun: false
            },
            test: {
                singleRun: true
            }
        },

        jshint: {
            all: ['Gruntfile.js', 'client/spec/**/*.js'],
            dev: [],
            test: ['client/spec/**/*.js']
        },

        jade: {
          compile: {
            options: {
              client: true,
              data: {
                debug: false
              }
            },
            files: {
              "build/jade.js": ["client/templates/*.jade"]
            }
        }
}
    });

    grunt.registerTask('init:dev', ['clean', 'bower', 'browserify:vendor']);

    grunt.registerTask('build:dev', ['clean:dev', 'browserify:app', 'browserify:test', 'jshint:dev', 'jade', 'sass', 'concat', 'copy:dev']);
    grunt.registerTask('build:prod', ['clean:prod', 'browserify:vendor', 'browserify:app', 'jshint:all', 'sass', 'concat', 'cssmin', 'uglify', 'copy:prod']);

    grunt.registerTask('heroku', ['init:dev', 'build:dev']);

    grunt.registerTask('server', ['build:dev', 'concurrent:dev']);
    grunt.registerTask('test:server', ['simplemocha:server']);

    grunt.registerTask('test:client', ['karma:test']);
    grunt.registerTask('tdd', ['karma:watcher:start', 'concurrent:test']);

    grunt.registerTask('test', ['test:server', 'test:client']);
};
