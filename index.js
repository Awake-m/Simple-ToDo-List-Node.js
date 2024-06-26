const express = require('express');
const port=7777;
const app = express();

app.use(express.urlencoded());

let bookData=[
    {
        no:1,
        title: '7 Habits of Highly Effective People',
        author: 'Stephen Covey',
        type:'Bussiness and Improvement'
    },
    {
        no:2,
        title: 'The Time Machine',
        author: 'H.G.Wells',
        type:'Science Fiction'
    }
]

app.post("/insert",(req,res)=>{
    console.log(req.body);
    let no= req.body.no;
    let title= req.body.title;
    let author= req.body.author;
    let type=req.body.type;


    let obj={
        no:no,
        title:title,
        author:author,
        type:type,
    }
    bookData.push(obj);
    return res.redirect('back');
})

app.get('/delete',(req,res)=>{
    let no=req.query.no;

    let data=bookData.filter((val)=>{
        return val.no !=no;
    })
    bookData=data;
    res.redirect('back')
})

app.get('/edit',(req, res)=>{
    let no=req.query.no;

    let data=bookData.filter((val)=>{
        return val.no ==no;
    })
    res.render('edit',{
        editData:data[0]
    })
    res.redirect('back')
})

app.post('/update',(req,res)=>{
    let no=req.body.no;

   let Data=bookData.filter((val)=>{
        if(val.no==no)
        {
            val.no=req.body.no;
            val.title=req.body.title;
            val.author=req.body.author;
            val.type=req.body.type;
        }
        return val;
    });
    bookData=Data;
    return res.redirect('/')
});

app.set('view engine', 'ejs')
app.get('/', (req, res) =>{
    res.render('table',{
        book:bookData
    });
})


app.listen(port, (err)=>{
    if(err)
    {
        console.log("serevr not started");
    }
    else{
        console.log("server started:" + port);
    }
})