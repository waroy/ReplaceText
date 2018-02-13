const fs = require('fs');
const path = require('path');
var resultpath = process.argv[2];
var finder = require('findit')(resultpath);

// var filelist = [];
// var filepath = [];


const keyword = new RegExp(process.argv[3], 'gm');
const replaceKeyword = process.argv[4].toString();

finder.on('file', function (file, stat) {    
    if(path.extname(file).match('.html'))
    {    
      try {
          var html = fs.readFileSync(file).toString();
          var count = 0;
          var match = html.match(keyword);
          if (match !== null) 
            count = match.length;
          var html = html.replace(keyword, replaceKeyword);
          if(count > 0 )
          fs.writeFileSync('./output/' + path.basename(file), html);
      }
      catch(e){
         console.error(file + ' are not valid html file to replace'); 
      }                         
    }    
});

finder.on('end', function () {
    console.log('Completed file replace');
    //console.log(filelist.length);
});
  
finder.on('error', function (err) {
  finder.stop();
  console.error(err);
})

