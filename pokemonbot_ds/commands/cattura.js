module.exports = {
    name: 'cattura',
    description: 'il comando per catturare',
    execute(message, args){

        const puppeteer = require('puppeteer');

        
                
                var stringafinale = '';
                var indizioinurl = '';
                var conta = 0;
                var hint = message.content.replace('The pokémon is ','');
                hint = hint.replace(/\\/g,'');
                hint = hint.replace('.','');
                for (var caratteri=0; caratteri<hint.length; caratteri++ ){
                  if ( hint[caratteri].toUpperCase() != hint[caratteri].toLowerCase() ) {
                    indizioinurl += hint[caratteri]; 
                    conta += 1;
                  }
                  else if (conta >= 1){
                    break;
                  }
                }
                var urlcompleto= 'https://veekun.com/dex/pokemon/search?name=' + indizioinurl;
                hintsplit= hint.split('');

                (async () => {
                    const browser = await puppeteer.launch();
                    const page = await browser.newPage();
                    await page.goto(urlcompleto);

                    const result = await page.evaluate(() => Array.from(document.querySelectorAll('[class="name"]'), element => element.textContent));
                    for ( var i=0; i<result.length; i++ ) {
                      var lettere = result[i].split('');
                      if (lettere.length === hintsplit.length ) {
                        for (var l=0; l<lettere.length; l++ ) {
                          if (lettere[l]==hintsplit[l]){
                            stringafinale += lettere[l];
                          }

                          else {
                            stringafinale += '_';
                          }

                          if (stringafinale != hint && stringafinale.length >= hint.length){
                            stringafinale = '';
                          }

                          if (stringafinale == hint){
                            message.channel.send('p!c ' + result[i]);
                            console.log('p!c ' + result[i]);
                          }
                          
                    }
                  }
                }; 
                    await browser.close();

                  })();
        }
    }

            
            
        

