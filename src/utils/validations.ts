const Validations = {
    checkNetConnection : async () => {
        const isConnected = window.navigator.onLine;
        if(isConnected) {
            return true;
        } else {
            return false
        }
    },
    validateObject : async (obj : any) => {
        for(const key in obj) {
            if(obj.hasOwnProperty(key)) {
                if(obj[key] !== false) {
                    return false // Found a key with a value other than false
                }
            }
        }
        return true;
    },
    validatePrice: async (value : string) => {
        const pattern = /^\d{0,5}(\.\d{0,2})?$/;
        if (pattern.test(value.trim())) {
            return true;
        } else {
            return false;
        }
    },
    allowOnlyNumbers: async (value : string) => {
        const pattern = /^[0-9]$/;
        if( pattern.test(value.trim())) {
            return true;
        } else {
            return false;
        }
    },
    checkImageSize: async (file : any, width: any, height: any) => {
        var img = new Image();
        img.src = URL.createObjectURL(file);
        return (img.onload = function () {
            if(img.width === width && img.height === height) {
                return true;
            } else {
                return false;
            }
        })
    }
}

export default Validations;