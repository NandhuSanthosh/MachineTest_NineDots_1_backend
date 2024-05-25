
class UnprocessableEntity extends Error {
    constructor(message) {
        super(message)
    }
}


function errorHandler( err, req, res, next ){
    if(err instanceof UnprocessableEntity) {
        return res.status(422).json({
            message: err.message
        })
    }


    res.status(503).json({
        message: err.message
    })

}

module.exports = {
    errorHandler, 
    UnprocessableEntity
}