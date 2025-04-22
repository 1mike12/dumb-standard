import { expect } from "chai";
import { generateWebsocketKey } from "./generateWebsocketKey";

describe("generateWebsocketKey", () => {
    it("should generate a key of fixed length", () => {
        expect(generateWebsocketKey()).to.have.lengthOf(24);
    });
});
