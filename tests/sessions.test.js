let expect = require("chai").expect;
let sessions = require("../services/sessions");

describe("test create session", function() {    
    it("normal", function() {
        let token = sessions.create();
        expect(token).to.be.not.null;
    });

    it("change token", function() {
        let token1 = sessions.create();
        let token2 = sessions.create();
        expect(token1).to.be.not.equal(token2);
    });
});


describe("test get session", function() {    
    it("same as created", function() {
        let token = sessions.create();
        let result = sessions.getContent(token);
        expect(result).to.be.not.null;
    });

    it("same object", function() {
        let token = sessions.create();
        let result = sessions.getContent(token);
        result.testVal = "hello";
        result = sessions.getContent(token);
        expect(result.testVal).to.be.equal("hello");
    });
});