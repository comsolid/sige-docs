'use strict';

module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt);
    require('time-grunt')(grunt);

    // configurable paths
    grunt.initConfig({
        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        'dist'
                    ]
                }]
            }
        },

        replace: {
            dist: {
                options: {
                    patterns: [
                        {
                            match: 'sigedir',
                            replacement: '/var/www/sige'
                        }
                    ]
                },
                files: [
                    {expand: true, flatten: false, src: ['dist/**/*.html']}
                ]
            }
        },

        shell: {
            dist: {
                command: 'gitbook build ./repository dist'
            },
        },

        'gh-pages': {
            options: {
                base: 'dist'
            },
            src: ['**']
        }

    });

    grunt.registerTask('deploy', ['clean', 'shell', 'replace', 'gh-pages']);
    grunt.registerTask('build', ['clean', 'shell', 'replace']);
};
