var renderTestTool = (function(){
    return {
        getCenterPoint:function(){
            return {
                x:250,
                y:150
            }
        },
        prepareContext: function(config){
            var c = wdCb.ExtendUtils.extend({
                    screenSize:{
                        x:0,
                        y:0,
                        width:500,
                        height:300
                    }
                }, config);

            wd.Main.setConfig(c)
                .init();
        },
        destoryContext: function () {
            $("canvas").remove();
        }
    }
})();
