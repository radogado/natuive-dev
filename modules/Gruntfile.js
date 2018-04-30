module.exports = function(grunt) {

	grunt.initConfig({
		'sass': {
			dist: { 
				files: {
					'modules-core.css': 'modules-core.scss',
					'components/**/*.css': 'components/**/*.scss'
					}
				}
		},
		'concat': {
		  options: {
		    // define a string to put between each file in the concatenated output
		    separator: ';'
		  },
		  JS: {
		    // the files to concatenate
		    src: ['components/**/*.js'],
		    // the location of the resulting JS file
		    dest: 'components.js'
		  },
		  CSS: {
		    // the files to concatenate
		    src: ['components/**/*.css'],
		    // the location of the resulting JS file
		    dest: 'components.css'
		  }
		},
		'cssmin': {
		  options: {
		    shorthandCompacting: false,
		    roundingPrecision: -1
		  },
		  target: {
		    files: {
		      'modules.min.css': ['modules-core.css', 'components.css']
		    }
		  }
		},
		'closure-compiler': {
		frontend: {
		  closurePath: './node_modules/closure-compiler',
		  js: ['modules-core.js', 'components.js'],
		  jsOutputFile: 'modules.min.js',
		  maxBuffer: 500,
		  noreport: true,
		  options: {
		    compilation_level: 'ADVANCED_OPTIMIZATIONS',
		    language_in: 'ECMASCRIPT5_STRICT',
		  }
		}
		}  
	});

	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-closure-compiler');
	grunt.loadNpmTasks('grunt-contrib-copy');

	// Default task(s).
	grunt.registerTask('default', ['sass', 'concat', 'cssmin', 'closure-compiler']);

};
