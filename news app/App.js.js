intent('What does this app do?', 'What can I do here?', 
      reply('This is a news project.'));

const API_KEY='8820df76c8b64e08b7b1be2c1ac1fa2f';
// Storing all the data from articles
let savedArticles = [];

// News from source
intent('Give me the news from $(source* (.*))', (p) => {
    let NEWS_API_URL = `https://newsapi.org/v2/top-headlines?apiKey=${API_KEY}`;

    if(p.source.value){
        NEWS_API_URL=`${NEWS_API_URL}&sources=${ p.source.value.toLowerCase().split(" ").join('-') }`;
    }
    const options={url:NEWS_API_URL,headers:{'User-Agent':'request'}};
    api.request(options,(error,response,body) => {
        const{articles} = JSON.parse(body); 
        if(!articles.length){
            p.play('Sorry,please try searching for news from a different source');
            return;
        }
        savedArticles=articles;
        
        p.play({command:'newHeadlines',articles});
        p.play(`Here are the (latest|recent) ${p.source.value}.`);
        
        p.play('would you like me to read the headlines?');
        p.then(confirmation);
    });
})

// News from Term
intent('what\'s up with $(term* (.*))', (p) => {
    let NEWS_API_URL = `https://newsapi.org/v2/everything?apiKey=${API_KEY}`;

    if(p.term.value){
        NEWS_API_URL=`${NEWS_API_URL}&q=${ p.term.value }`;
    }
    const options={url:NEWS_API_URL,headers:{'User-Agent':'request'}};
    api.request(options,(error,response,body) => {
        const{articles} = JSON.parse(body); 
        if(!articles.length){
            p.play('Sorry,please try searching for something else');
            return;
        }
        savedArticles=articles;
        
        p.play({command:'newHeadlines',articles});
        p.play(`Here are the (latest|recent) articles on ${p.term.value}`);
        
        p.play('would you like me to read the headlines?');
        p.then(confirmation);
    });
})


// News from Category
const CATEGORIES = ['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology'];
const CATEGORIES_INTENT = `${CATEGORIES.map((category) => `${category}~${category}`).join('|')} `;

intent(`(show|what is|tell me|what's|what are|what're|read) (the|) (recent|latest|) $(N news|headlines) (in|about|on|) $(C~ ${CATEGORIES_INTENT})`,
  `(read|show|get|bring me|give me) (the|) (recent|latest) $(C~ ${CATEGORIES_INTENT})  $(N news|headlines)`, (p) => {
    let NEWS_API_URL = `https://newsapi.org/v2/everything?apiKey=${API_KEY}`;

    if(p.C.value){
        NEWS_API_URL=`${NEWS_API_URL}&q=${ p.C.value }`;
    }
    const options={url:NEWS_API_URL,headers:{'User-Agent':'request'}};
    api.request(options,(error,response,body) => {
        const{articles} = JSON.parse(body); 
        if(!articles.length){
            p.play('Sorry,please try searching for a different category');
            return;
        }
        savedArticles=articles;
        
        p.play({command:'newHeadlines',articles});
        
        p.play(`Here are the (latest|recent) articles on ${p.C.value}`);
        
        p.play('would you like me to read the headlines?');
        p.then(confirmation);
        
    });
})


// News from Latest
intent('(Give|) (me|) (the|) latest news', (p) => {
    let NEWS_API_URL = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`;

    const options={url:NEWS_API_URL,headers:{'User-Agent':'request'}};
    api.request(options,(error,response,body) => {
        const{articles} = JSON.parse(body); 
        if(!articles.length){
            p.play('Sorry,please try searching for something else');
            return;
        }
        savedArticles=articles;
        
        p.play({command:'newHeadlines',articles});
        p.play(`Here are the (latest|recent) articles`);
        
        p.play('would you like me to read the headlines?');
        p.then(confirmation);
    });
})

// Making Alan Read Headlines
const confirmation=context(()=>{
    intent('yes',async (p)=>{
        for(let i=0;i<savedArticles.length;i++){
            p.play({command:'highlight',article:savedArticles[i]});
            p.play(`${savedArticles[i].title}`);
        }
    })
    intent('no',(p)=>{
        p.play('Sure,sounds good to me');
    })
})

// Making Alan open an article
intent('Open (the|) (article|) (number|) $(number* (.*))',(p)=>{
    if(p.number.value){
        p.play({command:'open',number:p.number.value,articles:savedArticles})
    }
})

// Making Alan Go Back

intent('(go|) back',(p)=>{
  p.play('sure,going back');
    p.play({command:'newHeadlines',articles:[]});
})