
module.exports = function(app){
    app.get("/blog", (req, res)=>{
        res.render('blog.ejs')
    })
    app.get("/blog/new",(req, res)=>{
        res.render('blogNew.ejs')
    })
    
    app.post("/blog",(req, res) => {
        blog.find({}, function(err,data) { 
        if(err){
            console.log(err);
            res.send(500).status;
        }
        else {
            console.log(data)
            res.render('blog.ejs', {data : data});
            }            
        })
    })
    
    app.post("/blog/new",(req, res, next)=>{
        var newBlog = new blog({
        title:  req.body.title,
        body:   req.body.body
        });
    }
}