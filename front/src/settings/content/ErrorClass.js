class ErrorClass{
    serrors = {};

    setErrors( errors ){
        this.errors = errors;
    }

    get( key ){
        for( let k in this.errors ){
            if( k === key ){
                return 'has-error'
            }
        }

        return '';
    }
}

export default new ErrorClass();