let expect = require("chai").expect;
let mails = require("../services/mails");
let mailsCtrl = require("../controllers/mails");
let sessions = require("../services/sessions");

describe("test providers", function() {    
    it("not null provider", function() {
        mails.getProviders(function(err, data) {
            expect(err).to.be.null;
            expect(data.length).to.be.equal(2);
        });
    });
});

describe("test add sender", function() {    
    it("normal", function() {
        let token = sessions.create();
        mailsCtrl.updateSenders(token, [
            {
                name: "SendGrid", 
                "apiKey": "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",
                "domain": null
            }
        ], function(code, result) {
            expect(code).equal(200);
            let content = sessions.getContent(token);
            expect(content.senders[0].name).to.be.equal("SendGrid");
        });

    });
});

describe("test send mail", function() {    
    it("normal", function() {
        let token = sessions.create();
        mailsCtrl.updateSenders(token, [
            {
                name: "SendGrid", 
                "apiKey": "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",
                "domain": null
            }
        ], function(code, result) {
            expect(code).equal(200);
            let content = sessions.getContent(token);
            let obj = {
                senders: content.senders,
                mail: {
                    from: "Kai<leonkaihao@somewhere.com>",
                    to: "leonkaihao@gmail.com",
                    cc: "",
                    bcc: "",
                    subject: "hello",
                    text: "test send interface"
                }
            }
            mails.send(obj, function(err, results) {
                expect(err).to.be.null;
                expect(results.length).to.be.equal(1);
            })
        });

    });
});
