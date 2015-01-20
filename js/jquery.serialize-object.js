/**
 * 
 * 
 * @auth Yaasir Ketwaroo <ketwaroo.yaasir@gmail.com>
 */

(function ($) {
    $.fn.serializeObject = function () {

        // tracks the count of integer indices.
        var integerIndexes = {
        };

        /**
         * private thingy to inflate thingies
         * @param {type} key
         * @param {type} value
         * @returns {@var;xx|@var;value}
         */
        var _inflateKeyValue = function (key, value)
        {

            var tmp = key.split(/[\[\]]+/);
            if (tmp.length === 1)
            {
                var out = {};
                out[key] = value;
                return out;
            }

            do {
                var fnd = key.lastIndexOf('[');
                if (fnd === -1 && key.length)
                {
                    var x = key;
                }
                else
                {
                    var x = key.substring((fnd + 1), (key.length - 1));
                    key = key.substring(0, fnd);
                }
                var xx = {};
                if (x === '')
                {
                    integerIndexes[key] = integerIndexes[key] || 0;
                    var xxx = integerIndexes[key];
                    xx[xxx] = value;
                    integerIndexes[key]++;
                }
                else
                {
                    xx[x] = value;
                }
                value = xx;
            } while (fnd !== -1);
            return value;
        };

        //
        var data = $(this).serializeArray();

        var out = {};
        $.each(data, function (k, v) {
            var tmp = _inflateKeyValue(v.name, v.value);
            out = $.extend(true, {}, out, tmp);
        });
        return out;
    };
}
)(jQuery);