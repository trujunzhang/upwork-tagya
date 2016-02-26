module.exports = function (grunt) {
    var allScriptFiles = [
        "js/bridge.js",
        "js/main.js",
        "js/tagya.js",
        "js/loader.js",
        "js/transformer.js",
        "js/MapCoordsResizer.js",
        //"js/imageMapResizer.js"
    ];
    var allHTMLFiles = [
        "index.html"
    ];
    var distFolder = "../app/src/main/assets/";

    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        browserify: {
            dist: {
                files: {
                    "bundle.js": [
                        "js/bridge.js",
                        "js/main.js",
                        "js/tagya.js",
                        "js/loader.js",
                        "js/transformer.js",
                        "js/MapCoordsResizer.js",
                        //"js/imageMapResizer.js",
                    ]
                }
            }
        },
        jshint: {
            allFiles: allScriptFiles,
            options: {
                jshintrc: ".jshintrc"
            }
        },
        copy: {
            main: {
                files: [
                    // App files
                    { src: [ "bundle.js", "index.html", "styles.css" ], dest: distFolder },

                    // Test files
                    //{ src: [ "bundle-test.js", "tests/index.html" ], dest: distFolder },

                    // Preview files
                    //{ src: [ "preview.js", "preview.html" ], dest: distFolder },
                ]
            }
        },
        watch: {
            scripts: {
                files: allScriptFiles.concat(allHTMLFiles),
                tasks: ["default"]
            }
        }
    });

    grunt.registerTask( 'default', [ 'browserify', 'copy' ] );
    //grunt.registerTask('default', ['browserify']);
};
