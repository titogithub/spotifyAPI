const gulp = require("gulp");
const ts = require("gulp-typescript");
const tsProject = ts.createProject("tsconfig.json");
const nodemon = require("gulp-nodemon");

gulp.task("compile", () => {
    return tsProject.src().pipe(tsProject()).js.pipe(gulp.dest("dist"));
});

gulp.task("start", () => {
    const stream = nodemon({
        exec: "node --inspect=7001 dist/Server.js",
        // script: config.server.src,
        ext: "js",
        env: {
            ENV: "DEV",
            PORT: 8081,
        },
    });

    stream
        .on("restart", () => {
            console.log("restarted!");
        })
        .on("crash", () => {
            console.error("Application has crashed!\n");
            stream.emit("restart", 10); // restart the server in 10 seconds
        });
});

gulp.task("develop", gulp.series("compile", "start"));
