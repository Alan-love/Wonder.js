describe("SkyboxMaterial", function() {
    var sandbox = null;
    var material = null;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        material = new wd.SkyboxMaterial();
    });
    afterEach(function () {
        sandbox.restore();
    });

    it("set side to be BACK", function(){
        material = wd.SkyboxMaterial.create();

        expect(material.side).toEqual(wd.Side.BACK);
    });
});

