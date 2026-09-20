import assert from "node:assert/strict"
import { describe, it } from "node:test"

import { getType } from "../utils/get-type"

describe("getType", () => {
  it("infers primitive JSON types", () => {
    assert.equal(getType("Ada"), "string")
    assert.equal(getType(36), "number")
    assert.equal(getType(true), "boolean")
    assert.equal(getType(null), "null")
  })

  it("infers empty collections", () => {
    assert.equal(getType({}), "{}")
    assert.equal(getType([]), "unknown[]")
  })

  it("infers object property types", () => {
    assert.equal(
      getType({ name: "Ada", age: 36, active: true }),
      `{
  name: string
  age: number
  active: boolean
}`,
    )
  })

  it("infers nested objects and arrays", () => {
    assert.equal(
      getType({
        user: { name: "Ada" },
        tags: ["math", "computing"],
      }),
      `{
  user: {
    name: string
  }
  tags: string[]
}`,
    )
  })

  it("merges object shapes in arrays and marks missing keys optional", () => {
    assert.equal(
      getType([
        { id: 1, name: "Ada" },
        { id: 2, email: "ada@example.com" },
      ]),
      `Array<{
  id: number
  name?: string
  email?: string
}>`,
    )
  })

  it("unions mixed primitive array values", () => {
    assert.equal(getType([1, "Ada", false]), "Array<boolean | number | string>")
  })

  it("quotes keys that are not valid identifiers", () => {
    assert.equal(
      getType({ "full-name": "Ada", "123": true }),
      `{
  "123": boolean
  "full-name": string
}`,
    )
  })

  it("ignores empty arrays when merging with typed arrays", () => {
    assert.equal(getType([[1, 2], []]), "number[][]")
  })
})
