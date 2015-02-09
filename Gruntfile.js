module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        less: {
            development: {
                options: {
                    paths: ['web/css']
                },
                files: {
                    'web/css/style.css': 'web/css/style.less'
                }
            }
        },
        concat: {
            css: {
                src: [
                    'web/css/*.css',
                ],
                dest: 'dist/css/style.css'
            },
            js: {
                src: [
                    'web/js/views/*.js',
                    'web/js/*.js',
                ],
                dest: 'dist/js/main.js'
            }
        },
        copy: {
            main: {
                files: [
                    {expand: true, cwd: 'web/', src: ['fonts/*'], dest: 'dist/', filter: 'isFile'},
                    {expand: true, cwd: 'web/', src: ['js/libs/*'], dest: 'dist/', filter: 'isFile'},
                    {expand: true, cwd: 'web/', src: ['img/*'], dest: 'dist/', filter: 'isFile'},
                    {expand: true, cwd: 'web/', src: 'index.html', dest: 'dist/', expand: true},
                ],
            },
        },
        watch: {
            files: ['web/css/*', 'web/js/libs/*', 'web/js/views/*', 'web/js/*', 'web/index.html'],
            tasks: ['less', 'concat', 'copy']
        }
    });
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.registerTask('default', ['less', 'concat:css', 'concat:js', 'copy']);
};