module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        //The target directory of Grunt is the standard "public/" folder from Play.
        target: "../public",


        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: 'src/*.js',
                dest: '<%= target %>/<%= pkg.name %>.min.js'
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

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');

    // Load the plugin that provides the "watch" task.
    grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.loadNpmTasks('grunt-contrib-copy');
	
    // Default task(s).
    grunt.registerTask('default', ['uglify', 'copy']);

};