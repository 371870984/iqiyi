var gulp=require('gulp');//引入gulp
var html=require('gulp-minify-html');//压缩html
var css=require('gulp-minify-css');//压缩css
var sass=require('gulp-sass');//编译scss
var uglify=require('gulp-uglify');//压缩js
var connect=require('gulp-connect');//配置自刷新插件
var jshint=require('gulp-jshint');//js错误检测
var concat=require('gulp-concat');//js代码合并
var rename=require('gulp-rename');//重命名插件
var imagemin=require('gulp-imagemin');//图片压缩插件


//=========================================
//1.压缩 html
//复制 html
gulp.task('copyhtml',function(){
    gulp.src('html/*.html')
    .pipe(gulp.dest('../dist/html/'));
});
//压缩 html(先执行一次)
gulp.task('uglifyhtml',function(){
    gulp.src('html/*.html')
    .pipe(html())//pipe():管道(链式)输出/gulp.dest('输出目录)
    .on('error', swallowError)
    .pipe(gulp.dest('../dist/html/'));
});
//监听压缩 html
gulp.task('watchhtml',function(){
    gulp.watch('html/*.html',function(){
        gulp.run('uglifyhtml');
    });
});
//=========================================
//2.编译 sass
gulp.task('uglifysass',function(){
    gulp.src('scss/*.scss')
    .pipe(sass())
    .on('error', swallowError)
    .pipe(gulp.dest('css/'));
});

//监听编译 sass
gulp.task('watchsass',function(){
    gulp.watch('scss/*.scss',function(){
        gulp.run('uglifysass');
    });
});

//=========================================
//3.压缩 css
gulp.task('uglifycss',function(){
    gulp.src('css/*.css')
    .pipe(css())
    .on('error', swallowError)
    .pipe(gulp.dest('../dist/css'));
});
//监听压缩 css
gulp.task('watchcss',function(){
    gulp.watch('css/*.css',function(){
        gulp.run('uglifycss');
    });
});
//=========================================
//4.压缩 js
gulp.task('uglifyjs',function(){
    gulp.src('js/*.js')
    .pipe(uglify())
    .on('error', swallowError)
    .pipe(gulp.dest('../dist/js'));
});
//监听压缩 js
gulp.task('watchjs',function(){
    gulp.watch('js/*.js',function(){
        gulp.run('uglifyjs');
    });
});

//=========================================
//5.页面自刷新
gulp.task('connect',function(){
    connect.server({//配置服务器
        port:8888,
        livereload:true
    });
});
gulp.task('connecthtml',function(){
    gulp.src(['html/*.html','css/*.css'])
    .pipe(connect.reload());
});
gulp.task('connectwatch',function(){
    gulp.watch(['html/*.html','css/*.css'],['connecthtml']);
});
//=========================================
//6.压缩图片
gulp.task('uglifyimg',function(){
    gulp.src('img/*.png')
    .pipe(imagemin())
    .on('error', swallowError)
    .pipe(gulp.dest('../dist/img'));
})

//=========================================
//错误不退出
function swallowError(error) {
    // If you want details of the error in the console
  console.error(error.toString())

  this.emit('end')
}
//=========================================
//开启监听
//gulp.task('default',['watchhtml','watchsass','watchcss','watchjs','connect','connectwatch','uglifyimg']);
gulp.task('default',['watchhtml','watchsass']);
