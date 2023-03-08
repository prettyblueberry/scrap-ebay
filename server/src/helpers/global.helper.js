global.routeRestful = (path, controller, router) => {
    //findById
    if(controller.hasOwnProperty("findById"))
        router.get(path + "/:id", function(req, res){
            return controller.findById(req.params.id, req, res);
        });

    //search
    if(controller.hasOwnProperty("search"))
        router.get(path, function(req, res){
            return controller.search(req.query, req, res);
        });

    //save
    if(controller.hasOwnProperty("saveOne"))
        router.patch(path, function(req, res){
            return controller.saveOne(req.body, req, res);
        });

    //create
    if(controller.hasOwnProperty("createOne"))
        router.post(path, function(req, res){
            return controller.createOne(req.body, req, res);
        });

    //update
    if(controller.hasOwnProperty("updateOne"))
        router.put(path + "/:id", function(req, res){
            return controller.updateOne({
                id: req.params.id,
                body: req.body
            },  req, res)
        });

    //delete
    if(controller.hasOwnProperty("deleteOne"))
        router.delete(path+ "/:id", function(req, res){
            return controller.deleteOne(req.params.id, req, res);
        });
}

global.makeMySqlErrResponse = (err) => ({
    code: err.code,
    errno: err.errno,
    sqlMessage: err.sqlMessage
});
