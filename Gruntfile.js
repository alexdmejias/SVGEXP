'use strict';

module.exports = function (grunt) {
	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

	var paths = {
		libraryDir: 'assets'
	};

	grunt.initConfig({
		creds: grunt.file.readJSON('server_creds.json'),
		paths: paths,

		autoprefixer: {
			dist: {
				src: '<%= paths.libraryDir %>/css/styles.css',
				dest: '<%= paths.libraryDir %>/css/styles.css'
			}
		},

		sass: {
			options: {
				sourceComments: 'map'
			},
			dist: {
				files: {
					'<%= paths.libraryDir %>/css/styles.css': '<%= paths.libraryDir %>/scss/styles.scss'
				}
			}
		},

		watch: {
			options: {
				livereload: true
			},

			sass: {
				options: {
					livereload: false
				},
				files: ['<%= paths.libraryDir %>/scss/**/*.scss'],
				tasks: ['sass', 'autoprefixer']
			},

			css: {
				files: ['<%= paths.libraryDir %>/css/styles.css'],
			},

			js: {
				files: ['<%= paths.libraryDir %>/js/demos/*.js', '<%= paths.libraryDir %>/js/*.js']
			}
		},

		open: {
			dev: {
				path: 'http://localhost:8000/',
				app: 'Google Chrome'
			}
		},

		connect: {
			server: {
				options: {
					hostname: ''
				}
			}
		},

		rsync: {
			options: {
				src: './',
				args: ['--verbose'],
				exclude: ['.git*', 'node_modules', '.sass-cache', 'Gruntfile.js', 'package.json', '.DS_Store', 'README.md', 'server_creds.json', '.bowerrc', '.editorconfig', '.jshintrc', 'bower.json'],
				recursive: true,
				syncDestIgnoreExcl: true
			},
			staging: {
				options: {
					dest: '<%= creds.path.staging %>',
					host: '<%= creds.user %>@<%= creds.ip %>'
				}
			}
		}

	});

	grunt.registerTask('build', ['sass', 'autoprefixer']);
	grunt.registerTask('default', ['build', 'connect', 'open', 'watch']);
};
