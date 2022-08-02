import { describe, expect, it } from "@jest/globals";

describe('sample test', () => { 
    it("should test === true", done => { 
        expect(true).toBe(true)
        done()
    })
})