module.exports = function(grunt) {

	grunt.initConfig({
		'sass': {
			core: { 
				files: {
					'modules-core.css': 'modules-core.scss'
					}
				},
			dist: {
				files: [{
					expand: true,
						cwd: "components",
					  src: ["**/*.scss"],
					  dest: "components",
					  ext: ".css"
					}]
				}
		},
		'concat': {
		  options: {
		    // define a string to put between each file in the concatenated output
		    separator: ''
		  },
		  JS: {
		    // the files to concatenate
			    options: {
		      separator: ';',
		      banner: 'var nui = (function(){',
		      footer: 'return { init: init, animate: animate, copyButton: copyButton, openFullWindow: openFullWindow, closeFullWindow: closeFullWindow, notify: notify, addComponent: addComponent, makeSlider: makeSlider }; })();'
		    },
		    src: ['modules-core.js', 'components/**/*.js'],
		    // the location of the resulting JS file
		    dest: 'modules.js'
		  },
		  CSS: {
		    // the files to concatenate
		    src: ['modules-core.css', 'components/**/*.css'],
		    // the location of the resulting JS file
		    dest: 'modules.css'
		  }
		},
		'cssmin': {
		  options: {
		    shorthandCompacting: false,
		    roundingPrecision: -1
		  },
		  target: {
		    files: {
		      'modules.min.css': ['modules.css']
		    }
		  }
		},
		'closure-compiler': {
		frontend: {
		  closurePath: './node_modules/closure-compiler',
		  js: 'modules.js',
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
