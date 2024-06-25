class ApiError extends Error{
    constructor( 
        statusCode,
        message,
        error=[],
        stack=""
    ){
        super(message)
        this.statusCode=statusCode
        this.data=null
        this.msg=message
        this.success=false
        this.errors=this.error

        if(stack){
            this.stack=stack
        }
        else{
            Error.captureStackTrace(this,this.constructor)
        }

    }
}

export {ApiError}