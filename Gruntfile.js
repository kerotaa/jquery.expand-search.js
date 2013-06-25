module.exports = function(grunt) {

    var pkg = grunt.file.readJSON('package.json');

    grunt.initConfig({
        pkg: pkg,

        watch: {
            script: {
                files: ['coffee/*.coffee', 'package.json'],
                tasks: ['coffee', 'uglify', 'concat']
            },

            css: {
                files: ['scss/*.scss'],
                tasks: ['compass']
            }
        },

        coffee: {
            compile: {
                options: {
                    bare: true
                },
                expand: true,
                cwd: 'coffee/',
                src: ['jquery.*.coffee'],
                dest: 'js/',
                rename: function(dest, src){ return dest + src.replace('.coffee', '.js') }
            }
        },

        uglify: {
            targets: {
                files: {
                    'js/jquery.<%= pkg.name %>.min.js': ['js/jquery.<%= pkg.name %>.js']
                }
            }
        },

        concat: {
            options: {
                stripBanners: true,
                banner: '/*!\n' +
                        ' * jquery.<%= pkg.name %>.js - v<%= pkg.version %> - https://github.com/<%= pkg.author.name %>/jquery.<%= pkg.name %>.js\n' +
                        ' * <%= pkg.description %>\n' +
                        ' * \n' +
                        ' * \n' +
                        ' * Copyright (c) <%= pkg.license.since %> <%= pkg.author.name %> (<%= pkg.author.url %>)\n' +
                        ' * Licensed under the <%= pkg.license.name %> license (<%= pkg.license.url %>).\n' +
                        ' * <%= grunt.template.today("yyyy-mm-dd") %>\n' +
                        ' **/\n;'
            },
            files: {
                expand: true,
                cwd: 'js/',
                src: ['jquery.*.js'],
                dest: 'js/'
            }
        },

        compass: {
            dist: {
                options: {
                    sassDir: 'scss',
                    cssDir: 'css',
                    outputStyle: 'expanded',
                    noLineComments: true
                }
            }
        }
    });

    for(var taskName in pkg.devDependencies) {
        if(taskName.substring(0, 6) == 'grunt-') {
            grunt.loadNpmTasks(taskName);
        }
    }

    grunt.registerTask('default', ['watch']);

};