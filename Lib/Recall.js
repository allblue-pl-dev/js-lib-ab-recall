'use strict';


var Recall = {
    _WaitTime: 100,

    SetWaitTime: function(wait_time)
    {
        Recall._WaitTime = wait_time;
    },


    _fn: null,

    _callsCount: 0, /* calls count from last execution START */
    _argsArray: null,

    _exec_IsFinished: true,

    Class: function(fn, wait_time)
    {
        /* Fn */
        if (Object.prototype.toString.call(fn) !== '[object Function]')
            throw new Error('`fn` must be a Function.');

        this._fn = fn;

        this._waitTime = typeof wait_time === 'undefined' ?
                Recall._WaitTime : wait_time;
        this._argsArray = [];
    },

    // addChild: function(child)
    // {
    //     var self = this.self;
    //
    //     self._children.push(child);
    // },

    call: function()
    {
        this._argsArray.push(arguments);
        this._callsCount++;

        var self = this;
        setTimeout(function() {
            self._callsCount--;
            if (self._callsCount > 0)
                return;

            if (!self._exec_IsFinished)
                return;

            self._execFn();
        }, this._waitTime);
    },

    _execFn: function()
    {
        this._exec_IsFinished = false;

        var args_array = this._argsArray;
        this._argsArray = [];
        var fn_result = this._fn(args_array);

        /* If fn return prototype: */
        if (Object.prototype.toString(fn_result) === '[object Object]') {
            if (Promise.resolve(fn_result) === fn_result) {
                var self = this;
                fn_result.then(function(test) {
                    self._isFinished = true;
                    if (self._callsCount > 0 || self._argsArray.length === 0)
                        return;

                    self._execFn();
                }).catch(function(err) {
                    console.error(err.stack);
                });

                return;
            }
        }

        /* Else: */
        this._exec_IsFinished = true;
    }

};
Recall.Class.prototype = Recall;
module.exports = Recall;
