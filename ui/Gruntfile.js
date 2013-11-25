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
                src: 'src/<%= pkg.name %>*.js',
                dest: '<%= target %>/<%= pkg.name %>.min.js'
            }
        },

        watch: {
            files: ['**/*.js'],
            tasks: ['default']
        },

        coffee: {
            compileWithMaps: {
                options: {
                    sourceMap: true
                },
                files: {
                    '<%= target %>/main.js': [
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
				{expand: true, src: ['fonts/*', 'images/*', 'stylesheets/*',], dest: '<%= target %>/', filter: 'isFile'},
		    ]
		  }
		},
        watch: {
            files: ['**/*.js','**/*.css'],
            tasks: ['default']
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.loadNpmTasks('grunt-contrib-coffee');

    grunt.loadNpmTasks('grunt-contrib-copy');
    

    // Default task(s).
    grunt.registerTask('default', ['uglify', 'coffee', 'copy']);

};
