module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        //The target directory of Grunt is the standard "public/" folder from Play.
        target: "../public/",


        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: 'src/javascripts/*.js',
                dest: '<%= target %>main.min.js'
            }
        },

        coffee: {
            compileWithMaps: {
                options: {
                    sourceMap: true
                },
                files: {
                    '<%= target %>javascripts/main.js': [
                        'src/app/*.coffee',
                        'src/app/controllers/*.coffee',
                        'src/app/services/*.coffee',
                        'src/app/directives/*.coffee'
                        ] // concat then compile into single file
                }
            }
        },
		copy: {
		  main: {
		    files: [
                {cwd: 'src/', filter: 'isFile', flatten: true, expand: true, src: ['fonts/*'], dest: '<%= target %>fonts'},
                {cwd: 'src/', filter: 'isFile', flatten: true, expand: true, src: ['images/*'], dest: '<%= target %>images'},
                {cwd: 'src/', filter: 'isFile', flatten: true, expand: true, src: ['javascripts/*'], dest: '<%= target %>javascripts'},
                {cwd: 'src/', filter: 'isFile', flatten: true, expand: true, src: ['stylesheets/*'], dest: '<%= target %>stylesheets'}

		    ]
		  }
		},
        watch: {
            files: ['**/*.js','**/*.css'],
            tasks: ['default']
        },
        less: {
          development: {
            options: {
              paths: ["assets/css"]
            },
            files: {
              "<%= target %>stylesheets/main.css": "src/stylesheets/main.less"
            }
          },
          production: {
            options: {
              paths: ["assets/css"],
              cleancss: true
            },
            files: {
              "<%= target %>stylesheets/main.css": "src/stylesheets/main.less"
            }
          }
        }
    });

    // Loading the different plugins
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-coffee');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-less');
    

    // Default task(s).
    grunt.registerTask('default', ['uglify', 'coffee', 'less', 'copy']);

};
