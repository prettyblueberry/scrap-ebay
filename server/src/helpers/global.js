global.routeRestful = (path, controller, router) => {
    //findById
    if(controller.hasOwnProperty("findById"))
        router.get(path + "/:id", function(req, res){
            return controller.findById(req.params.id, req, res);
        });

    //findOne
    if(controller.hasOwnProperty("findOne"))
        router.get(path, function(req, res){
            return controller.findOne(req.query, req, res);
        });

    //search
    if(controller.hasOwnProperty("search"))
        router.get(path, function(req, res){
            return controller.search(req.query, req, res);
        });

    //create
    if(controller.hasOwnProperty("create"))
        router.post(path, function(req, res){
            return controller.create(req.body, req, res);
        });

    //update
    if(controller.hasOwnProperty("update"))
        router.put(path + "/:id", function(req, res){
            return controller.update({
                id: req.params.id,
                body: req.body
            },  req, res)
        });

    //delete
    if(controller.hasOwnProperty("delete"))
        router.delete(path+ "/:id", function(req, res){
            return controller.delete(req.params.id, req, res);
        });
}
