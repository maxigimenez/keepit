(function(root, factory){
    if(typeof define === 'function' && define.amd){
        define(['exports'], function(exports){
            root.keepit = factory(root, exports);
        });
    } else {
        root.keepit = factory(root, {});
    }
}(this, function(root, keepit){
    'use strinct';

    root.keepit = keepit;

    var keyPrefix = '_keepit_';

    keepit = {

        set: function(key, value, expiration){
            if(expiration && expiration > 0){
                var currentTimestamp = new Date().getTime();
                this.set(keyPrefix+key, {
                    timestamp: currentTimestamp,
                    hours: expiration
                });
            }

            localStorage.setItem(key, JSON.stringify(value));
        },

        get: function(key){
            var value = JSON.parse(localStorage.getItem(key)),
                expiration = localStorage.getItem(keyPrefix+key);

            if(expiration){
                expiration = JSON.parse(expiration);
                var currentTimestamp = new Date().getTime(),
                    difference = currentTimestamp - expiration.timestamp,
                    hours =  Math.floor(difference/1000/60/60);

                if(hours >= expiration.hours){
                    this.delete(keyPrefix+key);
                    this.delete(key);
                }
            }

            return value;
        },

        getAll: function(){
            var exit = [];
            for(var key in localStorage){
                if(key.indexOf(keyPrefix) === -1){
                    exit[key] = keepit.get(key);
                }
            }
            return exit;
        },

        delete: function(key){
            localStorage.removeItem(key);
        },

        flush: function(){
            localStorage.clear();
        }

    };

    return keepit;
}));
